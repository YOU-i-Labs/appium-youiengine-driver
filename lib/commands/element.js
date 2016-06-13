import logger from '../logger';
import { errors } from 'appium-base-driver';
import { unwrapEl } from '../utils';
import { youiEngineDriverReturnValues } from '../utils';
import { util } from 'appium-support';

let commands = {};

commands.getAttribute = async function (attribute, el) {
  el = unwrapEl(el);

  let command = `getAttribute ${el} ${attribute}`;

  let data = await this.executeSocketCommand(command);

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


  let command = `sendKeys ${el} ${value}`;

  let data = await this.executeSocketCommand(command);

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

  let command = `getText ${el}`;

  let data = await this.executeSocketCommand(command);

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
