import { errors } from 'appium-base-driver';
import _ from 'lodash';
import log from '../logger';


var webdriver = require('selenium-webdriver'),
	Key = webdriver.Key;

let commands = {}

commands.back = async function () {
  var commandObject = {
    name: 'sendkeys',
    args: [Key.ESCAPE]
  };
  var commandJSON = JSON.stringify(commandObject);

  let data = await this.executeSocketCommand(commandJSON);

  let result;
  try {
    result = JSON.parse(data);
  } catch (e) {
    throw new Error("Bad response from sendkeys");
  }
}
export default commands;
