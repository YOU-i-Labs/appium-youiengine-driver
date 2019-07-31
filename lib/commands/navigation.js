import webdriver from 'selenium-webdriver';


const Key = webdriver.Key;

let commands = {};

commands.back = async function () {
  let commandObject = {
    name: 'sendkeys',
    args: [Key.ESCAPE]
  };
  let commandJSON = JSON.stringify(commandObject);

  let data = await this.executeSocketCommand(commandJSON);

  try {
    JSON.parse(data);
  } catch (e) {
    throw new Error('Bad response from sendkeys');
  }
};


export default commands;
