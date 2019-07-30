import contextCommands from './context';
import settingsCmds from './settings';
import timeoutCmds from './timeout';
import findCmds from './find';
import generalCmds from './general';
import screenShotCmds from './screenshot';
import elementCmds from './element';
import gestureCmds from './gesture';
import navigationCmds from './navigation';
import executeCmds from './execute';
import mobileCmds from './mobile';

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
  navigationCmds,
  executeCmds,
  mobileCmds,
  // add other command types here
);

export default commands;
