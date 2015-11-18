import { errors } from 'mobile-json-wire-protocol';
import { unwrapEl } from '../utils';
import { youiDriverReturnValues } from '../utils';

let commands = {};

commands.click = async function (el) {
  el = unwrapEl(el);

  let command = `click ${el}`;

  let data = await this.executeSocketCommand(command);

  let result;
  try {
    result = JSON.parse(data);
  } catch (e) {
    throw new Error("Bad response from click");
  }

  // get status returned
  if (result.status == youiDriverReturnValues.WEBDRIVER_STALE_ELEMENT)
    throw new errors.StaleElementReferenceError();


  return result.value;

};
export default commands;

