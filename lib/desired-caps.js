

const desiredCapConstraints = {
  platformName: {
    presence: true,
    isString: true,
    inclusionCaseInsensitive: ['YouiEngine']
  },
  app: {
    isString: true
  },
  youiEngineAppAddress: {
    isString: true
  },
  youiEngineAppPlatform: {
    isString: true
  },
  avd: {
    isString: true
  },
  udid: {
    isString: true
  }
};

export default desiredCapConstraints;
