import { youiEngineKeycode } from '../utils';
import log from '../logger';


let extensions = {};

extensions.mobilePressButton = async function mobilePressButton (opts = {}) {
  const {name} = opts;
  if (!name) {
    log.errorAndThrow('Button Name is mandatory');
  }
  let code = youiEngineKeycode.indexOf(name);
  if (code === -1) {
    log.errorAndThrow('Unknown Button Name, see documentation for supported Button Names');
  }

  let commandObject = {
    name: `PressKey`,
    args: [`${code}`]
  };
  let commandJSON = JSON.stringify(commandObject);

  let data = await this.executeSocketCommand(commandJSON);

  let result;
  try {
    result = JSON.parse(data);
  } catch (e) {
    throw new Error('Bad response from PressButton');
  }

  return result.value;
};

Object.assign(extensions);
export default extensions;

