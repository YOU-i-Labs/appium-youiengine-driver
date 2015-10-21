import settingsCmds from './settings';
import timeoutCmds from './timeout';
import findCmds from './find';
import contextCommands from './context';
import generalCmds from './general';

let commands = {};
Object.assign(
  commands,
  settingsCmds,
  timeoutCmds,
  contextCommands,
  findCmds,
  generalCmds
  // add other command types here
);

export default commands;
