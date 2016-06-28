let commands = {};

commands.getScreenshot = async function () {

  var commandObject = {
    name: 'GetScreenShot'
  };
  var commandJSON = JSON.stringify(commandObject);

  let data = await this.executeSocketCommand(commandJSON);

  if (data) {

    return new Buffer(data).toString('base64');
  } else {
    // this should never happen but we've received bug reports; this will help us track down
    // what's wrong in getTreeForXML
    throw new Error("Bad response from GetScreenShot");
  }
};

export default commands;
