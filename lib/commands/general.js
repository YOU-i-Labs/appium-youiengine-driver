import { youiEngineDriverReturnValues } from '../utils';
import logger from '../logger';
import bluesky from '../bluesky';

let commands = {};

commands.installApp = async function () {
  switch(this.caps.platformName) {
    case 'bluesky':
      await bluesky.installApp(this.caps.username, this.caps.password, this.caps.app, this.caps.youiEngineAppAddress);
      break;
    default:
      let msg = 'platform (' + this.caps.platformName + ') does not support this command';
      logger.errorAndThrow(msg);
  }
}

commands.removeApp = async function (appID) {
  switch(this.caps.platformName) {
    case 'bluesky':
      await bluesky.removeApp(this.caps.username, this.caps.password, this.caps.youiEngineAppAddress, appID);
      break;
    default:
      let msg = 'platform (' + this.caps.platformName + ') does not support this command';
      logger.errorAndThrow(msg);
  }
}

commands.closeApp = async function () {
  switch(this.caps.platformName) {
    case 'bluesky':
      await bluesky.closeApp(this.caps.youiEngineAppAddress);
      break;
    default:
      let msg = 'platform (' + this.caps.platformName + ') does not support this command';
      logger.errorAndThrow(msg);
  }
}

commands.launchApp = async function () {
  switch(this.caps.platformName) {
    case 'bluesky':
      await bluesky.launchApp(this.caps.youiEngineAppAddress);
      break;
    default:
      let msg = 'platform (' + this.caps.platformName + ') does not support this command';
      logger.errorAndThrow(msg);
  }
}

commands.getPageSource = async function () {

  let source;

  let commandObject = {
    name: 'GetSRC'
  };
  let commandJSON = JSON.stringify(commandObject);

  source = await this.executeSocketCommand(commandJSON);

  if (source) {
    return source.toString();
  } else {
    // this should never happen but we've received bug reports; this will help us track down
    // what's wrong in getTreeForXML
    throw new Error("Bad response from getTreeForXML");
  }
};

commands.getWindowSize = async function () {

  let commandObject = {
    name: `getWindowSize`
  };
  let commandJSON = JSON.stringify(commandObject);

  let data = await this.executeSocketCommand(commandJSON);

  let result;
  try {
    result = JSON.parse(data);
  } catch (e) {
    throw new Error("Bad response from window_size");
  }

  // get status returned and handle errors returned from server
  if (result.status === youiEngineDriverReturnValues.WEBDRIVER_NO_SUCH_WINDOW) {
    throw new Error("Could not find the requested surface");
  } else if (result.status === youiEngineDriverReturnValues.WEBDRIVER_UNKNOWN_COMMAND) {
    throw new Error("The requested command is not supported in the version of You.i Engine currently running.");
  }

  return result.value;
};

export default commands;
