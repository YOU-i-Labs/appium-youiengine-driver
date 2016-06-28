import { errors } from 'appium-base-driver';
import { youiEngineDriverReturnValues } from '../utils';

let commands = {};

commands.findElOrEls = async function (strategy, selector, mult, context) {

  let createGetElementCommand = function (strategy, selector, mult, context) {

    if (typeof context === "undefined" || !context) {
      context = '';
    }

    let ext = mult ? 's' : '';
    var commandObject = {
      args: [`${selector}`, `${context}`]
    };

    switch (strategy) {
      case "name":
        commandObject.name = `getElement${ext}ByName`;
        break;
      case "accessibility id":
        commandObject.name = `getElement${ext}ByAccessibilityId`;
        break;
      case "id":
        commandObject.name = `getElement${ext}ById`;
        break;
      default:
        commandObject.name = `getElement${ext}ByType`;
        break;
    }

    return JSON.stringify(commandObject);
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
  if (result.status === youiEngineDriverReturnValues.WEBDRIVER_NO_SUCH_ELEMENT)
    throw new errors.NoSuchElementError();


  return result.value;

};
export default commands;
