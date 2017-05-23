Appium You.i Engine Driver
===================
Appium You.i Engine Driver is a test automation tool for devices of various platforms (iOS, Android) running applications built with [You.i Engine](http://www.youi.tv/youi-engine/). Appium You.i Driver automates You.i Engine applications, tested on simulators and real devices. Appium You.i Driver is part of the [Appium](https://github.com/appium/appium) mobile test automation tool.

## iOS Support
Appium You.i Engine Driver supports iOS versions 8+

## Android Support
Appium You.i Engine Driver supports Android versions 4.1+ (API level 16+)

## Installation
```
npm install appium-youiengine-driver
```

## Usage
Import You.i Engine Driver, set [desired capabilities](http://appium.io/slate/en/1.5/?javascript#appium-server-capabilities) and create a session:

```
import { YouiEngineDriver } from `appium-youiengine-driver`

let defaultCaps = {
  app: 'path/to/your.app',
  automationName: 'YouiEngine',
  platformName: 'iOS'
  deviceName: 'iPhone 6'
  youiEngineAppAddress: 'localhost'
};

let driver = new YouiEngineDriver();
await driver.createSession(defaultCaps);
```
Run commands:
```
console.log(await driver.getPageSource());

```
## Desired Capabilities
|Capability|Description|Values|
|----------|-----------|------|
|`youiEngineAppAddress`|The IP address of the device on which the app is running. localhost for simulator. Device’s IP address for a real device`|`localhost`, ` <device’s IP address>`|

## Commands
|          Command           |
|----------------------------|
| `clearNewCommandTimeout`          |
| `clear`          |
| `click`                           |
| `findElOrEls`                     |
| `getAttribute`                    |
| `getContexts`                     |
| `getCurrentContext`               |
| `getPageSource`                   |
| `getScreenshot`                   |
| `getSettings`                     |
| `getText`                         |
| `getWindowSize`                   |
| `implicitWait`                    |
| `implicitWaitForCondition`        |
| `isSelected`                      |
| `isEnabled`                       |
| `isDisplayed`                     |
| `removeApp`                       |
| `setValue`                        |
| `startNewCommandTimeout`          |
| `timeouts`                        |
| `updateSettings`                  |

| Proxied Command (iOS, Android) |
|----------------------------|
| `background`                      |
| `closeApp`                        |
| `getLog`                          |
| `getLogTypes`                     |
| `getOrientation`                  |
| `getStrings`                      |
| `isAppInstalled`                  |
| `launchApp`                       |
| `lock`<sup>1</sup>                |
| `setOrientation`                  |

| Proxied Command (iOS only) |
|----------------------------|
| `mobileShake`                     |

| Proxied Command (Android only)    |
|----------------------------|
| `getNetworkConnection`<sup>2</sup>|
| `isAppInstalled`                  |
| `isLocked`                        |
| `longPressKeyCode`                |
| `pressKeyCode`                    |
| `setNetworkConnection`<sup>2</sup>|
| `toggleLocationServices`          |
| `unlock`                          |

## API Notes
<sup>1</sup> `lock` behaves differently in Android than it does in iOS. In Android it does not take any arguments, and locks the screen and returns immediately.

<sup>2</sup> `toggleWiFi`, `toggleData`, `toggleFlightMode` can be achieved via `getNetworkConnection` and `setNetworkConnection`.

## FindBy strategies
| Supported FindBy strategies    |
|----------------------------|
| `name`                         |
| `id`                           |
| `class name`                   |
