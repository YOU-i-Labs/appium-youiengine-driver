const desiredCapConstraints = {
  platformName: {
    presence: true,
    isString: true,
    inclusionCaseInsensitive: [
      'iOS',
      'Android',
      'Mac',
      'YIMac',
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
