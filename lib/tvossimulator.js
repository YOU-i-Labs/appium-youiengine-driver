import logger from './logger';
import { sleep } from 'asyncbox';
import { getSimulator } from 'appium-ios-simulator';
import * as simctl from 'node-simctl';
import BaseDevice from './basedevice';

class TvOsSimulator extends BaseDevice {

  constructor () {
    super();
    this.bundleId;
    this.caps;
    this.shell;
    this.sim;
  }

  execScript (script) {
    logger.debug(`tvOS simulator: execScript`);
    script += ` --id ${this.caps.udid}`;
    try {
      return this.shell.exec(script);
    } catch (err) {
      logger.debug(`Stdout: '${err.stdout}'. Stderr: '${err.stderr}'.`);
      throw new Error(`Could not run '${script}': '${err.message}'`);
    }
  }


  async closeApp () {
    logger.info(`tvOS simulator: Close app`);
    await simctl.terminate(this.caps.udid, this.bundleId);
  }

  async endSession () {
    logger.info(`tvOS simulator: End Session`);
    // If multiple apps with our socket are installed, it will connect to the first app installed.
    // For this reason, every app should be uninstalled after running.
    if (this.caps.fullReset) {
      await this.removeApp(this.bundleId);
    } else {
      await this.closeApp();
    }
  }

  async installApp (appPath) {
    logger.info(`tvOS simulator: Installing and launching app`);
    this.bundleId = this.shell.exec(`osascript -e 'id of app "${appPath}"'`).replace(/(\r\n|\n|\r)/gm, '');
    let retry = false;
    do {
      try {
        await this.sim.installApp(appPath);
        retry = false;
      } catch (err) {
        retry = true;
      }
    }
    while (retry === true);
    await simctl.launch(this.caps.udid, this.bundleId);
  }

  async isAppInstalled (bundleId) {
    logger.info(`tvOS simulator: Check if App is installed`);
    return await this.sim.isAppInstalled(bundleId);
  }

  async launchApp () {
    logger.info(`tvOS simulator: Launching app`);
    await simctl.launch(this.caps.udid, this.bundleId);
  }

  async removeApp (bundleId) {
    logger.info(`tvOS simulator: Deleting app`);
    await this.sim.removeApp(bundleId);
  }

  async startSession (caps) {
    logger.info(`tvOS simulator: Start Session`);
    this.caps = caps;
    this.shell = require('shelljs');

    this.sim = await getSimulator(this.caps.udid);
    await this.sim.run({startupTimeout: 10000});
    await sleep(4000);
    // Check if app is installed
    this.bundleId = this.shell.exec(`osascript -e 'id of app "${caps.app}"'`).replace(/(\r\n|\n|\r)/gm, '');
    let devAppInstalled = await this.isAppInstalled(this.bundleId);
    if (caps.fullReset || !devAppInstalled) {
      await this.installApp(caps.app);
    } else {
      await this.launchApp(caps.app);
    }
  }
}
export default TvOsSimulator;
