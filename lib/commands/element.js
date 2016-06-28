import logger from '../logger';
import { errors } from 'mobile-json-wire-protocol';
import { unwrapEl } from '../utils';
import { youiEngineDriverReturnValues } from '../utils';
import { util } from 'appium-support';

let commands = {};

commands.getAttribute = async function (attribute, el) {
  el = unwrapEl(el);

  var commandObject = {
    name: 'getAttribute',
    args: [`${el}`, `${attribute}`]
  };
  var commandJSON = JSON.stringify(commandObject);

  let data = await this.executeSocketCommand(commandJSON);

  let result;
  try {
    result = JSON.parse(data);
  } catch (e) {
    throw new Error("Bad response from getAttribute");
  }

  // get status returned
  if (result.status == youiEngineDriverReturnValues.WEBDRIVER_STALE_ELEMENT)
    throw new errors.StaleElementReferenceError();

  return result.value;
};

commands.setValue = async function (value, el) {
  el = unwrapEl(el);

  if (value instanceof Array) {
    value = value.join("");
  }
  if(typeof value !== 'string') {
    value = `${value}`;
  }
  value = util.escapeSpecialChars(value, "'");
  // de-escape \n so it can be used specially
  value = value.replace(/\\\\n/g, "\\n");

  var commandObject = {
    name: 'sendkeys',
    args: [`${el}`, `${value}`]
  };
  var commandJSON = JSON.stringify(commandObject);

  let data = await this.executeSocketCommand(commandJSON);

  let result;
  try {
    result = JSON.parse(data);
  } catch (e) {
    throw new Error("Bad response from setValue");
  }

  // get status returned
  if (result.status == youiEngineDriverReturnValues.WEBDRIVER_STALE_ELEMENT)
    throw new errors.StaleElementReferenceError();

  return result.value;

};

commands.getText = async function (el) {
  el = unwrapEl(el);

  var commandObject = {
    name: 'getText',
    args: [`${el}`]
  };
  var commandJSON = JSON.stringify(commandObject);

  let data = await this.executeSocketCommand(commandJSON);

  let result;
  try {
    result = JSON.parse(data);
  } catch (e) {
    throw new Error("Bad response from getText");
  }

  // get status returned
  if (result.status == youiEngineDriverReturnValues.WEBDRIVER_STALE_ELEMENT)
    throw new errors.StaleElementReferenceError();

  return result.value;

};

export default commands;
