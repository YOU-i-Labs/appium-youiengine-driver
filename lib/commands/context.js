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
  if (this.proxydriver) {
    return [YOUI_APP, NATIVE_APP];
  } else {
    return [YOUI_APP];
  }
};

commands.setContext = function (context) {
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
