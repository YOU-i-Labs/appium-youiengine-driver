import { errors } from 'mobile-json-wire-protocol';
import _ from 'lodash';
import log from '../logger';

let commands = {};

const NATIVE_WIN = 'NATIVE_APP';

/* -------------------------------
 * Actual MJSONWP command handlers
 * ------------------------------- */
commands.getCurrentContext = async function () {
  log.debug("getting context:" + NATIVE_WIN)
  return NATIVE_WIN;
};

commands.getContexts = async function () {

  this.contexts = [NATIVE_WIN];
  return this.contexts;
};

commands.setContext = async function (name) {
 // Always the same context
};


export default commands;
