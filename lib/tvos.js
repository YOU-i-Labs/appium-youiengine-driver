import logger from './logger';
import commands from './commands/index';


let udid = null;
let bundleid;
let tvos = {};

  tvos.startSession = function (caps) {
    logger.info(`tvOS: Start Session`);

    if (caps.udid) {
      this.udid = caps.udid;
    }
    else {
      this.udid = null; // We need this to update the state in the case where the udid is removed from the caps in the same Appium session.
    }
    // Check if app is installed
    let shell = require('shelljs');
    this.bundleid = shell.exec(`osascript -e 'id of app "${caps.app}"'`).replace(/(\r\n|\n|\r)/gm,"");
    let devAppInstalled = this.isAppInstalled(this.bundleid);
    if (caps.fullReset || !devAppInstalled) {
        this.installApp(caps.app);
    } else {
      this.launchApp(caps.app);
    }
  };

  tvos.endSession = function (caps) {
    logger.info(`tvOS: End Session`);
    // If multiple apps with our socket are installed, it will connect to the first app installed.
    // For this reason, every app should be uninstalled after running.
    if (caps.fullReset) {
      this.removeApp(this.bundleid);
    } else {
      //TODOthis.closeApp(caps.youiEngineAppAddress);
    }
  };

  tvos.removeApp = function (bundleid) {
    logger.info(`Deleting app`);
    let remove_script = `ios-deploy --uninstall_only --bundle_id ${bundleid}`;
      this.execScript(remove_script);
  };

  tvos.installApp = function (app) {
    logger.info(`tvOS: Installing and launching app`);
    let install_script = `ios-deploy --uninstall --justlaunch --bundle ${app}`;
    this.execScript(install_script);
  };

  tvos.launchApp = function (app) {
    logger.info(`tvOS: Launching app`);
    let install_script = `ios-deploy --noinstall --justlaunch --bundle ${app}`;
    this.execScript(install_script);
  };

  tvos.isAppInstalled = function (bundleid) {
    logger.info(`tvOS: Check if App is installed`);
    var install_script = `ios-deploy --exists --bundle_id ${bundleid}`;
    return this.execScript(install_script).includes('true');
  };

  tvos.execScript = function (script) {
    logger.info(`tvOS: execScript`);
    logger.info(`execScript: ${script}`);
    let shell = require('shelljs');
    if (this.udid) {
      script += ` --id ${this.udid}`;
      logger.info(`script: ${script}`);
    }
    try {
      return shell.exec(script);
    } catch (err) {
      logger.debug(`Stdout: '${err.stdout}'. Stderr: '${err.stderr}'.`);
      throw new Error(`Could not run '${script}': '${err.message}'`);
      return false;
    }
  };

  // bluesky.closeApp = function (youiEngineAppAddress) {
  //   // TODO
  // };

export default tvos;
