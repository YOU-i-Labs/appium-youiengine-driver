import logger from './logger';

class BaseDevice {

  constructor () {
  }

  closeApp () {
    logger.errorAndThrow(`closeApp is not supported on this platform`);
  }

  endSession () {
    logger.errorAndThrow(`endSession is not supported on this platform`);
  }

  installApp (appPath) { // eslint-disable-line no-unused-vars
    logger.errorAndThrow(`installApp is not supported on this platform`);
  }

  isAppInstalled (channelId) { // eslint-disable-line no-unused-vars
    logger.errorAndThrow(`isAppInstalled is not supported on this platform`);
  }

  launchApp () {
    logger.errorAndThrow(`launchApp is not supported on this platform`);
  }

  removeApp (channelId) { // eslint-disable-line no-unused-vars
    logger.errorAndThrow(`removeApp is not supported on this platform`);
  }

  startSession (caps) { // eslint-disable-line no-unused-vars
    logger.errorAndThrow(`startSession is not supported on this platform`);
  }

}
export default BaseDevice;
