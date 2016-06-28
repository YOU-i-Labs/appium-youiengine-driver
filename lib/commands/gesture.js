import { errors } from 'appium-base-driver';
import { unwrapEl } from '../utils';
import { youiEngineDriverReturnValues } from '../utils';

let commands = {};

commands.click = async function (el) {
  el = unwrapEl(el);

  var commandObject = {
    name: 'click',
    args: [`${el}`]
  };
  var commandJSON = JSON.stringify(commandObject);

  let data = await this.executeSocketCommand(commandJSON);

  let result;
  try {
    result = JSON.parse(data);
  } catch (e) {
    throw new Error("Bad response from click");
  }

  // get status returned
  if (result.status === youiEngineDriverReturnValues.WEBDRIVER_STALE_ELEMENT)
    throw new errors.StaleElementReferenceError();


  return result.value;

};
export default commands;
