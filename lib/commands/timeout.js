import log from '../logger';
import B from 'bluebird';
import { util } from 'appium-support';


let commands = {}, helpers = {}, extensions = {};

commands.implicitWait = function (ms) {
  this.implicitWaitMs = parseInt(ms, 10);
  log.debug(`Set implicit wait to ${ms}ms`);
};

commands.timeouts = async function (name, duration) {
  if (name === 'command') {
    this.newCommandTimeoutMs = duration;
  }
};

helpers.clearNewCommandTimeout = function () {
  if (this.noCommandTimer) {
    this.noCommandTimer.cancel();
    this.noCommandTimer = null;
  }
};

helpers.startNewCommandTimeout = function (cmd) {
  // make sure there are no rogue timeouts
  this.clearNewCommandTimeout();

  // if command timeout is 0, it is disabled
  if (!this.newCommandTimeoutMs) return;

  this.noCommandTimer = util.cancellableDelay(this.newCommandTimeoutMs);
  this.noCommandTimer
    .then(async () => {
      log.warn(`Shutting down because we waited ` +
               `${this.newCommandTimeoutMs / 1000} seconds for a command`);
      await this.startUnexpectedShutdown(new Error(`Command ${cmd} timed out!`));
    })
    .catch(B.CancellationError, (/*err*/) => {
      // ignore
    });
};

Object.assign(extensions, commands, helpers);
export { commands, helpers };
export default extensions;
