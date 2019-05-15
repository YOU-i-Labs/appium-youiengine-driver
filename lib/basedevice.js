import logger from './logger';

class BaseDevice {

  constructor () {
  }

  closeApp () {
    let msg = `closeApp is not supported on this platform`;
    logger.errorAndThrow(msg);
  };

  endSession () {
    let msg = `endSession is not supported on this platform`;
    logger.errorAndThrow(msg);
  }

  installApp (appPath) {
    let msg = `installApp is not supported on this platform`;
    logger.errorAndThrow(msg);
  };

  isAppInstalled (channelId) {
    let msg = `isAppInstalled is not supported on this platform`;
    logger.errorAndThrow(msg);
  };

  launchApp () {
    let msg = `launchApp is not supported on this platform`;
    logger.errorAndThrow(msg);
  };

  removeApp (channelId) {
    let msg = `removeApp is not supported on this platform`;
    logger.errorAndThrow(msg);
  };

  startSession (caps) {
    let msg = `startSession is not supported on this platform`;
    logger.errorAndThrow(msg);
  }

}
export default BaseDevice;
