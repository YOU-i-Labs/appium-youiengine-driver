const desiredCapConstraints = {
  platformName: {
    presence: true,
    isString: true,
    inclusionCaseInsensitive: [
      'iOS',
      'Android',
      'NoProxy',
    ]
  },
  automationName: {
    presence: true,
    isString: true,
    inclusionCaseInsensitive: [
      'YouiEngine',
    ]
  },
  app: {
    isString: true
  },
  youiEngineAppAddress: {
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
