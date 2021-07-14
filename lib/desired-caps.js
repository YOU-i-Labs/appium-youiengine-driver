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
      'YILinux',
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
  deviceName: {
    presence: true,
    isString: true,
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
  },
  maxRetryCount: {
    isNumber: true
  }
};

export default desiredCapConstraints;
