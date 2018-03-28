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

## Desired Capabilities

Desired capabilities (caps) are a set of keys and values (i.e., a map or hash) sent to the Appium server to tell the server what kind of automation session we’re interested in starting up. These caps are defined in the appium.txt file. There are various capabilities which can modify the behavior of the server during automation.

|Capability|Description|Values|
|----------|-----------|------|
|`youiEngineAppAddress`|The IP address of the device on which the app is running. localhost for simulator. Device’s IP address for a real device`|`localhost`, ` <device’s IP address>`|

### Minimum required capabilities per platform

Below is a sample of the minimum required caps per platform.

#### iOS

| Capability           | Simulator                     | Real device             |
|----------------------|-------------------------------|-------------------------|
| app                  | `<path to the app>`           | `<path to the app>`     |
| automationName       | YouiEngine                    | YouiEngine              |
| deviceName           | `<iOS Simulator device name>` | `<device’s name>`       |
| platformName         | iOS                           | iOS                     |
| platformVersion      | `<iOS version>`               | `<iOS version>`         |
| udid                 | Not applicable                | `<device’s udid>`       |
| xcodeOrgId           | `<Team ID>`                   | `<Team ID>`             |
| youiEngineAppAddress | localhost                     | `<device’s IP address>` |


#### Android

| Capability           | Simulator                   | Real device             |
|----------------------|-----------------------------|-------------------------|
| app                  | Not Applicable	 			 | `<path to the app>`     |
| automationName       | Not Applicable	 			 | YouiEngine              |
| deviceName           | Not Applicable	 			 | `<device’s ID>`         |
| platformName         | Not Applicable	 			 | iOS                     |
| youiEngineAppAddress | Not Applicable	 			 | `<device’s IP address>` |

#### MacOS

| Capability           | Simulator                   | Real device             |
|----------------------|-----------------------------|-------------------------|
| app                  | Not Applicable	 			 | `<path to the app>`     |
| automationName       | Not Applicable	 			 | YouiEngine              |
| deviceName           | Not Applicable	 			 | `<cannot be left blank>`         |
| platformName         | Not Applicable	 			 | Mac                     |
| youiEngineAppAddress | Not Applicable	 			 | `localhost` |

#### You.i MacOS (does not use appium-mac-driver)

| Capability           | Simulator                   | Real device             |
|----------------------|-----------------------------|-------------------------|
| app                  | Not Applicable	 			 | `<path to the app>`     |
| automationName       | Not Applicable	 			 | YouiEngine              |
| deviceName           | Not Applicable	 			 | `<cannot be blank>`         |
| platformName         | Not Applicable	 			 | YIMac                     |
| youiEngineAppAddress | Not Applicable	 			 | `localhost` |

Notes:
* For iOS 8+, set the following on your device: Settings -> Developer -> Set UI Automation -> true
* xcodeOrgId
* Android device name: found using `adb devices`

## Commands

List of supported commands could be found in the [docs](./docs/SupportedCommands) section

## FindBy strategies
FindBy strategies could be found in the [docs](./docs/README.md) section
