import _ from 'lodash';
import { errors, PROTOCOLS } from 'appium-base-driver';
import logger from '../logger';

let extensions = {};

extensions.execute = async function execute (script, args) {
  if (script.match(/^mobile:/)) {
    logger.info(`Executing native command '${script}'`);
    script = script.replace(/^mobile:/, '').trim();
    return await this.executeMobile(script, _.isArray(args) ? args[0] : args);
  }
  if (!this.isWebContext()) {
    throw new errors.NotImplementedError();
  }
  const endpoint = this.chromedriver.jwproxy.downstreamProtocol === PROTOCOLS.MJSONWP
    ? '/execute'
    : '/execute/sync';
  return await this.chromedriver.jwproxy.command(endpoint, 'POST', {
    script,
    args,
  });
};

extensions.executeMobile = async function executeMobile (mobileCommand, opts = {}) {
  const mobileCommandsMapping = {
    pressButton: 'mobilePressButton',
    shell: 'mobileShell',
  };

  if (!_.has(mobileCommandsMapping, mobileCommand)) {
    throw new errors.UnknownCommandError(`Unknown mobile command "${mobileCommand}". ` +
      `Only ${_.keys(mobileCommandsMapping)} commands are supported.`);
  }

  const command = mobileCommandsMapping[mobileCommand];

  if (this[command]) {
    return await this[command](opts);
  }

  if (this.proxydriver && this.proxydriver[command]) {
    return await this.proxydriver[command](opts);
  }

  throw new errors.UnknownCommandError(`Unknown mobile command "${mobileCommand}"`);
};

export default extensions;
