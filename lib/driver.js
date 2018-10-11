import { BaseDriver, DeviceSettings, errors } from 'appium-base-driver';
import desiredCapConstraints from './desired-caps';
import logger from './logger';
import commands from './commands/index';
import _ from 'lodash';
import B from 'bluebird';
import { sleep } from 'asyncbox';

// for proxies
import AndroidDriver from 'appium-android-driver';
import IOSDriver from 'appium-ios-driver';
import XCUITestDriver from 'appium-xcuitest-driver';
import MacDriver from 'appium-mac-driver';



// Add commands from the following location that should be mapped to existing drivers:
// https://github.com/appium/appium-base-driver/blob/master/lib/mjsonwp/routes.js

const TO_PROXY_COMMON = [
  'background',
  'closeApp',
  'getLog',
  'getLogTypes',
  'getOrientation',
  'getStrings',
  'launchApp',
  'lock',
  'removeApp',
  'setOrientation',
];

const TO_PROXY_IOS_ONLY = [
  'mobileShake',
];

const TO_PROXY_ANDROID_ONLY = [
  'getNetworkConnection',
  'isAppInstalled',
  'isLocked',
  'longPressKeyCode',
  'pressKeyCode',
  'setNetworkConnection',
  'toggleLocationServices',
  'unlock',
];

const TO_PROXY_IOS = TO_PROXY_IOS_ONLY.concat(TO_PROXY_COMMON);
const TO_PROXY_ANDROID = TO_PROXY_ANDROID_ONLY.concat(TO_PROXY_COMMON);
const TO_PROXY_MAC = TO_PROXY_COMMON;

const MAX_RETRY_COUNT = 10;
const RETRY_BACKOFF = 3000;

class YouiEngineDriver extends BaseDriver {
  resetYouiEngine () {

    this.ready = false;
    this.socket = null;
    this.locatorStrategies = ['id', 'name', 'class name', 'accessibility id'];
    this.proxydriver = null;
    this.proxyAllowList = '';
  }

  constructor (opts, shouldValidateCaps) {
    super(opts, shouldValidateCaps);

    this.desiredCapConstraints = desiredCapConstraints;
    this.settings = new DeviceSettings({'TimeDilation': 1, 'SourceTreeFilter': ''},
                                   this.onSettingsUpdate.bind(this));
    this.resetYouiEngine();

  }

  validateLocatorStrategy (strategy) {
    super.validateLocatorStrategy(strategy, false);
  }

  async createSession (caps) {
    try {
      let [sessionId] = await super.createSession(caps);

      // setup proxies - if platformName is not empty, make it less case sensitive
      if (caps.platformName !== null) {
        let appPlatform = caps.platformName.toLowerCase();
        if (appPlatform === "ios") {
          await this.startIOSSession(caps);
        } else if (appPlatform === "android") {
          await this.startAndroidSession(caps);
        } else if (appPlatform === "mac") {
          await this.startMacSession(caps);
        } else if (appPlatform === "yimac") {
          this.startYIMacSession(caps);
        } else if (appPlatform === "yiroku") {
          this.startYIRokuSession(caps);
        } else if (appPlatform === "yitvos") {
          this.startYITVOSSession(caps);
        }
      }

      await this.connectSocket();
      return [sessionId, this.opts];

    } catch (e) {
      await this.deleteSession();
      throw e;
    }
  }

  async onSettingsUpdate (key, value) {
    if (key === "TimeDilation") {
      await this.setTimeDilation(value);
    } else if (key === "SourceTreeFilter") {
      await this.setSourceTreeFilter(value);
    }
  }

  async stop () { // eslint-disable-line require-await
    this.ready = false;
  }

  async deleteSession () {
    logger.debug("Deleting YouiEngine session");

    if (this.caps.platformName !== null) {
      let appPlatform = this.caps.platformName.toLowerCase();
      if (appPlatform === "yimac") {
        this.endYIMacSession(this.caps);
      } else if (appPlatform === "yitvos") {
        this.endYITVOSSession(this.caps);
      }
    }

    if (this.proxydriver !== null) {
      await this.proxydriver.deleteSession();
    }
    await super.deleteSession();
    await this.stop();
  }

  driverShouldDoProxyCmd (command) {
    if (!this.proxydriver) {
      return false;
    }

    // only allow white listed commands
    for (let allowedCommand of this.proxyAllowList) {
      if (allowedCommand === command) {
        return true;
      }
    }
    return false;
  }

  async executeCommand (cmd, ...args) {
    if (cmd === 'receiveAsyncResponse') {
      logger.debug(`Executing YouiEngineDriver response '${cmd}'`);
      return await this.receiveAsyncResponse(...args);
    } else if (this.ready) {

      if (this.driverShouldDoProxyCmd(cmd)) {
        logger.debug(`Executing proxied WebDriver command '${cmd}'`);

        // There are 2 CommandTimeout (YouiEngineDriver and proxy)
        // Only YouiEngineDriver CommandTimeout is used; Proxy is disabled
        // All proxy commands needs to reset the YouiEngineDriver CommandTimeout
        // Here we manually reset the YouiEngineDriver CommandTimeout for commands that goe to proxy.
        this.clearNewCommandTimeout();
        let result = this.proxydriver.executeCommand(cmd, ...args);
        this.startNewCommandTimeout(cmd);
        return result;
      } else {
        logger.debug(`Executing YouiEngine WebDriver command '${cmd}'`);
        return super.executeCommand(cmd, ...args);
      }
    } else {
      logger.debug(`Command Error '${cmd}'`);
      throw new errors.NoSuchDriverError(`Driver is not ready, cannot execute ${cmd}.`);
    }
  }

  validateDesiredCaps (caps) {
    // check with the base class, and return if it fails
    let res = super.validateDesiredCaps(caps);
    if (!res) {
      return res;
    }

    // using a proxy
    if (caps.platformName.toLowerCase() !== 'noproxy') {
      // make sure that the capabilities has youiEngineAppAddress
      if (!caps.youiEngineAppAddress) {
        let msg = 'The desired capabilities must include youiEngineAppAddress';
        logger.errorAndThrow(msg);
      }
      // make sure that the capabilities has app
      if (!caps.app) {
        let msg = 'The desired capabilities must include app';
        logger.errorAndThrow(msg);
      }

      //Android emulator with proxy
      if (caps.deviceName.toLowerCase() === 'android') {
        if (!caps.avd) {
          let msg = 'The desired capabilities must include avd';
          logger.errorAndThrow(msg);
        }
      }
    }

    // finally, return true since the superclass check passed, as did this
    return true;
  }

  async setupNewIOSDriver (caps) {
    let iosArgs = {
      javascriptEnabled: true,
    };

    let iosdriver = new IOSDriver(iosArgs);
    // If iOS version is 10 or above we need to use XCUITestDriver (and Xcode 8+)
    if (caps.platformVersion) {
      let majorVer = caps.platformVersion.toString().split(".")[0];
      if (parseInt(majorVer, 10) >= 10) {
        iosdriver = new XCUITestDriver(iosArgs);
      }
    }
    let capsCopy = _.cloneDeep(caps);
    // Disabling the proxy CommandTimeout in the iOS driver since we are now handling it in the YouiEngine Driver
    capsCopy.newCommandTimeout = 0;
    await iosdriver.createSession(capsCopy);

    return iosdriver;
  }

  async startIOSSession (caps) {
    logger.info("Starting an IOS proxy session");
    this.proxyAllowList = TO_PROXY_IOS;

    this.proxydriver = await this.setupNewIOSDriver(caps);
  }

  async setupNewAndroidDriver (caps) {
    let androidArgs = {
      javascriptEnabled: true
    };
    let androiddriver = new AndroidDriver(androidArgs);
    let capsCopy = _.cloneDeep(caps);
    // Disabling the proxy CommandTimeout in the Android driver since we are now handling it in the YouiEngine Driver
    capsCopy.newCommandTimeout = 0;

    await androiddriver.createSession(capsCopy);

    return androiddriver;
  }

  async startAndroidSession (caps) {
    logger.info("Starting an Android proxy session");
    this.proxyAllowList = TO_PROXY_ANDROID;

    this.proxydriver = await this.setupNewAndroidDriver(caps);
  }

  async setupNewMacDriver (caps) {
    let macArgs = {
      javascriptEnabled: true
    };
    let macdriver = new MacDriver(macArgs);
    let capsCopy = _.cloneDeep(caps);
    // Disabling the proxy CommandTimeout in the proxied driver since we are now handling it in the YouiEngine Driver
    capsCopy.newCommandTimeout = 0;

    await macdriver.createSession(capsCopy);

    return macdriver;
  }

  async startMacSession (caps) {
    logger.info("Starting a Mac proxy session");
    this.proxyAllowList = TO_PROXY_MAC;

    this.proxydriver = await this.setupNewMacDriver(caps);
  }

  startYIMacSession (caps) {
    logger.info("Killing app if run");
    let shell = require('shelljs');
    let process_name = caps.app.substring(caps.app.lastIndexOf("/") + 1);
    shell.exec("killall " + process_name);

    logger.info("Launching macOS app");
    this.validateAppLocation(caps.app);
    let spawn = require('child_process').spawn,
        ls = spawn(caps.app);

    //Print Xcode logs (STDOUT)
    ls.stdout.on('data', function (data) {
      if (data != null && caps.showXcodeLog === true) {
        logger.debug('Xcode Log Output: ' + data.toString());
      }
    });

    //Print Xcode logs (STDERR)
    ls.stderr.on('data', function (data) {
      if (data != null && caps.showXcodeLog === true) {
        logger.debug('Xcode Log Error: ' + data.toString());
      }
    });

    ls.on('exit', function (code) {
      if (code != null && caps.showXcodeLog === true) {
        logger.debug('Application exited with code ' + code.toString());
      }
    });
  }

  endYIMacSession (caps) {
    logger.info("Deleting app");
    let shell = require('shelljs');
    let process_name = caps.app.substring(caps.app.lastIndexOf("/") + 1);
    shell.exec("killall " + process_name);
  }

  startYIRokuSession (caps) {
    logger.info("Launching Roku app");
    this.validateAppLocation(caps.app);
    let shell = require('shelljs');
    let roku_install_script = "curl -v -# -f -i --user '" + caps.username + ":" + caps.password + "' --digest --progress-bar -F 'mysubmit=Install' -F 'archive=@" + caps.app + "' -F 'passwd=' http://" + caps.youiEngineAppAddress + "/plugin_install | grep '<font color' | sed 's/<font color=\'red\'>//' "; // eslint-disable-line no-useless-escape
    shell.exec(roku_install_script);
    //"curl -v -# -f -i --user 'rokudev:youi' --digest --progress-bar -F 'mysubmit=Install' -F 'archive=@/Users/simongranger/Downloads/VideoPlayer.bin' -F 'passwd=' http://10.100.89.245/plugin_install | grep '<font color' | sed 's/<font color=\'red\'>//' "
  }

  startYITVOSSession (caps) {
    logger.info("Launching tvOS app");
    this.validateAppLocation(caps.app);
    let shell = require('shelljs');
    if (caps.udid) {
      shell.exec("ios-deploy --id " + caps.udid + " --uninstall --justlaunch --bundle " + caps.app);
    } else {
      shell.exec("ios-deploy --uninstall --justlaunch --bundle " + caps.app);
    }
  }

  endYITVOSSession (caps) {
    // If multiple apps with our socket are installed, it will connect to the first app installed.
    // For this reason, every app should be uninstalled after running.
    logger.info("Deleting app");
    let shell = require('shelljs');
    let bundleid = shell.exec(`osascript -e 'id of app "${caps.app}"'`);
    if (caps.udid) {
      shell.exec("ios-deploy --id " + caps.udid + " --uninstall_only --bundle_id " + bundleid);
    } else {
      shell.exec("ios-deploy --uninstall_only --bundle_id " + bundleid);
    }
  }

  validateAppLocation (app) {
    const fs = require('fs');
    const path = require('path');
    if (!fs.existsSync(app)) {
      let absolutepath = path.resolve(app);
      let msg = 'The app could not be found in following location: ' + absolutepath;
      logger.errorAndThrow(msg);
    }
  }

  // SOCKETS
  async connectSocket () {
    let retryCount = 0;
    let connected = false;
    while (retryCount < MAX_RETRY_COUNT && !connected) {
      if (retryCount > 0) {
        logger.info("Waiting " + (RETRY_BACKOFF / 1000) + " seconds before trying...");
        await sleep(RETRY_BACKOFF);
      }
      logger.info("Attempt #" + (retryCount + 1));

      let connectedPromise = new B((resolve) => {
        let net = require('net');

        let HOST = this.opts.youiEngineAppAddress;
        let PORT = 12345;

        logger.info('Connecting to WebDriver: ' + HOST + ':' + PORT);

        this.socket = new net.Socket();

        // Add an 'error' event handler for the client socket
        this.socket.on ('error', function (ex) {
          logger.error(ex);
          logger.error('Check that WebDriver is enabled in application, if a device ensure the proper IP address is used.');
          resolve(false);
        });
        // Add a 'close' event handler for the client socket
        this.socket.on ('close', function () {
          logger.info('Connection closed');
        });
        // Add a 'timeout' event handler for the client socket
        this.socket.on ('timeout', function () {
          logger.error('Connection timed out');
          resolve(false);
        });
        this.socket.connect (PORT, HOST, function () {
          logger.info('Connected');
          resolve(true);
        });
      });
      retryCount++;
      connected = await connectedPromise;

      if (!connected && retryCount === (MAX_RETRY_COUNT - 1)) {
        logger.errorAndThrow("Failed to connect " + MAX_RETRY_COUNT + " times. Aborting.");
      }
    }
    retryCount = 0;
    this.ready = connected;
  }

  // responses to the commands are BINARY
  async executeSocketCommand (cmd) {

    if (!this.socket.writable) {
      logger.info("Socket is not writable. Trying to reconnect.");
      await this.connectSocket();
    }

    let cmdPromise = new B((resolve) => {
      logger.debug('COMMAND: ' + cmd);

      let totaldata = [];
      let endMarker = new Buffer("youiend");
      let socketClient = this.socket;


      let dataHandler = function (data) {

        // determine if this includes an end parker
        // get last few values of buffer
        if (data.length >= endMarker.length) {
          let dataend = new Buffer(endMarker.length);
          let startIndex = data.length - endMarker.length;
          data.copy(dataend, 0, startIndex, startIndex + endMarker.length);
          //logger.debug('DATAEND' + dataend.toString());
          if (dataend.equals(endMarker)) {
            // remove data end
            let lastData = data.slice(0, startIndex);
            //logger.debug('LAST DATA: ' + lastData.toString());
            totaldata.push(lastData);

            //remove handler
            socketClient.removeListener('data', dataHandler);

            // resolve
            resolve(Buffer.concat(totaldata));
          } else {
            totaldata.push(data);
          }
        }
      };

      socketClient.write(cmd + "\n", "UTF8", () => {
        socketClient.on('data', dataHandler);
      });
    });
    return await cmdPromise;
  }
}

for (let [cmd, fn] of _.toPairs(commands)) {
  YouiEngineDriver.prototype[cmd] = fn;
}

export { YouiEngineDriver };
