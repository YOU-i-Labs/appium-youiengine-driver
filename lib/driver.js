import { BaseDriver, errors } from 'appium-base-driver';
import desiredCapConstraints from './desired-caps';
import logger from './logger';
import commands from './commands/index';
import _ from 'lodash';
import B from 'bluebird';
import { sleep } from 'asyncbox';

// for proxies
import IOSDriver from 'appium-ios-driver';
import AndroidDriver from 'appium-android-driver';

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
  'isAppInstalled',
  'isLocked',
  'toggleData',
  'toggleFlightMode',
  'toggleLocationServices',
  'toggleWiFi',
  'unlock',
];

const TO_PROXY_IOS = TO_PROXY_IOS_ONLY.concat(TO_PROXY_COMMON);
const TO_PROXY_ANDROID = TO_PROXY_ANDROID_ONLY.concat(TO_PROXY_COMMON);

const MAX_RETRY_COUNT = 10;
const RETRY_BACKOFF = 3000;

class YouiEngineDriver extends BaseDriver {
  resetYouiEngine () {

    this.ready = false;
    this.socket = null;
    this.locatorStrategies = ['xpath', 'id', 'name', 'class name',
          'accessibility id'];
    this.proxydriver = null;
    this.proxyAllowList = '';
  }

  constructor (opts, shouldValidateCaps) {
    super(opts, shouldValidateCaps);

    this.desiredCapConstraints = desiredCapConstraints;
    this.resetYouiEngine();

  }

  validateLocatorStrategy (strategy) {
    super.validateLocatorStrategy(strategy, false);
  }

  async createSession (caps) {
    let [sessionId] = await super.createSession(caps);

    // setup proxies - if platformName is not empty, make it less case sensitive
    if (this.opts.platformName !== null) {
      let appPlatform = this.opts.platformName.toLowerCase();
      if (appPlatform === "ios") {
        await this.startIOSSession();
      } else if (appPlatform === "android") {
        await this.startAndroidSession();
      }
    }

    await this.connectSocket();

    if (!this.ready) {
      logger.errorAndThrow("Socket connection failed...");
    }

    return [sessionId, this.opts];
  }

  async stop () {
    this.ready = false;
  }

  async deleteSession () {
    logger.debug("Deleting YouiEngine session");

    await this.proxydriver.deleteSession();
    await super.deleteSession();

    await this.stop();
  }

  driverShouldDoProxyCmd (command) {

    if (!this.proxydriver)
      return false;

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
    if (!res) return res;

    // make sure that the capabilities have one of `app` or `bundleId`
    if ((caps.browserName || '').toLowerCase() !== 'safari' &&
        !caps.app && ! caps.bundleId) {
      let msg = 'The desired capabilities must include either an app or a bundleId for iOS';
      logger.errorAndThrow(msg);
    }

    // finally, return true since the superclass check passed, as did this
    return true;
  }

  async setupNewIOSDriver (opts) {
    let iosArgs = {
      javascriptEnabled: true,
    };
    let iosdriver = new IOSDriver(iosArgs);

    let caps = {
      platformName: "iOS",
      browserName: "",
      app: this.caps.app,
      udid: this.caps.udid,
      platformVersion: opts.platformVersion,
      deviceName: opts.deviceName,
      // Disabling the proxy CommandTimeout in the iOS driver since we are now handling it in the YouiEngine Driver
      newCommandTimeout: 0
    };
    await iosdriver.createSession(caps);

    return iosdriver;
  }

  async startIOSSession () {
    logger.info("Starting an IOS proxy session");
    this.proxyAllowList = TO_PROXY_IOS;
    let opts = _.cloneDeep(this.opts);

    this.proxydriver = await this.setupNewIOSDriver(opts);

  }

  async setupNewAndroidDriver (opts) {
    let androidArgs = {
      javascriptEnabled: true
    };
    let androiddriver = new AndroidDriver(androidArgs);

    let caps = {
      platformName: "android",
      browserName: "",
      app: this.caps.app,
      platformVersion: opts.platformVersion,
      deviceName: opts.deviceName,
      avd: this.caps.avd,
      // Disabling the proxy CommandTimeout in the Android driver since we are now handling it in the YouiEngine Driver
      newCommandTimeout: 0
    };
    await androiddriver.createSession(caps);

    return androiddriver;
  }

  async startAndroidSession () {
    logger.info("Starting an Android proxy session");
    this.proxyAllowList = TO_PROXY_ANDROID;
    let opts = _.cloneDeep(this.opts);

    this.proxydriver = await this.setupNewAndroidDriver(opts);
  }

// SOCKETS
  async connectSocket () {

    var retryCount = 0;
    var connected = false;
    while (retryCount < MAX_RETRY_COUNT && !connected) {

      if (retryCount > 0){
        logger.info("Waiting " + (RETRY_BACKOFF/1000) + " seconds before trying...");
        await sleep(RETRY_BACKOFF);
      }
      logger.info("Attempt #" + (retryCount + 1));

      var connectedPromise = new B((resolve) => {
        var net = require('net');

        var HOST = this.opts.youiEngineAppAddress;
        var PORT = 12345;

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
        this.deleteSession();
        logger.error("Failed to connect " + MAX_RETRY_COUNT + " times. Aborting.");
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

      var totaldata = [];
      var endMarker = new Buffer("youiend");
      let socketClient = this.socket;


      let dataHandler = function (data) {
        logger.debug('RESPONSE: ' + data);

        // determine if this includes an end parker
        // get last few values of buffer
        if (data.length >= endMarker.length) {
          var dataend = new Buffer(endMarker.length);
          var startIndex = data.length - endMarker.length;
          data.copy(dataend, 0, startIndex, startIndex + endMarker.length);
          //logger.debug('DATAEND' + dataend.toString());
          if (dataend.equals(endMarker)) {
            // remove data end
            var lastData = data.slice(0, startIndex);
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
