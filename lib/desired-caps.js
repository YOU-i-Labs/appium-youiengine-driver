const desiredCapConstraints = {
  platformName: {
    presence: true,
    isString: true,
    inclusionCaseInsensitive: [
      'iOS',
      'Android',
      'Mac',
      'YIMac',
      'BlueSky',
      'YItvOS',
      'NoProxy', // 'NoProxy' is being deprecated and replaced with 'ConnectToApp'
      'ConnectToApp',
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
