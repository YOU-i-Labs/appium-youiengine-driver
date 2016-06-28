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

export default commands;
