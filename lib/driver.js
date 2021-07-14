import { BaseDriver, DeviceSettings, errors } from 'appium-base-driver';
import desiredCapConstraints from './desired-caps';
import logger from './logger';
import commands from './commands';
import _ from 'lodash';
import B from 'bluebird';
import { sleep } from 'asyncbox';

// for proxies
import AndroidDriver from 'appium-uiautomator2-driver';
import XCUITestDriver from 'appium-xcuitest-driver';
import MacDriver from 'appium-mac-driver';
import BlueSky from './bluesky';
import TvOs from './tvos';
import TvOsSimulator from './tvossimulator';
import YiMac from './yimac';
import YiLinux from './yilinux';

// Add commands from the following location that should be mapped to existing drivers:
// https://github.com/appium/appium-base-driver/blob/master/lib/mjsonwp/routes.js

const TO_PROXY_COMMON = [
  'background',
  'closeApp',
  'getLog',
  'getLogTypes',
  'getOrientation',
  'getStrings',
  'installApp',
  'launchApp',
  'lock',
  'removeApp',
  'setOrientation',
  'getDeviceTime',
  'queryAppState',
  'getPerformanceData',
  'getSupportedPerformanceDataTypes'
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

const DEFAULT_MAX_RETRY_COUNT = 3;
const SOCKET_TIMEOUT = 120000;

class YouiEngineDriver extends BaseDriver {
  resetYouiEngine () {

    this.ready = false;
    this.socket = null;
    this.locatorStrategies = ['id', 'name', 'class name', 'accessibility id'];
    this.proxydriver = null;
    this.proxyAllowList = '';
    this.proxyAll = false;
    this.device = null;
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

      this.maxRetryCount = caps.maxRetryCount || DEFAULT_MAX_RETRY_COUNT;

      // setup proxies - if platformName is not empty, make it less case sensitive
      if (caps.platformName !== null) {
        let appPlatform = caps.platformName.toLowerCase();
        switch (appPlatform) {
          case 'ios':
          case 'tvos':
            await this.startXCUITestSession(caps);
            break;
          case 'android':
            await this.startAndroidSession(caps);
            break;
          case 'mac':
            await this.startMacSession(caps);
            break;
          case 'yimac':
            this.device = new YiMac();
            await this.device.startSession(caps);
            break;
          case 'yilinux':
            this.device = new YiLinux();
            await this.device.startSession(caps);
            break;
          case 'bluesky':
            this.device = new BlueSky();
            await this.device.startSession(caps);
            break;
          case 'yitvos': {
            let shell = require('shelljs');
            if (
              shell
                .exec(`instruments -s devices | grep '${caps.udid}'`)
                .includes('(Simulator)')
            ) {
              this.device = new TvOsSimulator();
            } else {
              this.device = new TvOs();
            }
            await this.device.startSession(caps, this);
            break;
          }
          case 'noproxy':
          case 'connecttoapp':
            break;
          default:
            logger.errorAndThrow(
              `Unsupported platformName: ${caps.platformName}`
            );
        }
      }
      await this.connectSocket();

      if (caps.fullSourceTree === true) {
        //Do not set filter
      } else {
        logger.debug('Setting SourceTreeFilter to displayed elements only');
        await this.updateSettings({
          SourceTreeFilter: "[@isDisplayed='true']",
        });
      }

      return [sessionId, this.opts];
    } catch (e) {
      await this.deleteSession();
      throw e;
    }
  }

  async onSettingsUpdate (key, value) {
    if (key === 'TimeDilation') {
      await this.setTimeDilation(value);
    } else if (key === 'SourceTreeFilter') {
      await this.setSourceTreeFilter(value);
    }
  }

  async stop () { // eslint-disable-line require-await
    this.ready = false;
  }

  async deleteSession () {
    logger.debug('Deleting YouiEngine session');

    if (this.caps?.platformName) {
      let appPlatform = this.caps.platformName.toLowerCase();

      if (['yimac', 'yitvos', 'bluesky', 'yilinux'].includes(appPlatform)) {
        if (this.device) {
          this.device.endSession();
        }
      }
    }

    if (this.proxydriver !== null) {
      await this.proxydriver.deleteSession();
    }
    this.socket?.end();
    this.socket?.destroy();
    await super.deleteSession();
    await this.stop();
  }

  driverShouldDoProxyCmd (command) {
    if (!this.proxydriver) {
      return false;
    }

    if (this.proxyAll) {
      return true;
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
    }

    if (this.ready) {

      if (this.driverShouldDoProxyCmd(cmd)) {
        logger.debug(`Executing proxied WebDriver command '${cmd}'`);

        // Manually handle our own YOUI_APP context
        if (cmd === 'setContext' && args[0] === 'YOUI_APP') {
          this.proxyAll = false;
          return await this.executeCommand(cmd, ...args);
        }

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
        return await super.executeCommand(cmd, ...args);
      }
    } else {
      logger.debug(`Command Error '${cmd}'`);
      throw new errors.NoSuchDriverError(
        `Driver is not ready, cannot execute ${cmd}.`
      );
    }
  }

  validateDesiredCaps (caps) {
    // check with the base class, and return if it fails
    let res = super.validateDesiredCaps(caps);
    if (!res) {
      return res;
    }

    const platformName = caps.platformName.toLowerCase();

    // make sure that the capabilities has youiEngineAppAddress
    if (!caps.youiEngineAppAddress && platformName !== 'noproxy') {
      let msg = 'The desired capabilities must include youiEngineAppAddress';
      logger.errorAndThrow(msg);
    }

    // App is being launched
    if (platformName !== 'connecttoapp' && platformName !== 'noproxy') {
      // make sure that the capabilities has app
      if (!caps.app) {
        let msg = 'The desired capabilities must include app';
        logger.errorAndThrow(msg);
      }
      const fs = require('fs');
      const path = require('path');
      if (!fs.existsSync(caps.app)) {
        let absolutepath = path.resolve(caps.app);
        let msg =
          'The app could not be found in following location: ' + absolutepath;
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

  async setupNewXCUITestDriver (caps) {
    let args = {
      javascriptEnabled: true,
    };
    args = Object.assign(this.opts, args);

    let driver = new XCUITestDriver(args);

    let capsCopy = _.cloneDeep(caps);
    // Disabling the proxy CommandTimeout in the iOS driver since we are now handling it in the YouiEngine Driver
    capsCopy.newCommandTimeout = 0;
    await driver.createSession(capsCopy);

    return driver;
  }

  async startXCUITestSession (caps) {
    logger.info('Starting an IOS proxy session');
    this.proxyAllowList = TO_PROXY_IOS;

    this.proxydriver = await this.setupNewXCUITestDriver(caps);
  }

  async setupNewAndroidDriver (caps) {
    let androidArgs = {
      ...this.opts,
      javascriptEnabled: true,
    };
    let androiddriver = new AndroidDriver(androidArgs);
    this.setSecurityOptions(androiddriver);

    let capsCopy = _.cloneDeep(caps);
    // Disabling the proxy CommandTimeout in the Android driver since we are now handling it in the YouiEngine Driver
    capsCopy.newCommandTimeout = 0;

    await androiddriver.createSession(capsCopy);

    return androiddriver;
  }

  async startAndroidSession (caps) {
    logger.info('Starting an Android proxy session');
    this.proxyAllowList = TO_PROXY_ANDROID;

    this.proxydriver = await this.setupNewAndroidDriver(caps);
  }

  async setupNewMacDriver (caps) {
    let macArgs = {
      javascriptEnabled: true,
    };
    let macdriver = new MacDriver(macArgs);
    let capsCopy = _.cloneDeep(caps);
    // Disabling the proxy CommandTimeout in the proxied driver since we are now handling it in the YouiEngine Driver
    capsCopy.newCommandTimeout = 0;

    await macdriver.createSession(capsCopy);

    return macdriver;
  }

  async startMacSession (caps) {
    logger.info('Starting a Mac proxy session');
    this.proxyAllowList = TO_PROXY_MAC;

    this.proxydriver = await this.setupNewMacDriver(caps);
  }

  setSecurityOptions (driver) {
    if (this.relaxedSecurityEnabled) {
      driver.relaxedSecurityEnabled = this.relaxedSecurityEnabled;
    }

    if (this.denyInsecure) {
      driver.denyInsecure = this.denyInsecure;
    }

    if (this.allowInsecure) {
      driver.allowInsecure = this.allowInsecure;
    }
  }

  // SOCKETS
  async connectSocket () {
    let retryCount = 0;
    let connected = false;
    let errno = 'EOK';
    while (retryCount < this.maxRetryCount && !connected) {
      logger.info('Attempt #' + (retryCount + 1));

      let connectedPromise = new B((resolve) => {
        let net = require('net');

        let HOST = this.opts.youiEngineAppAddress;
        let PORT;

        if (this.caps.youiEngineAppPort) {
          PORT = this.caps.youiEngineAppPort;
        } else if (this.caps.platformName.toLowerCase() === 'yips4') {
          PORT = 40123; //default port for PS4
        } else {
          PORT = 12345; //default port
        }
        if (this.caps.platformName.toLowerCase() === 'android' && this.caps.youiEngineAppAddress.toLowerCase() === 'localhost') {
          let shell = require('shelljs');
          logger.info(' Forwarding the port for Android Emulators ');
          shell.exec(`adb -s '${this.caps.deviceName}' forward tcp:'${PORT}' tcp:'${PORT}'`);
          logger.info(' Forwarding the traffic for Android Emulator ');
        }
        {
          logger.info('Connecting to WebDriver: ' + HOST + ':' + PORT);
        }

        this.socket = new net.Socket();
        this.socket.setTimeout(SOCKET_TIMEOUT);
        this.socket.setKeepAlive(true, 1000);

        let socketClient = this.socket;

        let removeListenerHandler = function () {
          socketClient.removeListener('timeout', timeoutHandler);
          socketClient.removeListener('close', closeHandler);
          socketClient.removeListener('end', endHandler);
          socketClient.removeListener('error', errorHandler);
        };

        // Add an 'error' event handler for the client socket
        let errorHandler = function (ex) {
          logger.error(ex);
          logger.error(
            'Check that WebDriver is enabled in application, if a device ensure the proper IP address is used.'
          );
          removeListenerHandler();
          socketClient.destroy();
          errno = ex.errno;
          resolve(false);
        };
        this.socket.on('error', errorHandler);
        // Add a 'close' event handler for the client socket
        let closeHandler = function () {
          logger.info('Connection closed');
          removeListenerHandler();
          socketClient.destroy();
          resolve(false);
        };
        this.socket.on('close', closeHandler);
        // Add a 'timeout' event handler for the client socket
        let timeoutHandler = function () {
          logger.error('Connection timed out');
          removeListenerHandler();
          socketClient.destroy();
          resolve(false);
        };
        this.socket.on('timeout', timeoutHandler);
        this.socket.connect(PORT, HOST, function () {
          logger.error('Connection established');
          removeListenerHandler();
          resolve(true);
        });
        let endHandler = function () {
          logger.info('Connection ended');
          removeListenerHandler();
          socketClient.destroy();
          resolve(false);
        };
        this.socket.on('end', endHandler);
      });
      retryCount++;
      connected = await connectedPromise;

      if (!connected && (errno === 'ECONNREFUSED' || errno === -61)) {
        logger.debug('Connection refused, sleeping...');
        await sleep(4000);
        errno = 'EOK';
      }

      if (!connected && retryCount === this.maxRetryCount) {
        logger.errorAndThrow('Failed to connect ' + this.maxRetryCount + ' times. Aborting.');
      }
    }
    retryCount = 0;
    this.ready = connected;
  }

  async executeSocketCommand (cmd) {
    if (!this.socket.writable) {
      logger.info('Socket is not writable. Trying to reconnect.');
      await this.connectSocket();
    }

    let retryCount = 0;
    while (retryCount < this.maxRetryCount) {
      this.socket.setTimeout(SOCKET_TIMEOUT);

      let cmdPromise = new B((resolve) => {
        logger.debug('COMMAND: ' + cmd);

        let totaldata = [];
        let endMarker = new Buffer.from('youiend');
        let socketClient = this.socket;

        let removeListenerHandler = function () {
          socketClient.removeListener('data', dataHandler);
          socketClient.removeListener('timeout', timeoutHandler);
          socketClient.removeListener('error', errorHandler);
        };

        let timeoutHandler = function () {
          logger.info('Timeout in execute command.');
          removeListenerHandler();
          resolve(false);
        };

        let errorHandler = function () {
          logger.info('On error');
          removeListenerHandler();
          resolve(false);
        };

        let dataHandler = function (data) {
          // determine if this includes an end marker
          // get last few values of buffer
          if (data.length >= endMarker.length) {
            let dataend = new Buffer.alloc(endMarker.length);
            let startIndex = data.length - endMarker.length;
            data.copy(dataend, 0, startIndex, startIndex + endMarker.length);
            if (dataend.equals(endMarker)) {
              // remove data end
              let lastData = data.slice(0, startIndex);
              totaldata.push(lastData);

              removeListenerHandler();

              // resolve
              resolve(Buffer.concat(totaldata));
            } else {
              totaldata.push(data);
            }
          }
        };

        socketClient.write(cmd + '\n', 'UTF8', () => {
          socketClient.on('data', dataHandler);
          socketClient.on('timeout', timeoutHandler);
          socketClient.on('error', errorHandler);
        });
      });
      let res = await cmdPromise;
      if (res === false) {
        retryCount++;
        logger.info('Socket failed. Retrying: ' + retryCount);
        continue;
      } else {
        return res;
      }
    }
    throw new Error('ExecuteSocketCommand failed.');
  }
}

for (let [cmd, fn] of _.toPairs(commands)) {
  YouiEngineDriver.prototype[cmd] = fn;
}
export { YouiEngineDriver };
