import { youiEngineDriverReturnValues, youiEngineKeyCode } from '../utils';
import log from '../logger';


let commands = {}, extensions = {};

commands.installApp = async function (appPath) {
  await this.device.installApp(appPath);
};

commands.removeApp = async function (bundleId) {
  await this.device.removeApp(bundleId);
};

commands.closeApp = async function () {
  await this.device.closeApp();
};

commands.launchApp = async function () {
  await this.device.launchApp();
};

commands.isAppInstalled = async function (bundleId) {
  return await this.device.isAppInstalled(bundleId);
};

commands.yiCloseApp = async function () {
  let commandObject = {
    name: 'CloseApp'
  };
  let commandJSON = JSON.stringify(commandObject);

  let data = await this.executeSocketCommand(commandJSON);
  try {
    JSON.parse(data);
  } catch (e) {
    throw new Error("Bad response from CloseApp");
  }
};

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

commands.hideKeyboard = async function () {

  let commandObject = {
    name: `hideKeyboard`
  };
  let commandJSON = JSON.stringify(commandObject);

  let data = await this.executeSocketCommand(commandJSON);

  let result;
  try {
    result = JSON.parse(data);
  } catch (e) {
    throw new Error("Bad response from hideKeyboard");
  }
  return result.value;
};

commands.isKeyboardShown = async function () {

  let commandObject = {
    name: `isKeyboardShown`
  };
  let commandJSON = JSON.stringify(commandObject);

  let data = await this.executeSocketCommand(commandJSON);

  let result;
  try {
    result = JSON.parse(data);
  } catch (e) {
    throw new Error("Bad response from isKeyboardShown");
  }
  return result.value;
};

commands.mobilePressButton = async function mobilePressButton (opts = {}) {
  const {name} = opts;
  if (!name) {
    log.errorAndThrow('Button Name is mandatory');
  }

  let code;
  switch (name.toLowerCase()) {
    case "enter":
      code = 40;
      break;
    case "escape":
      code = 50;
      break;
    case "arrowleft":
      code = 75;
      break;
    case "arrowright":
      code = 76;
      break;
    case "arrowup":
      code = 77;
      break;
    case "arrowdown":
      code = 80;
      break;
    case "select":
      code = 85;
      break;
    case "mediafastforward":
      code = 156;
      break;
    case "mediarewind":
      code = 157;
      break;
    case "mediaplaypause":
      code = 158;
      break;
    case "systemhome":
      code = 218;
      break;
    case "systemback":
      code = 219;
      break;
    case "gamepad0":
      code = 220;
      break;
    case "gamepad1":
      code = 221;
      break;
    case "gamepad2":
      code = 222;
      break;
    case "gamepad3":
      code = 223;
      break;
    case "gamepadleftbumper":
      code = 224;
      break;
    case "gamepadrightbumper":
      code = 225;
      break;
    case "gamepadlefttrigger":
      code = 226;
      break;
    case "gamepadrightrigger":
      code = 227;
      break;
    case "gamepadleftstick":
      code = 228;
      break;
    case "gamepadrightstick":
      code = 229;
      break;
    case "gamepadselect":
      code = 230;
      break;
    case "gamepadstart":
      code = 231;
      break;
    default:
      throw new Error(`Unknown Button Name '${name.toLowerCase()}', try using 'mobile: pressKeyCode'`);
  }

  let commandObject = {
    name: `PressKey`,
    args: [`${code}`]
  };
  let commandJSON = JSON.stringify(commandObject);

  let data = await this.executeSocketCommand(commandJSON);

  let result;
  try {
    result = JSON.parse(data);
  } catch (e) {
    throw new Error("Bad response from PressButton");
  }

  return result.value;
};

commands.mobilePressKeyCode = async function mobilePressKeyCode (opts = {}) {
  const {keycode} = opts;
  if (!keycode) {
    log.errorAndThrow('KeyCode is mandatory');
  }

  let commandObject = {
    name: `PressKey`,
    args: [`${keycode}`]
  };
  let commandJSON = JSON.stringify(commandObject);

  let data = await this.executeSocketCommand(commandJSON);

  let result;
  try {
    result = JSON.parse(data);
  } catch (e) {
    throw new Error("Bad response from isKeyboardShown");
  }

  return result.value;
};

Object.assign(extensions, commands);
export { commands };
export default extensions;
