import logger from '../logger';
import { errors } from 'mobile-json-wire-protocol';

let commands = {};

commands.findElOrEls = async function (strategy, selector, mult, context) {

  let createGetElementCommand = function (strategy, selector, mult, context) {
    let ext = mult ? 's' : '';
    let command = "";

    switch (strategy) {
      case "name":
        command = `getElement${ext}ByName ${selector}`;
        break;
      case "accessibility id":
        command = `getElement${ext}ByAccessibilityId ${selector}`;
        break;
      case "id":
        command = `getElement${ext}ById ${selector}`;
        break;
      default:
        command = `getElement${ext}ByType ${selector}`;
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
  if (result.status != 0)
    throw new errors.NoSuchElementError();


  return result.value;

};
export default commands;