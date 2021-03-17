import logger from './logger';
import BaseDevice from './basedevice';

class YiLinux extends BaseDevice {
  constructor () {
    super();
    this.caps;
    this.shell;
  }

  async closeApp () {
    logger.info(`YiLinux: Close App`);
    let process_name = this.caps.app.substring(
      this.caps.app.lastIndexOf('/') + 1
    );
    await this.shell.exec(`killall ${process_name}`);
  }

  async endSession () {
    logger.info(`YiLinux: End Session`);
    await this.closeApp();
  }

  async launchApp () {
    logger.info(`YiLinux: Launch app`);
    let spawn = require('child_process').spawn,
        ls = await spawn(this.caps.app);

    //Print logs (STDOUT)
    ls.stdout.on('data', function (data) {
      if (data != null) {
        logger.debug(` Log Output: ${data.toString()}`);
      }
    });

    //Print logs (STDERR)
    ls.stderr.on('data', function (data) {
      if (data != null) {
        logger.debug(` Log Error: ${data.toString()}`);
      }
    });

    ls.on('exit', function (code) {
      if (code != null) {
        logger.debug(`Application exited with code ${code.toString()}`);
      }
    });
  }

  async startSession (caps) {
    logger.info(`YiLinux: Start Session`);
    this.caps = caps;
    this.shell = require('shelljs');
    await this.closeApp();
    await this.launchApp();
  }
}
export default YiLinux;
