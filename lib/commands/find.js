import { errors } from 'appium-base-driver';

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

  let result;
  let doFind = async () => {
    let findByAxIdCmd = createGetElementCommand(strategy, selector, mult, context);

    let res = await this.executeSocketCommand(findByAxIdCmd);

    try {
      result = JSON.parse(res);
    } catch (e) {
      // parse error
      throw new Error("Bad response from findElOrEls");
    }
     
    // looks like we have to check the status or resulting value to see that it's not empty.
    if (result.value === "") {
      return false;
    }
    return true;
  };

  try {
    await this.implicitWaitForCondition(doFind);
  } catch (err) {
    if (err.message && err.message.match(/Condition unmet/)){
      // condition was not met, throw NoSuchElementError
      throw new errors.NoSuchElementError();
    } else {
      // some other issue occurred, report it
      throw err;
    }
  }
  return result.value;
};

export default commands;
