

const desiredCapConstraints = {
  platformName: {
    presence: true,
    isString: true,
    inclusion: ['youi']
  },
  app: {
    isString: true
  },
  youiAppAddress: {
    isString: true
  },
  youiAppPlatform: {
    isString: true
  }
};

export default desiredCapConstraints;
