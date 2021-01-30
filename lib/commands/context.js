import { errors } from 'appium-base-driver';

let commands = {};

const YOUI_APP = 'YOUI_APP';
const NATIVE_APP = 'NATIVE_APP';

/* -------------------------------
 * Actual MJSONWP command handlers
 * ------------------------------- */
commands.getCurrentContext = async function () { // eslint-disable-line require-await
  return YOUI_APP;
};

commands.getContexts = async function () { // eslint-disable-line require-await
  this.contexts = [YOUI_APP, NATIVE_APP];
  return this.contexts;
};

commands.setContext = function (context) {
  if (!this.proxydriver) {
    throw new errors.NotImplementedError();
  }

  switch (context) {
    case YOUI_APP:
      this.proxyAll = false;
      break;
    case NATIVE_APP:
      this.proxyAll = true;
      break;
    default:
      throw new errors.NoSuchContextError();
  }
};

export default commands;
