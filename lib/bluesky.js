import logger from './logger';
import BaseDevice from './basedevice';
import { sleep } from 'asyncbox';

class BlueSky extends BaseDevice {

  constructor () {
    super();
    this.channelId;
    this.caps;
    this.shell;
  }

  async closeApp () {
    logger.info(`BlueSky: Close App`);
    await this.shell.exec(`curl -d '' http://${this.caps.youiEngineAppAddress}:8060/keypress/home`);
    let activeApp;
    do {
      await sleep (1000);
      activeApp = await this.shell.exec(`curl http://${this.caps.youiEngineAppAddress}:8060/query/active-app`);
    } while (!(activeApp.includes(`<app>Roku</app>`)));
  }

  async endSession () {
    logger.info(`BlueSky: End Session`);
    if (this.caps.fullReset) {
      await this.removeApp(this.channelId);
    } else {
      await this.closeApp();
    }
  }

  async installApp (appPath) {
    logger.info(`BlueSky: Installing and launching app`);
    if (await this.isAppInstalled(this.channelId)) {
      await this.removeApp(this.channelId);
    }
    // eslint-disable-next-line no-useless-escape
    await this.shell.exec(`curl -v -# -f -i --user '${this.caps.username}:${this.caps.password}' --digest --progress-bar -F 'mysubmit=Install' -F 'archive=@${appPath}' -F 'passwd=' http://${this.caps.youiEngineAppAddress}/plugin_install | grep '<font color' | sed 's/<font color=\'red\'>//' `);
    await this.launchApp();
  }

  async isAppInstalled (channelId = this.channelId) {
    logger.info(`BlueSky: Check if App is installed`);
    // Check if app is installed
    let devAppInstalled = false;
    let installedApps = await this.shell.exec(`curl http://${this.caps.youiEngineAppAddress}:8060/query/apps`);
    if (installedApps.includes(`id="${channelId}"`)) {
      devAppInstalled = true;
    }
    return devAppInstalled;
  }

  async launchApp () {
    logger.info(`BlueSky: Launch app`);
    let activeApp;
    do {
      await sleep(5000);
      await this.shell.exec(`curl -d '' http://${this.caps.youiEngineAppAddress}:8060/launch/${this.channelId}`);
      activeApp = await this.shell.exec(`curl http://${this.caps.youiEngineAppAddress}:8060/query/active-app`);
    } while (!(activeApp.includes(`id="${this.channelId}"`)));
  }

  async removeApp (channelId) { // eslint-disable-line no-unused-vars
    logger.info(`BlueSky: Delete app`);
    await this.shell.exec(`curl --user ${this.caps.username}:${this.caps.password} --digest --progress-bar --show-error -F 'mysubmit=Delete' -F 'archive=' --output /tmp/dev_server_out --write-out '%{http_code}' 'http://${this.caps.youiEngineAppAddress}/plugin_install'`);
  }

  async startSession (caps) {
    logger.info(`BlueSky: Start Session`);
    this.caps = caps;
    this.shell = require('shelljs');
    this.channelId = 'dev';
    if (caps.channelId) {
      this.channelId = caps.channelId;
    }
    // Check if app is installed
    let devAppInstalled = await this.isAppInstalled(this.channelId);

    if (caps.fullReset || !devAppInstalled) {
      await this.installApp(caps.app);
    } else {
      await this.launchApp();
    }
  }

}

export default BlueSky;
