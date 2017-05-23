import { youiEngineDriverReturnValues } from '../utils';

let commands = {};

commands.getPageSource = async function () {

  let source;

  var commandObject = {
    name: 'GetSRC'
  };
  var commandJSON = JSON.stringify(commandObject);

  source = await this.executeSocketCommand(commandJSON);

  if (source) {
    return source.toString();
  } else {
    // this should never happen but we've received bug reports; this will help us track down
    // what's wrong in getTreeForXML
    throw new Error("Bad response from getTreeForXML");
  }
};

commands.getWindowSize = async function () {

  var commandObject = {
    name: `getWindowSize`
  };
  var commandJSON = JSON.stringify(commandObject);

  let data = await this.executeSocketCommand(commandJSON);

  let result;
  try {
    result = JSON.parse(data);
  } catch (e) {
    throw new Error("Bad response from window_size");
  }

  // get status returned and handle errors returned from server
  if (result.status === youiEngineDriverReturnValues.WEBDRIVER_NO_SUCH_WINDOW) {
    throw new Error("Could not find the requested surface");
  } else if (result.status === youiEngineDriverReturnValues.WEBDRIVER_UNKNOWN_COMMAND) {
    throw new Error("The requested command is not supported in the version of You.i Engine currently running.");
  }
  
  return result.value;
};

export default commands;
