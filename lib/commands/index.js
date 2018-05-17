import contextCommands from './context';
import settingsCmds from './settings';
import timeoutCmds from './timeout';
import findCmds from './find';
import generalCmds from './general';
import screenShotCmds from './screenshot';
import elementCmds from './element';
import gestureCmds from './gesture';
import navigationCmds from './navigation';

let commands = {};
Object.assign(
  commands,
  contextCommands,
  settingsCmds,
  timeoutCmds,
  findCmds,
  generalCmds,
  screenShotCmds,
  elementCmds,
  gestureCmds,
  navigationCmds
  // add other command types here
);

export default commands;
