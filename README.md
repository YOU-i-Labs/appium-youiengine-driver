Appium You.i Engine Driver
===================
Appium You.i Engine Driver is a test automation tool for devices of various platforms running applications built with [You.i Engine](http://www.youi.tv/youi-engine/). Appium You.i Driver automates You.i Engine applications, tested on simulators and real devices. Appium You.i Driver is part of the [Appium](https://github.com/appium/appium) mobile test automation tool.

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
|`youiEngineAppAddress`|`The IP address of the device on which the app is running. localhost for simulator. Device’s IP address for a real device`|`localhost`, `<device’s IP address>`|
|`youiEngineAppPort`|`The socket port used by the app.`|`Default: 12345, Default for PS4: 40123`|
|`fullSourceTree`|`Sets the source tree to use all elements (not only displayed ones)` |`Default: false`|


### Minimum required capabilities per platform

Below is a sample of the minimum required caps per platform.

#### iOS

| Capability           | Simulator                     | Real device             |
|----------------------|-------------------------------|-------------------------|
| app                  | `<path to the app>`           | `<path to the app>`     |
| automationName       | `YouiEngine`                  | `YouiEngine`            |
| deviceName           | `<iOS Simulator device name>` | `<device’s name>`       |
| platformName         | `iOS`                         | `iOS`                   |
| platformVersion      | `<iOS version>`               | `<iOS version>`         |
| udid                 | `<device’s udid>`             | `<device’s udid>`       |
| xcodeOrgId           | `<Team ID>`                   | `<Team ID>`             |
| youiEngineAppAddress | `localhost`                   | `<device’s IP address>` |


#### Android

| Capability           | Real device             | Simulator            |
|----------------------|-------------------------|----------------------|
| app                  | `<path to the app>`     | `<path to the app>`  |
| automationName       | `YouiEngine`            | `YouiEngine`         |
| deviceName           | `<device’s ID>`         | `<device’s ID>`      |
| platformName         | `Android`               | `Android`            |
| youiEngineAppAddress | `<device’s IP address>` | `localhost`          |
| avd                  | `N/A`                   | `<Android Virtual Device Name>` |  

#### macOS
Support added in 5.0+

| Capability           | Real device             |
|----------------------|-------------------------|
| app                  | `<path to the app>`     |
| automationName       | `YouiEngine`            |
| deviceName           | `<cannot be left blank>`|
| platformName         | `Mac`                   |
| youiEngineAppAddress | `localhost` |

#### You.i macOS (does not use appium-mac-driver) 
Support added in 5.0+

| Capability           | Real device             |
|----------------------|-------------------------|
| app                  | `<path to the app>`     |
| automationName       | `YouiEngine`            |
| deviceName           | `<cannot be blank>`     |
| platformName         | `YIMac`                 |
| showXcodeLog<sup>1</sup> | `true`              |
| youiEngineAppAddress | `localhost`             |

<sup>1</sup> Optional.

#### You.i tvOS
Support added in 5.0+
<sup>\*</sup> If another app is installed with You.i's socket, it may connect to it. All You.i apps should be deleted before running Appium.

| Capability           | Real device             |
|----------------------|-------------------------|
| app                  | `<path to the app>`     |
| automationName       | `YouiEngine`            |
| deviceName           | `<cannot be blank>`     |
| platformName         | `YItvOS`                |
| udid                 | `<device’s udid>`       |
| youiEngineAppAddress | `<device’s IP address>` |


#### BlueSky
Support added in 5.0+

| Capability           | Real device             |
|----------------------|-------------------------|
| app                  | `<path to the app>`     |
| automationName       | `YouiEngine`            |
| channelId<sup>1</sup>| <App's channel ID>      |
| deviceName           | `<cannot be blank>`     |
| password             | `<dev account password>`|
| platformName         | `BlueSky`               |
| username             | `<dev account username>`|
| youiEngineAppAddress | `<device’s IP address>` |

<sup>1</sup> Optional (default is `dev`)

#### Connect to App
To connect to an already launched app.
Useful for debugging app or testing a platform which currently doesn't have install/launch/close/remove methods.

| Capability           | Real device             |
|----------------------|-------------------------|
| app<sup>1</sup>      | `<cannot be blank>`     |
| automationName       | `YouiEngine`            |
| deviceName           | `<cannot be blank>`     |
| platformName         | `ConnectToApp`          |
| youiEngineAppAddress | `<device’s IP address>` |

<sup>1</sup> Some libraries will look to validate the app path so you may need to add a valid app path even though it will not be installed.

Notes:
* For iOS 8+, set the following on your device: Settings -> Developer -> Set UI Automation -> true
* xcodeOrgId
* Android device name: found using `adb devices`

## Supported Commands

|          Command           |          Engine Version Support          |
|----------------------------|------------------------------------------|
| [Clear Element](http://appium.io/docs/en/commands/element/actions/clear/) | 4.2.5+ |
| [Click](http://appium.io/docs/en/commands/element/actions/click/) | 4.2.1+|
| [Execute Mobile Command](http://appium.io/docs/en/commands/mobile-command/)<sup>1</sup> | 5.5.0+|
| [Find Element](http://appium.io/docs/en/commands/element/find-element/)<sup>2</sup> | 	4.2.1+ |
| [Find Elements](http://appium.io/docs/en/commands/element/find-elements/)<sup>2</sup> | 4.2.1+ |
| [Get Element Attribute](http://appium.io/docs/en/commands/element/attributes/attribute/)<sup>3</sup> | 4.2.1+ |
| [Get All Contexts](http://appium.io/docs/en/commands/context/get-contexts/) | 4.2.1+ |
| [Get Current Context](http://appium.io/docs/en/commands/context/get-context/) | 4.2.1+ |
| [Get Element Location](http://appium.io/docs/en/commands/element/attributes/location/) | 4.2.5+ |
| [Get Element Size](http://appium.io/docs/en/commands/element/attributes/size/) | 4.2.5+	|
| [Get Element Text](http://appium.io/docs/en/commands/element/attributes/text/) | 4.2.7+	|
| [Get Page Source](http://appium.io/docs/en/commands/session/source/) | 4.2.1+	|
| [Get Window Size](http://appium.io/docs/en/commands/web/window/get-window-size/) | 4.4.5+ |
| [Go Back](http://appium.io/docs/en/commands/session/back/) | 5.0+	|
| [Hide Keyboard](http://appium.io/docs/en/commands/device/keys/hide-keyboard/) | 5.2.0+ |
| [Is Element Displayed](http://appium.io/docs/en/commands/element/attributes/displayed/) | 4.2.5+ |
| [Is Element Enabled](http://appium.io/docs/en/commands/element/attributes/enabled/) | 4.2.7+ |
| [Is Element Selected](http://appium.io/docs/en/commands/element/attributes/selected/) | 4.2.5+ |
| [Is Keyboard Shown](http://appium.io/docs/en/commands/device/keys/is-keyboard-shown/) | 5.2.0+ |
| [Long Tap](http://appium.io/docs/en/commands/interactions/touch/long-press/) | 4.2.7+	|
| [Move](http://appium.io/docs/en/commands/interactions/touch/move/) | 4.2.7+	|
| [Remove App](http://appium.io/docs/en/commands/device/app/remove-app/) | 4.2.1+	|
| [Retrieve Device Settings](http://appium.io/docs/en/commands/session/settings/get-settings/) | 4.2.5+ |
| [Send Keys](http://appium.io/docs/en/commands/element/actions/send-keys/)<sup>4</sup> | 4.2.1+ |
| [Settings](http://appium.io/docs/en/advanced-concepts/settings/#settings)<sup>5</sup> | 4.2.5+ |
| [Set Implicit Wait Timeout](http://appium.io/docs/en/commands/session/timeouts/implicit-wait/) | 4.2.1+ |
| [Set Timeouts](http://appium.io/docs/en/commands/session/timeouts/timeouts/) | 4.2.1+	|
| [Take Screenshot](http://appium.io/docs/en/commands/session/screenshot/) | 4.2.1+ |
| [Touch Down](http://appium.io/docs/en/commands/interactions/touch/touch-down/) | 4.2.7+ |
| [Touch Up](http://appium.io/docs/en/commands/interactions/touch/touch-up/) | 4.2.7+	|
| [Update Device Settings](http://appium.io/docs/en/commands/session/settings/update-settings/) | 4.4.5+	|


<sup>1</sup> See [Mobile commands](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies) below

<sup>2</sup> See [Selector strategies](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies) below

<sup>3</sup> See [Attributes](https://github.com/YOU-i-Labs/appium-youiengine-driver#attributes) below

<sup>4</sup> Starting with 5.0, you can send a general keypress (not targeted at an element), by using sendkeys on the root element

<sup>5</sup> See [Settings](https://github.com/YOU-i-Labs/appium-youiengine-driver#settings) below

| Proxied Command (iOS, Android)    |
|-----------------------------------|
| [Background App](http://appium.io/docs/en/commands/device/app/background-app/) |
| [Close an App](http://appium.io/docs/en/commands/device/app/close-app/) |
| [GetLogs](http://appium.io/docs/en/commands/session/logs/get-log/) |
| [Get available log types](http://appium.io/docs/en/commands/session/logs/get-log-types/)  |
| [Get Orientation](http://appium.io/docs/en/commands/session/orientation/get-orientation/) |
| [Get App Strings](http://appium.io/docs/en/commands/device/app/get-app-strings/) |
| [Is App Installed](http://appium.io/docs/en/commands/device/app/is-app-installed/) |
| [Launch App](http://appium.io/docs/en/commands/device/app/launch-app/) |
| [Lock](http://appium.io/docs/en/commands/device/interactions/lock/) |
| [Set Orientation](http://appium.io/docs/en/commands/session/orientation/set-orientation/) |

| Proxied Command (iOS only) |
|----------------------------|
| [Shake](http://appium.io/docs/en/commands/device/interactions/shake/) |

| Proxied Command (Android only)    |
|-----------------------------------|
| [Is Device Locked](http://appium.io/docs/en/commands/device/interactions/is-locked/) |
| [Long Press Key Code](http://appium.io/docs/en/commands/device/keys/long-press-keycode/) |
| [Press Key Code](http://appium.io/docs/en/commands/device/keys/press-keycode/) |
| [Toggle Location Services](http://appium.io/docs/en/commands/device/network/toggle-location-services/) |
| [Unlock](http://appium.io/docs/en/commands/device/interactions/unlock/) |

### Mobile Commands

| Command	                 |   Description                                                             |	Argument       |	Argument Example           |
|----------------------------|---------------------------------------------------------------------------|-----------------|-------------------------------|
| mobile:pressButton         |   Press a physical button. The available button options can be found [here](https://github.com/YOU-i-Labs/appium-youiengine-driver/blob/master/doc/mobileCommands.md#supported-buttons) |	{name}         |	{name: "Gamepad0"}             |

[Mobile Commands Example](http://appium.io/docs/en/commands/mobile-command/)

### Attributes
The following attributes can be queried using `attribute`

An attributes filter can be added to the supported search strategies (name, class, id, accessibility id) by appending the following format to the strategy value: `[@attributeType='attributeValue']`

Examples (Ruby): 

`find_element(name: "Title[@text='Big Buck Bunny']")`

`find_element(class: "PushButtonView[@isHittable='true']")`

|          Attribute         |          Return Type          |         Engine Version Support          |
|----------------------------|-------------------------------|------------------------------------------|
| `className`                | 					string	 				     | 					4.5.1+	 				|
| `compositeOpacity`         | 					float	 				       | 					4.2.14+	 				|
| `hasOpacity`               | 					bool	 				       | 					4.5.1+	 				|
| `hasFocus`                 | 					bool	 				       | 					4.5.1+	 				|
| `id`                       | 					string			         | 					4.5.1+	 				|
| `isEnabled`                | 					bool	 				       | 					5.0+	 			  	|
| `isDisplayed`              | 					bool	 				       | 					4.5.1+	 				|
| `isFullyDisplayed`         | 					bool	 				       | 					4.5.2+	 				|
| `isHittable`               | 					bool	 				       | 					4.5.1+	 				|
| `isHorizontalScrolling`    | 					bool	 				       | 					4.5.2+	 				|
| `isScrolling`              | 					bool	 				       | 					4.5.2+	 				|
| `isSelected`               | 					bool	 				       | 					5.0+	 				  |
| `localOpacity`             | 					float	 				       | 					4.2.14+	 				|
| `name`                     | 					string	 				     | 					4.2.1+	 				|
| `text`                     | 					string	 				     | 					4.5.1+	 				|
| `visibilityFlag`           | 					bool	 				       | 					4.5.1+	 				|

### Settings
The following commands are used with `getSettings` and `updateSettings`

Examples (Ruby): 

`get_settings`

`update_settings TimeDilation: 10`

`update_settings SourceTreeFilter: "[@isDisplayed='true']"`

[Retrieve Settings Example](http://appium.io/docs/en/commands/session/settings/get-settings/)

[Update Settings Example](http://appium.io/docs/en/commands/session/settings/update-settings/)


|      Settings              |          Engine Version Support          |          		Value                	 | 
|----------------------------|------------------------------------------|----------------------------------------|
| `TimeDilation`             | 					4.4.5+		      		| float (>0)	                         |
| `SourceTreeFilter`         | 					4.5.1+		      		| string (format: [@attributeType='attributeValue'])   |

## Selector strategies
| Supported selector strategies    |
|--------------------------------|
| `name`                         |
| `id`<sup>1</sup>               |
| `class name`                   |
| `accessibility id`             |
<sup>1</sup> Starting with 5.0, `id` selector can be used to search for React Native testID.
