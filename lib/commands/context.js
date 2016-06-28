let commands = {};

const NATIVE_WIN = 'NATIVE_APP';

/* -------------------------------
 * Actual MJSONWP command handlers
 * ------------------------------- */
commands.getCurrentContext = async function () {
  return NATIVE_WIN;
};

commands.getContexts = async function () {

  this.contexts = [NATIVE_WIN];
  return this.contexts;
};

export default commands;
