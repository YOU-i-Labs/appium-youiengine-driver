

const desiredCapConstraints = {
  platformName: {
    presence: true,
    isString: true,
    inclusion: ['YouiEngine']
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
