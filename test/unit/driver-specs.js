import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import YouiEngineDriver from '../..';

let driver;
let sandbox = sinon.createSandbox();
let expect = chai.expect;
chai.should();
chai.use(chaiAsPromised);

describe('driver', function () {
  describe('constructor', function () {
    it('should call BaseDriver constructor with opts', function () {
      let driver = new YouiEngineDriver({foo: 'bar'});
      driver.should.exist;
      driver.opts.foo.should.equal('bar');
    });
    it('should have this.findElOrEls', function () {
      let driver = new YouiEngineDriver({foo: 'bar'});
      driver.findElOrEls.should.exist;
      driver.findElOrEls.should.be.a('function');
    });
  });
  describe('createSession', function () {
    beforeEach(function () {
      driver = new YouiEngineDriver();
      sandbox.stub(driver, 'connectSocket');
    });
    afterEach(function () {
      sandbox.restore();
    });
    it('should start an Android session if platformName is Android', async function () {
      sandbox.stub(driver, 'setupNewAndroidDriver');
      await driver.createSession({automationName: 'YouiEngine', youiEngineAppAddress: '192.168.2.45', platformName: 'Android', deviceName: 'device', app: 'some.app.package'});
      driver.setupNewAndroidDriver.calledOnce.should.be.true;
    });
    it('should start an iOS session if platformName is iOS', async function () {
      sandbox.stub(driver, 'setupNewIOSDriver');
      await driver.createSession({automationName: 'YouiEngine', youiEngineAppAddress: '192.168.2.45', platformName: 'iOS', deviceName: 'device', app: 'some.app.package'});
      driver.setupNewIOSDriver.calledOnce.should.be.true;
    });
    it('should delete a session on failure', async function () {
      // Force an error to make sure deleteSession gets called
      sandbox.stub(driver, 'startIOSSession').throws();
      sandbox.stub(driver, 'deleteSession');
      try {
        await driver.createSession({automationName: 'YouiEngine', youiEngineAppAddress: '192.168.2.45', platformName: 'iOS', deviceName: 'device', app: 'some.app.package'});
      } catch (ign) {}
      driver.deleteSession.calledOnce.should.be.true;
    });
  });
  describe('validateDesiredCaps', function () {
    before(function () {
      driver = new YouiEngineDriver();
    });
    // List of scenarios to test:
    // 1) iOS simulator
    // 2) iOS real device
    // 3) Android emulator
    // 4) Android real device
    // 5) iOS simulator without proxy
    // 6) iOS real device without proxy
    // 7) Android emulator without proxy
    // 8) Android real device without proxy

    // Applies to all scenarios
    it('should throw an error if caps do not contain automationName', function () {
      expect(() => {
        driver.validateDesiredCaps({ platformName: 'Android', deviceName: 'device'});
      }).to.throw(/can't be blank/);
    });
    it('should throw an error if caps do not contain platformName', function () {
      expect(() => {
        driver.validateDesiredCaps({ automationName: 'YouiEngine', deviceName: 'device'});
      }).to.throw(/can't be blank/);
    });
    it('should throw an error if caps do not contain deviceName', function () {
      expect(() => {
        driver.validateDesiredCaps({automationName: 'YouiEngine', platformName: 'Android'});
      }).to.throw(/can't be blank/);
    });
    it('should not be sensitive to platform name casing', function () {
      expect(() => {
        driver.validateDesiredCaps({automationName: 'YouiEngine', youiEngineAppAddress: 'localhost', platformName: 'AnDrOiD', deviceName: 'device', app: '/path/to/some.apk'});
      }).to.not.throw(Error);
    });
    it('should not be sensitive to automationName name casing', function () {
      expect(() => {
        driver.validateDesiredCaps({automationName: 'youIengIne', youiEngineAppAddress: 'localhost', platformName: 'Android', deviceName: 'device', app: '/path/to/some.apk'});
      }).to.not.throw(Error);
    });

    // Applies to all scenarios with proxy
    it('should throw an error if caps contain "platformName != NoProxy" and do not contain youiEngineAppAddress', function () {
      expect(function () {
        driver.validateDesiredCaps({automationName: 'YouiEngine', platformName: 'Android', deviceName: 'mydevice' });
      }).to.throw(/must include/);
    });
    it('should throw an error if caps contain "platformName != NoProxy" and do not contain app', function () {
      expect(() => {
        driver.validateDesiredCaps({automationName: 'YouiEngine', platformName: 'Android', deviceName: 'mydevice' });
      }).to.throw(/must include/);
    });

    // Applies to all scenarios with no proxy
    it('should not throw an error if caps contain "platformName == NoProxy" and do not contain youiEngineAppAddress', function () {
      expect(() => {
        driver.validateDesiredCaps({automationName: 'YouiEngine', platformName: 'NoProxy', deviceName: 'mydevice' });
      }).to.not.throw(Error);
    });

    // 1) iOS simulator
    it('should not throw an error for minimum caps of iOS simulator', function () {
      expect(() => {
        driver.validateDesiredCaps({automationName: 'YouiEngine', platformName: 'iOS', deviceName: 'iOS Simulator', youiEngineAppAddress: 'localhost', app: '/path/to/some.app' });
      }).to.not.throw(Error);
    });

    // 2) iOS real device
    it('should not throw an error for minimum caps of iOS real device', function () {
      expect(() => {
        driver.validateDesiredCaps({automationName: 'YouiEngine', platformName: 'iOS', deviceName: 'my device', youiEngineAppAddress: '192.168.1.72', app: '/path/to/some.app', udid: '09a24b51470b059f545d7a2fc996091e06675a61' });
      }).to.not.throw(Error);
    });

    // 3) Android emulator
    it('should throw an error if caps contain "deviceName == Android" and do not contain avd', function () {
      expect(() => {
        driver.validateDesiredCaps({automationName: 'YouiEngine', platformName: 'NoProxy', deviceName: 'Android' });
      }).to.not.throw(/must include/);
    });
    /*it('should not throw an error for minimum caps of Android emulator', () => {
      expect(() => {
        driver.validateDesiredCaps({automationName: 'YouiEngine', platformName: 'Android', deviceName: 'Android', youiEngineAppAddress: 'localhost', app: '/path/to/some.app', avd: 'Nexus' });
      }).to.not.throw(Error);
    });*/

    // 4) Android real device
    it('should not throw an error for minimum caps of Android real device', function () {
      expect(() => {
        driver.validateDesiredCaps({automationName: 'YouiEngine', platformName: 'Android', deviceName: '83B7N14B02224534', youiEngineAppAddress: '192.168.1.72', app: '/path/to/some.app', avd: 'Nexus' });
      }).to.not.throw(Error);
    });

    // 5) iOS simulator without proxy
    it('should not throw an error for minimum caps of iOS simulator without proxy', function () {
      expect(() => {
        driver.validateDesiredCaps({automationName: 'YouiEngine', platformName: 'NoProxy', deviceName: 'localhost' });
      }).to.not.throw(Error);
    });

    // 6) iOS real device without proxy
    it('should not throw an error for minimum caps of iOS real device without proxy', function () {
      expect(() => {
        driver.validateDesiredCaps({automationName: 'YouiEngine', platformName: 'NoProxy', deviceName: 'my device', youiEngineAppAddress: '192.168.1.72' });
      }).to.not.throw(Error);
    });

    // 7) Android emulator without proxy
    // TBD

    // 8) Android real device without proxy
    it('should not throw an error for minimum caps of Android real device without proxy', function () {
      expect(() => {
        driver.validateDesiredCaps({automationName: 'YouiEngine', platformName: 'NoProxy', deviceName: '83B7N14B02224534', youiEngineAppAddress: '192.168.1.72'});
      }).to.not.throw(Error);
    });
  });
});
