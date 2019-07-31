import logger from './logger';
import IOSDeploy from './ios-deploy';
import { youiEngineDriverReturnValues } from './utils';
import BaseDevice from './basedevice';

class TvOs extends BaseDevice {

  constructor () {
    super();
    this.bundleId;
    this.caps;
    this.iosdeploy;
    this.driver;
  }

  async execScript (script) {
    let shell = require('shelljs');
    script += ` --id ${this.caps.udid}`;
    logger.info(`script: ${script}`);
    try {
      return await shell.exec(script);
    } catch (err) {
      logger.debug(`Stdout: '${err.stdout}'. Stderr: '${err.stderr}'.`);
      throw new Error(`Could not run '${script}': '${err.message}'`);
    }
  }

  async closeApp () {
    logger.info(`tvOS: Close App`);
    let commandObject = {
      name: 'CloseApp'
    };
    let commandJSON = JSON.stringify(commandObject);
    let data = await this.driver.executeSocketCommand(commandJSON);
    let result;

    try {
      result = JSON.parse(data);
    } catch (e) {
      throw new Error('Bad response from CloseApp');
    }
    // get status returned and handle errors returned from server
    if (result.status === youiEngineDriverReturnValues.WEBDRIVER_UNKNOWN_COMMAND) {
      throw new Error('This command is only supported in You.i Engine v5.1.0+');
    }
  }

  async endSession () {
    logger.info(`tvOS: End Session`);
    // If multiple apps with our socket are installed, it will connect to the first app installed.
    // For this reason, every app should be uninstalled after running.
    if (this.caps.fullReset) {
      await this.removeApp(this.bundleId);
    } else {
      await this.closeApp();
    }
  }

  async installApp (appPath) {
    logger.info(`tvOS: Installing and launching app`);
    await this.iosdeploy.installApp(appPath);
  }

  async isAppInstalled (bundleId) {
    logger.info(`tvOS: Check if App is installed`);
    return await this.iosdeploy.isAppInstalled(bundleId);
  }

  async launchApp () {
    logger.info(`tvOS: Launching app`);
    await this.iosdeploy.launchApp(this.caps.app);
  }

  async removeApp (bundleId) {
    logger.info(`tvOS: Deleting app`);
    await this.iosdeploy.removeApp(bundleId);
  }

  async startSession (caps, driver) {
    logger.info(`tvOS: Start Session`);
    this.caps = caps;
    this.driver = driver;
    this.iosdeploy = new IOSDeploy(caps.udid);
    await this.iosdeploy.checkStatus();

    // Check if app is installed
    let shell = require('shelljs');
    this.bundleId = await shell.exec(`osascript -e 'id of app "${caps.app}"'`).replace(/(\r\n|\n|\r)/gm, '');
    let devAppInstalled = await this.isAppInstalled(this.bundleId);
    if (caps.fullReset || !devAppInstalled) {
      await this.installApp(caps.app);
      //await this.launchApp(caps.app);
    } else {
      await this.launchApp();
    }
  }

}
export default TvOs;
