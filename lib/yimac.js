import logger from './logger';
import BaseDevice from './basedevice';

class YiMac extends BaseDevice {

  constructor () {
    super();
    this.caps;
    this.shell;
  }

  async closeApp () {
    logger.info(`YiMac: Close App`);
    let process_name = this.caps.app.substring(this.caps.app.lastIndexOf('/') + 1);
    await this.shell.exec(`killall ${process_name}`);
  }

  async endSession () {
    logger.info(`YiMac: End Session`);
    await this.closeApp();
  }

  async launchApp () {
    logger.info(`YiMac: Launch app`);
    let spawn = require('child_process').spawn,
        ls = await spawn(this.caps.app);

    let showXcodeLog = this.caps.showXcodeLog; //For some reason stderr statement sees this.caps as undefined?!

    //Print Xcode logs (STDOUT)
    ls.stdout.on('data', function (data) {
      if (showXcodeLog === true && data != null) {
        logger.debug(`Xcode Log Output: ${data.toString()}`);
      }
    });

    //Print Xcode logs (STDERR)
    ls.stderr.on('data', function (data) {
      if (showXcodeLog === true && data != null) {
        logger.debug(`Xcode Log Error: ${data.toString()}`);
      }
    });

    ls.on('exit', function (code) {
      if (showXcodeLog === true && code != null) {
        logger.debug(`Application exited with code ${code.toString()}`);
      }
    });
  }

  async startSession (caps) {
    logger.info(`YiMac: Start Session`);
    this.caps = caps;
    this.shell = require('shelljs');
    await this.closeApp();
    await this.launchApp();
  }

}
export default YiMac;
