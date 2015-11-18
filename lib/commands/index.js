import settingsCmds from './settings';
import timeoutCmds from './timeout';
import findCmds from './find';
import contextCommands from './context';
import generalCmds from './general';
import screenShot from './screenshot';
import element from './element';
import gesture from './gesture';


let commands = {};
Object.assign(
  commands,
  settingsCmds,
  timeoutCmds,
  contextCommands,
  findCmds,
  generalCmds,
  screenShot,
  element,
  gesture
  // add other command types here
);

export default commands;
