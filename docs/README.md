## Supported Platforms
iOS and Android You.i Engine Applications can be automated using Appium. Support for other platforms is planned for future releases.

### Xcode Selection
Automation for iOS 10 is supported with Xcode 8+
Automation for iOS 9 or lower is supported with Xcode 7.3.1

The reasoning behind the variation in version is due to the change in the underlying automation layer on iOS. As of iOS 10, Apple changed its underlying automation in Instruments from UIAutomation to XCUITest. The [XCUITest](https://github.com/appium/appium-xcuitest-driver) appium driver is used to drive the automation layer on iOS.

## Supported Client Application Languages
Java and Ruby based test client scripts and applications can used to automate tests on You.i Engine Applications. Support for other languages is planned for future releases.


## FindBy strategies
| Supported FindBy strategies    |
|--------------------------------|
| `name`                         |
| `id`                           |
| `class name`                   |



## Supported Commands

List list of supported [commands](SupportedCommands/Commands.md) could be found here.

Note that [Java Client](JavaClient.md) is also supported, however work in progress.