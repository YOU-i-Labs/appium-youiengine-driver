import { BaseDriver } from 'appium-base-driver';
import desiredCapConstraints from './desired-caps';
import logger from './logger';
import commands from './commands/index';
import _ from 'lodash';
import { errors } from 'mobile-json-wire-protocol';
import B from 'bluebird';

class YouiDriver extends BaseDriver {
  resetYoui () {

      this.ready = false;
      this.socket = null;
      this.locatorStrategies = ['xpath', 'id', 'name', 'class name',
          'accessibility id'];
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
    
    await this.connectSocket();

    // TODO: this should be in BaseDriver.postCreateSession
    this.startNewCommandTimeout('createSession');

    return [sessionId, this.opts];
      
  }

  async stop() {
    this.ready = false;
  }

  async deleteSession () {
    logger.debug("Deleting Youi session");

    await this.stop();
    await super.deleteSession();
  }

  async executeCommand (cmd, ...args) {
    if (cmd === 'receiveAsyncResponse') {
      logger.debug(`Executing Youi driver response '${cmd}'`);
      return await this.receiveAsyncResponse(...args);
    } else if (this.ready) {
      logger.debug(`Executing WebDriver command '${cmd}'`);
      return super.executeCommand(cmd, ...args);
    } else {
      logger.debug(`Command Error '${cmd}'`);

      throw new errors.NoSuchDriverError(`Driver is not ready, cannot execute ${cmd}.`);
    }
  }

  validateDesiredCaps (caps) {
    // check with the base class, and return if it fails
    let res = super.validateDesiredCaps(caps);
    if (!res) return res;
    // finally, return true since the superclass check passed, as did this
    return true;
  }
    

// SOCKETS
    async connectSocket() {

        let connectedPromise = new B((resolve) => {
                var net = require('net');

        var HOST = this.opts.deviceName;
        var PORT = 12345;

        this.socket = new net.Socket();
      //  this.socket.setEncoding('binary');
        this.socket.connect(PORT, HOST, function() {

            logger.debug('CONNECTED TO: ' + HOST + ':' + PORT);
            resolve(true);
        });
        // Add a 'close' event handler for the client socket
        this.socket.on('close', function() {
            logger.debug('Connection closed');
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
        socketClient.write(cmd, "UTF8",() => {

        socketClient.on('data', function(data) {
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
                    resolve(Buffer.concat(totaldata));
                }
                else {
                    totaldata.push(data);
                }
            }
        });
    });
    });

    return await cmdPromise;
    }
}

for (let [cmd, fn] of _.pairs(commands)) {
  YouiDriver.prototype[cmd] = fn;
}

export { YouiDriver };
