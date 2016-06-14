import logger from '../logger';
import { errors } from 'appium-base-driver';
import { youiEngineDriverReturnValues } from '../utils';

let commands = {};

commands.findElOrEls = async function (strategy, selector, mult, context) {

  let createGetElementCommand = function (strategy, selector, mult, context) {

    if (typeof context === "undefined" || !context) {
      context = '';
    }

    let ext = mult ? 's' : '';
    let command = "";

    switch (strategy) {
      case "name":
        command = `getElement${ext}ByName ${selector} ${context}`;
        break;
      case "accessibility id":
        command = `getElement${ext}ByAccessibilityId ${selector} ${context}`;
        break;
      case "id":
        command = `getElement${ext}ById ${selector} ${context}`;
        break;
      default:
        command = `getElement${ext}ByType ${selector} ${context}`;
    }

    return command;
  };

  let findByAxIdCmd = createGetElementCommand(strategy, selector, mult, context);

  let data = await this.executeSocketCommand(findByAxIdCmd);

  let result;
  try {
    result = JSON.parse(data);
  } catch (e) {
      throw new Error("Bad response from findElOrEls");
  }

  // get status returned
  if (result.status == youiEngineDriverReturnValues.WEBDRIVER_NO_SUCH_ELEMENT)
    throw new errors.NoSuchElementError();


  return result.value;

};
export default commands;
