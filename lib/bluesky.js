import logger from './logger';
import BaseDevice from './basedevice';

class BlueSky extends BaseDevice {

  constructor () {
    super();
    let channelId;
    let caps;
    let shell;
  }

  closeApp () {
    logger.info(`BlueSky: Close App`);
    this.shell.exec(`curl -d '' http://${this.caps.youiEngineAppAddress}:8060/keypress/home`);
  };

  endSession () {
    logger.info(`BlueSky: End Session`);
    if (this.caps.fullReset) {
      this.removeApp(this.channelId);
    } else {
      this.closeApp();
    }
  };

  installApp (appPath) {
    logger.info(`BlueSky: Installing and launching app`);
    if (this.isAppInstalled(this.channelId)){
      this.removeApp(this.channelId);
    }
    this.shell.exec(`curl -v -# -f -i --user '${this.caps.username}:${this.caps.password}' --digest --progress-bar -F 'mysubmit=Install' -F 'archive=@${appPath}' -F 'passwd=' http://${this.caps.youiEngineAppAddress}/plugin_install | grep '<font color' | sed 's/<font color=\'red\'>//' `);
    this.launchApp();
  };
  isAppInstalled (channelId = this.channelId) {
    logger.info(`BlueSky: Check if App is installed`);
    // Check if app is installed
    let devAppInstalled = false;
    let installedApps = this.shell.exec(`curl http://${this.caps.youiEngineAppAddress}:8060/query/apps`);
    if (installedApps.includes(`id="${channelId}"`)) {
      devAppInstalled = true;
    }
    return devAppInstalled;
  };

  launchApp () {
    logger.info(`BlueSky: Launch app`);
    this.shell.exec(`curl -d '' http://${this.caps.youiEngineAppAddress}:8060/launch/${this.channelId}`);
  };

  removeApp (channelId = this.channelId) {
    logger.info(`BlueSky: Delete app`);
    this.shell.exec(`curl --user ${this.caps.username}:${this.caps.password} --digest --progress-bar --show-error -F 'mysubmit=Delete' -F 'archive=' --output /tmp/dev_server_out --write-out '%{http_code}' 'http://${this.caps.youiEngineAppAddress}/plugin_install'`);
  };

  startSession (caps) {
    logger.info(`BlueSky: Start Session`);
    this.caps = caps;
    this.shell = require('shelljs');
    this.channelId = 'dev';
    if (caps.channelId) {
      this.channelId = caps.channelId;
    }
    // Check if app is installed
    let devAppInstalled = this.isAppInstalled(this.channelId);

    if (caps.fullReset || !devAppInstalled) {
      this.installApp(caps.app);
    } else{
      this.launchApp();
    }
  };

}

export default BlueSky;
