import { errors } from 'appium-base-driver';
import { unwrapEl, youiEngineDriverReturnValues } from '../utils';
import { util } from 'appium-support';

let commands = {};

commands.getAttribute = async function (attribute, el) {
  el = unwrapEl(el);

  let commandObject = {
    name: 'getAttribute',
    args: [`${el}`, `${attribute}`]
  };
  let commandJSON = JSON.stringify(commandObject);

  let data = await this.executeSocketCommand(commandJSON);

  let result;
  try {
    result = JSON.parse(data);
  } catch (e) {
    throw new Error('Bad response from getAttribute');
  }

  // get status returned
  if (result.status === youiEngineDriverReturnValues.WEBDRIVER_STALE_ELEMENT) {
    throw new errors.StaleElementReferenceError(result.value);
  }

  if (result.status === youiEngineDriverReturnValues.WEBDRIVER_INVALID_SELECTOR) {
    throw new errors.InvalidSelectorError(result.value);
  }

  return result.value;
};

commands.setValue = async function (value, el) {
  el = unwrapEl(el);

  if (value instanceof Array) {
    value = value.join('');
  }
  if (typeof value !== 'string') {
    value = `${value}`;
  }
  value = util.escapeSpecialChars(value, "'");
  // de-escape \n so it can be used specially
  value = value.replace(/\\\\n/g, '\\n');

  let commandObject = {
    name: 'sendkeys',
    args: [`${el}`, `${value}`]
  };
  let commandJSON = JSON.stringify(commandObject);

  let data = await this.executeSocketCommand(commandJSON);

  let result;
  try {
    result = JSON.parse(data);
  } catch (e) {
    throw new Error('Bad response from setValue');
  }

  // get status returned
  if (result.status === youiEngineDriverReturnValues.WEBDRIVER_STALE_ELEMENT) {
    throw new errors.StaleElementReferenceError(result.value);
  }

  return result.value;

};

commands.getText = async function (el) {
  el = unwrapEl(el);

  let commandObject = {
    name: 'getText',
    args: [`${el}`]
  };
  let commandJSON = JSON.stringify(commandObject);

  let data = await this.executeSocketCommand(commandJSON);

  let result;
  try {
    result = JSON.parse(data);
  } catch (e) {
    throw new Error('Bad response from getText');
  }

  // get status returned
  if (result.status === youiEngineDriverReturnValues.WEBDRIVER_STALE_ELEMENT) {
    throw new errors.StaleElementReferenceError(result.value);
  }

  return result.value;

};

commands.elementEnabled = async function (el) {
  el = unwrapEl(el);

  let commandObject = {
    name: 'elementEnabled',
    args: [`${el}`]
  };
  let commandJSON = JSON.stringify(commandObject);

  let data = await this.executeSocketCommand(commandJSON);

  let result;
  try {
    result = JSON.parse(data);
  } catch (e) {
    throw new Error('Bad response from elementEnabled');
  }

  // get status returned and handle errors returned from server
  if (result.status === youiEngineDriverReturnValues.WEBDRIVER_UNKNOWN_COMMAND) {
    throw new errors.UnknownCommandError(result.value);
  } else if (result.status === youiEngineDriverReturnValues.WEBDRIVER_NO_SUCH_ELEMENT) {
    throw new errors.NoSuchElementError(result.value);
  }

  return result.value;
};

commands.elementSelected = async function (el) {
  el = unwrapEl(el);

  let commandObject = {
    name: 'elementSelected',
    args: [`${el}`]
  };
  let commandJSON = JSON.stringify(commandObject);

  let data = await this.executeSocketCommand(commandJSON);

  let result;
  try {
    result = JSON.parse(data);
  } catch (e) {
    throw new Error('Bad response from elementSelected');
  }

  // get status returned and handle errors returned from server
  if (result.status === youiEngineDriverReturnValues.WEBDRIVER_ELEMENT_IS_NOT_SELECTABLE) {
    throw new errors.ElementIsNotSelectableError(result.value);
  } else if (result.status === youiEngineDriverReturnValues.WEBDRIVER_NO_SUCH_ELEMENT) {
    throw new errors.NoSuchElementError(result.value);
  }

  return result.value;
};

commands.elementDisplayed = async function (el) {

  el = unwrapEl(el);

  let commandObject = {
    name: 'elementDisplayed',
    args: [`${el}`]
  };
  let commandJSON = JSON.stringify(commandObject);

  let data = await this.executeSocketCommand(commandJSON);

  let result;
  try {
    result = JSON.parse(data);
  } catch (e) {
    throw new Error('Bad response from elementDisplayed');
  }

  // get status returned and handle errors returned from server
  if (result.status === youiEngineDriverReturnValues.WEBDRIVER_UNKNOWN_COMMAND) {
    throw new errors.UnknownCommandError(result.value);
  } else if (result.status === youiEngineDriverReturnValues.WEBDRIVER_NO_SUCH_ELEMENT) {
    throw new errors.NoSuchElementError(result.value);
  }

  return result.value;
};

commands.clear = async function (el) {
  el = unwrapEl(el);

  let commandObject = {
    name: 'clear',
    args: [`${el}`]
  };

  let commandJSON = JSON.stringify(commandObject);

  let data = await this.executeSocketCommand(commandJSON);

  let result;
  try {
    result = JSON.parse(data);
  } catch (e) {
    throw new Error('Bad response from clear');
  }

  if (result.status === youiEngineDriverReturnValues.WEBDRIVER_NO_SUCH_ELEMENT) {
    throw new errors.NoSuchElementError(result.value);
  } else if (result.status === youiEngineDriverReturnValues.WEBDRIVER_UNKNOWN_COMMAND) {
    throw new errors.UnknownCommandError(result.value);
  }

  return result.value;
};

commands.getLocation = async function (el) {
  el = unwrapEl(el);

  let commandObject = {
    name: 'elementLocation',
    args: [`${el}`]
  };
  let commandJSON = JSON.stringify(commandObject);

  let data = await this.executeSocketCommand(commandJSON);

  let result;
  try {
    result = JSON.parse(data);
  } catch (e) {
    throw new Error('Bad response from elementLocation');
  }

  // get status returned and handle errors returned from server
  if (result.status === youiEngineDriverReturnValues.WEBDRIVER_UNKNOWN_COMMAND) {
    throw new errors.UnknownCommandError(result.value);
  } else if (result.status === youiEngineDriverReturnValues.WEBDRIVER_NO_SUCH_ELEMENT) {
    throw new errors.NoSuchElementError(result.value);
  }

  return result.value;
};

commands.getLocationInView = async function (elementId) {
  return await this.getLocation(elementId);
};

commands.getSize = async function (el) {
  el = unwrapEl(el);

  let commandObject = {
    name: 'elementSize',
    args: [`${el}`]
  };
  let commandJSON = JSON.stringify(commandObject);

  let data = await this.executeSocketCommand(commandJSON);

  let result;
  try {
    result = JSON.parse(data);
  } catch (e) {
    throw new Error('Bad response from getSize');
  }

  // get status returned and handle errors returned from server
  if (result.status === youiEngineDriverReturnValues.WEBDRIVER_UNKNOWN_COMMAND) {
    throw new errors.UnknownCommandError(result.value);
  } else if (result.status === youiEngineDriverReturnValues.WEBDRIVER_NO_SUCH_ELEMENT) {
    throw new errors.NoSuchElementError(result.value);
  }

  return result.value;
};

commands.getElementScreenshot = async function (el) {
  el = unwrapEl(el);

  let commandObject = {
    name: 'GetElementScreenShot',
    args: [`${el}`]
  };
  let commandJSON = JSON.stringify(commandObject);

  let data = await this.executeSocketCommand(commandJSON);

  let result;
  try {
    result = JSON.parse(data);
  } catch (e) {
    //Used to catch unknown characters on Tizen
    return new Buffer.from(data).toString('base64');
  }

  // get status returned and handle errors returned from server, else create the base64 image
  if (result.status === youiEngineDriverReturnValues.WEBDRIVER_ELEMENT_IS_NOT_VISIBLE) {
    throw new errors.UnknownCommandError(result.value);
  } else if (result.status === youiEngineDriverReturnValues.WEBDRIVER_NO_SUCH_ELEMENT) {
    throw new errors.NoSuchElementError(result.value);
  } else if (data) {
    return new Buffer.from(data).toString('base64');
  } else {
    throw new Error('Bad response from GetElementScreenShot');
  }

};

export default commands;
