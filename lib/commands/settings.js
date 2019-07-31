import { errors } from 'appium-base-driver';
import log from '../logger';
import { youiEngineDriverReturnValues } from '../utils';

let commands = {};

commands.updateSettings = async function (newSettings) {
  if (!this.settings) {
    log.errorAndThrow('Cannot update settings; settings object not found');
  }
  return await this.settings.update(newSettings);
};

commands.getSettings = async function () { // eslint-disable-line require-await
  if (!this.settings) {
    log.errorAndThrow('Cannot get settings; settings object not found');
  }
  return this.settings.getSettings();
};

// Amplifies time on the device by a factor
// examples:
// 2 = twice the speed
// 1 = normal speed
// 0.5 = half the speed
commands.setTimeDilation = async function (factor) {
  let commandObject = {
    name: `setTimeDilation`,
    args: [`${factor}`]
  };
  let commandJSON = JSON.stringify(commandObject);
  let data = await this.executeSocketCommand(commandJSON);

  let result;
  try {
    result = JSON.parse(data);
  } catch (e) {
    throw new Error('Bad response from setValue');
  }

  if (result.status === youiEngineDriverReturnValues.WEBDRIVER_UNKNOWN_COMMAND) {
    throw new errors.UnknownCommandError('argument must be numeric and larger than zero');
  }

  return result.value;
};


// Sets the attribute type/value to filter the source tree
// format:
// SourceTreeFilter: "[@attributeType='attributeValue']"
commands.setSourceTreeFilter = async function (filter) {
  let commandObject = {
    name: `setSourceTreeFilter`,
    args: [`${filter}`]
  };
  let commandJSON = JSON.stringify(commandObject);
  let data = await this.executeSocketCommand(commandJSON);

  let result;
  try {
    result = JSON.parse(data);
  } catch (e) {
    throw new Error('Bad response from setValue');
  }

  if (result.status === youiEngineDriverReturnValues.WEBDRIVER_UNKNOWN_COMMAND) {
    throw new errors.UnknownCommandError('argument must be numeric and larger than zero');
  }
  if (result.status === youiEngineDriverReturnValues.WEBDRIVER_INVALID_SELECTOR) {
    throw new errors.InvalidSelectorError("Attribute filter should have following format: [@attributeType='attributeValue'] or '' to reset. ('' is supported in You.i Engine 5.3+)");
  }
  return result.value;
};


export default commands;
