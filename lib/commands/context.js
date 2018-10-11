let commands = {};

const NATIVE_WIN = 'NATIVE_APP';

/* -------------------------------
 * Actual MJSONWP command handlers
 * ------------------------------- */
commands.getCurrentContext = async function () { // eslint-disable-line require-await
  return NATIVE_WIN;
};

commands.getContexts = async function () { // eslint-disable-line require-await
  this.contexts = [NATIVE_WIN];
  return this.contexts;
};

export default commands;
