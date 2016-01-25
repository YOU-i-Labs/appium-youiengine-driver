import { BaseDriver } from 'appium-base-driver';
import desiredCapConstraints from './desired-caps';
import logger from './logger';
import commands from './commands/index';
import _ from 'lodash';
import { errors } from 'mobile-json-wire-protocol';
import B from 'bluebird';
import IOSDriver from 'appium-ios-driver';

// Add commands from mobile-json-wire-protocol/lib/routes.js that should be mapped to existing drivers
const TO_PROXY = [
  'getLog',
  'getLogTypes'
];

class YouiDriver extends BaseDriver {
  resetYoui () {

      this.ready = false;
      this.socket = null;
      this.locatorStrategies = ['xpath', 'id', 'name', 'class name',
          'accessibility id'];
      this.proxydriver = null;
      this.proxyAllowList = TO_PROXY;
  }

  constructor(opts, shouldValidateCaps) {
    super(opts, shouldValidateCaps);

    this.desiredCapConstraints = desiredCapConstraints;
    this.resetYoui();

  }

  validateLocatorStrategy (strategy) {
    super.validateLocatorStrategy(strategy, false);
  }

  async createSession (caps) {

    logger.debug("starting session")

    let [sessionId] = await super.createSession(caps);

    // setup proxies
    if (this.opts.youiAppPlatform == "iOS")
    {
      await this.startIOSSession();
    }

    await this.connectSocket();

    return [sessionId, this.opts];

  }

  async stop() {
    this.ready = false;
  }

  async deleteSession () {
    logger.debug("Deleting Youi session");

    await this.proxydriver.deleteSession();

    await this.stop();
    await super.deleteSession();
  }

  driverShouldDoProxyCmd (command) {

    if (!this.proxydriver)
      return false;

    // only allow white listed commands
    for (let allowedCommand of this.proxyAllowList) {
      if (allowedCommand == command) {
        return true;
      }
    }
    return false;
  }

  async executeCommand (cmd, ...args) {
    if (cmd === 'receiveAsyncResponse') {
      logger.debug(`Executing Youi driver response '${cmd}'`);
      return await this.receiveAsyncResponse(...args);
    } else if (this.ready) {

      if (this.driverShouldDoProxyCmd(cmd))
      {
        logger.debug(`Executing proxied WebDriver command '${cmd}'`);

        // There are 2 CommandTimeout (YouiDriver and proxy)
        // Only YouiDriver CommandTimeout is used; Proxy is disabled
        // All proxy commands needs to reset the YouiDriver CommandTimeout
        // Here we manually reset the YouiDriver CommandTimeout for commands that goe to proxy.
        this.clearNewCommandTimeout;
        let result = this.proxydriver.executeCommand(cmd, ...args);
        this.startNewCommandTimeout;
        return result;
      }
      else
      {
        logger.debug(`Executing youi WebDriver command '${cmd}'`);
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
      platformVersion: opts.platformVersion,
      deviceName: opts.deviceName,
      // Disabling the proxy CommandTimeout
      newCommandTimeout: 0
    };
    await iosdriver.createSession(caps);

    return iosdriver;
  }

  async startIOSSession () {
    logger.info("Starting an IOS proxy session");
    let opts = _.cloneDeep(this.opts);

    this.proxydriver = await this.setupNewIOSDriver(opts);

  }



// SOCKETS
    async connectSocket() {

        let connectedPromise = new B((resolve) => {
                var net = require('net');

        var HOST = this.opts.youiAppAddress;
        var PORT = 12345;

        logger.debug('Connecting to WebDriver: ' + HOST + ':' + PORT);

        this.socket = new net.Socket();

        // Add an 'error' event handler for the client socket
        this.socket.on('error', function(ex) {
            logger.debug(ex);
            logger.errorAndThrow('Check that WebDriver is enabled in application, if a device ensure the proper IP address is used.');
        });
        // Add a 'close' event handler for the client socket
        this.socket.on('close', function() {
            logger.debug('Connection closed');
        });
        // Add a 'timeout' event handler for the client socket
        this.socket.on('timeout', function() {
            logger.debug('Connection timed out');
        });
        this.socket.connect(PORT, HOST, function() {
              logger.debug('Connected');
              resolve(true);
        });
    });

    this.ready = await connectedPromise;
    }

// responses to the commands are BINARY
    async executeSocketCommand(cmd) {

        let cmdPromise = new B((resolve) => {
            logger.debug('COMMAND: ' + cmd);

            var totaldata = [];
            var endMarker = new Buffer("youiend");
            let socketClient = this.socket;

            let dataHandler = function(data) {

                // logger.debug('RESPONSE: ' + data);
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
                    }
                    else {
                        totaldata.push(data);
                    }
                }
            };

            socketClient.write(cmd, "UTF8",() => {

                socketClient.on('data', dataHandler);

             });
          });



          return await cmdPromise;
    }
}

for (let [cmd, fn] of _.pairs(commands)) {
  YouiDriver.prototype[cmd] = fn;
}

export { YouiDriver };
