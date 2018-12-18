import logger from './logger';
import commands from './commands/index';

let bluesky = {};

  bluesky.startSession = function (caps) {
    logger.info(`BlueSky: Start Session`);
    let channelId = 'dev';
    if (caps.channelId) {
      channelId = caps.channelId;
    }
    // Check if app is installed
    let devAppInstalled = this.isAppInstalled(caps.youiEngineAppAddress, channelId);

    if (caps.fullReset || !devAppInstalled) {
      this.installApp(caps.username, caps.password, caps.app, caps.youiEngineAppAddress);
    } else{
      this.launchApp(caps.youiEngineAppAddress, channelId);
    }
  };

  bluesky.endSession = function (caps) {
    logger.info(`BlueSky: End Session`);
    if (caps.fullReset) {
      this.removeApp(caps.username, caps.password, caps.youiEngineAppAddress);
    } else {
      this.closeApp(caps.youiEngineAppAddress);
    }
  };

  bluesky.removeApp = function (username, password, youiEngineAppAddress, channelId = 'dev') {
    logger.info(`BlueSky: Delete app`);
    let shell = require('shelljs');
    let bluesky_delete_script = `curl --user ${username}:${password} --digest --progress-bar --show-error -F 'mysubmit=Delete' -F 'archive=' --output /tmp/dev_server_out --write-out '%{http_code}' 'http://${youiEngineAppAddress}/plugin_install'`;
    shell.exec(bluesky_delete_script);
  };

  bluesky.installApp = function (username, password, app, youiEngineAppAddress, channelId = 'dev') {
    logger.info(`BlueSky: Installing and launching app`);
    if (this.isAppInstalled(youiEngineAppAddress, channelId)){
      this.removeApp();
    }
    let bluesky_install_script = `curl -v -# -f -i --user '${username}:${password}' --digest --progress-bar -F 'mysubmit=Install' -F 'archive=@${app}' -F 'passwd=' http://${youiEngineAppAddress}/plugin_install | grep '<font color' | sed 's/<font color=\'red\'>//' `; // eslint-disable-line no-useless-escape
    let shell = require('shelljs');
    shell.exec(bluesky_install_script);
  };

  bluesky.launchApp = function (youiEngineAppAddress, channelId = 'dev') {
    logger.info(`BlueSky: Launch app`);
    let shell = require('shelljs');
    let bluesky_install_script = `curl -d '' http://${youiEngineAppAddress}:8060/launch/${channelId}`;
    shell.exec(bluesky_install_script);
  };

  bluesky.isAppInstalled = function (youiEngineAppAddress, channelId = 'dev') {
    logger.info(`BlueSky: Check if App is installed`);
    // Check if app is installed
    let devAppInstalled = false;
    let shell = require('shelljs');
    let installedApps = shell.exec(`curl http://${youiEngineAppAddress}:8060/query/apps`);
    if (installedApps.includes(`id="${channelId}"`)) {
      devAppInstalled = true;
    }
    return devAppInstalled;
  };

  bluesky.closeApp = function (youiEngineAppAddress) {
    logger.info(`BlueSky: Close App`);
    let shell = require('shelljs');
    shell.exec(`curl -d '' http://${youiEngineAppAddress}:8060/keypress/home`);
  };

export default bluesky;
