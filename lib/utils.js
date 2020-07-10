

export function unwrapEl (el) {
  if (typeof el === 'object' && el.ELEMENT) {
    return el.ELEMENT;
  }
  return el;
}

export const youiEngineDriverReturnValues = {
  WEBDRIVER_SUCCESS: 0,
  WEBDRIVER_NO_SUCH_ELEMENT: 7,
  WEBDRIVER_UNKNOWN_COMMAND: 9,
  WEBDRIVER_STALE_ELEMENT: 10,
  WEBDRIVER_ELEMENT_IS_NOT_SELECTABLE: 15,
  WEBDRIVER_NO_SUCH_WINDOW: 23,
  WEBDRIVER_INVALID_SELECTOR: 32,
  WEBDRIVER_ELEMENT_IS_NOT_VISIBLE: 11
};

/**
 * List of valid input event names.
 */

export const youiEngineKeycode = [
  'Unidentified', /*	Key code for unidentified keys.	*/
  'Attention', /*	Secure attention key.	*/
  'Application', /*	Application or menu key.	*/
  'Crsel', /*	Crsel key.	*/
  'Exsel', /*	Exsel key.	*/
  'F1', /*	F1 key.	*/
  'F2', /*	F2 key.	*/
  'F3', /*	F3 key.	*/
  'F4', /*	F4 key.	*/
  'F5', /*	F5 key.	*/
  'F6', /*	F6 key.	*/
  'F7', /*	F7 key.	*/
  'F8', /*	F8 key.	*/
  'F9', /*	F9 key.	*/
  'F10', /*	F10 key.	*/
  'F11', /*	F11 key.	*/
  'F12', /*	F12 key.	*/
  'F13', /*	F13 key.	*/
  'F14', /*	F14 key.	*/
  'F15', /*	F15 key.	*/
  'F16', /*	F16 key.	*/
  'F17', /*	F17 key.	*/
  'F18', /*	F18 key.	*/
  'F19', /*	F19 key.	*/
  'F20', /*	F20 key.	*/
  'F21', /*	F21 key.	*/
  'F22', /*	F22 key.	*/
  'F23', /*	F23 key.	*/
  'F24', /*	F24 key.	*/
  'LaunchApp1', /*	Key for launching the first application.	*/
  'LaunchApp2', /*	Key for launching the second application.	*/
  'LaunchMail', /*	Key for launching the mail application.	*/
  'List', /*	List key.	*/
  'Props', /*	Props key.	*/
  'Soft1', /*	Soft1 key.	*/
  'Soft2', /*	Soft2 key.	*/
  'Soft3', /*	Soft3 key.	*/
  'Soft4', /*	Soft4 key.	*/
  'Accept', /*	Accept, Commit or OK key.	*/
  'Again', /*	Again key.	*/
  'Enter', /*	Enter key.	*/
  'Find', /*	Find key.	*/
  'Help', /*	Help key.	*/
  'Info', /*	Info key.	*/
  'Menu', /*	Menu key.	*/
  'Pause', /*	Pause key.	*/
  'Play', /*	Play key.	*/
  'ScrollLock', /*	Scrolling Lock key.	*/
  'Execute', /*	Execute key.	*/
  'Cancel', /*	Cancel key.	*/
  'Escape', /*	Escape key.	*/
  'Zoom', /*	Zoom key.	*/
  'Separator', /*	Separator key.	*/
  'Space', /*	Space key.	*/
  'Add', /*	Add key.	*/
  'Subtract', /*	Subtract key.	*/
  'Multiply', /*	Multiply key.	*/
  'Divide', /*	Divide key.	*/
  'Equal', /*	Equal key.	*/
  'Decimal', /*	Decimal key.	*/
  'BrightnessDown', /*	Key for decreasing the display brightness.	*/
  'BrightnessUp', /*	Key for increasing the display brightness.	*/
  'Camera', /*	Camera button.	*/
  'Eject', /*	Eject button.	*/
  'Power', /*	Power button.	*/
  'PrintScreen', /*	Printscreen key.	*/
  'BrowserFavorites', /*	Key for opening the favourites/bookmarks.	*/
  'BrowserHome', /*	Key for returning to your Homepage.	*/
  'BrowserRefresh', /*	Key to refresh the page.	*/
  'BrowserSearch', /*	Key for searching the internet.	*/
  'BrowserStop', /*	Key for stopping a page load.	*/
  'BrowserBack', /*	Key to go to the previous loaded webpage in your history	*/
  'BrowserForward', /*	Key to go to the next loaded webpage in your history	*/
  'PageUp', /*	Page Up key.	*/
  'PageDown', /*	Page Down key.	*/
  'ArrowLeft', /*	Left Arrow key.	*/
  'ArrowRight', /*	Right Arrow key.	*/
  'ArrowUp', /*	Up Arrow key.	*/
  'ArrowUpLeft', /*	Diagonal up-left arrow key.	*/
  'ArrowUpRight', /*	Diagonal up-right arrow key.	*/
  'ArrowDown', /*	Down Arrow key.	*/
  'ArrowDownLeft', /*	Diagonal down-left arrow key.	*/
  'ArrowDownRight', /*	Diagonal down-right arrow key.	*/
  'Home', /*	Home key.	*/
  'End', /*	End key.	*/
  'Select', /*	Select key.	*/
  'Tab', /*	Tab key.	*/
  'Backspace', /*	Backspace key.	*/
  'Clear', /*	Clear key.	*/
  'Copy', /*	Copy key.	*/
  'Cut', /*	Cut key.	*/
  'Delete', /*	Delete key.	*/
  'EraseEndOfField', /*	Erase to End of Field key. Deletes any characters from the current cursor position to the end of the current field.	*/
  'Insert', /*	Insert key.	*/
  'Paste', /*	Paste key.	*/
  'Undo', /*	Undo key.	*/
  'DeadGrave', /*	Combining Grave accent (Greek Varia, Dead Grave) key.	*/
  'DeadAcute', /*	Combining Acute accent (Stress Mark, Greek Oxia, Tonos, Dead Eacute) key.	*/
  'DeadCircumflex', /*	Combining Circumflex accent (Hat, Dead Circumflex) key.	*/
  'DeadTilde', /*	Combinging Tilde (Dead Tilde) key.	*/
  'DeadMacron', /*	Combining Macron (Long, Dead Macron) key.	*/
  'DeadBreve', /*	Combining Breve (Short, Dead Breve) key.	*/
  'DeadAboveDot', /*	Combining Dot Above (Derivative, Dead Above Dot) key.	*/
  'DeadUmlaut', /*	Combining Diaeresis (Double Dot Above, Umlaut, Greek Dialytika, Double Derivative, Dead Diaeresis) key.	*/
  'DeadAboveRing', /*	Combining Ring Above (Dead Above Ring) key.	*/
  'DeadDoubleAcute', /*	Combining Double Acute accent (Dead Doubleacute) key.	*/
  'DeadCaron', /*	Combining Caron (Hacek, V Above, Dead Caron) key.	*/
  'DeadCedilla', /*	Combining Cedilla (Dead Cedilla) key.	*/
  'DeadOgonek', /*	Combining Ogonek (Nasal Hook, Dead Ogonek) key.	*/
  'DeadIota', /*	Combining Greek Ypogegrammeni (Greek Non-Spacing Iota Below, Iota Subscript, Dead Iota) key.	*/
  'DeadVoicedSound', /*	Combining Katakana-Hiragana Voiced Sound Mark (Dead Voiced Sound) key.	*/
  'DeadSemiVoicedSound', /*	Combining Katakana-Hiragana Semi-Voiced Sound Mark (Dead Semivoiced Sound) key.	*/
  'Alphanumeric', /*	Alphanumeric Keys (a-zA-Z0-9).	*/
  'Alt', /*	Alt key.	*/
  'AltGraph', /*	Alt-Graph or Right Alt key.	*/
  'CapsLock', /*	Caps Lock key.	*/
  'Control', /*	Control key.	*/
  'Function', /*	Function key.	*/
  'Meta', /*	Meta key.	*/
  'Process', /*	Process key.	*/
  'NumLock', /*	Number Lock key.	*/
  'Shift', /*	Shift key.	*/
  'SymbolLock', /*	Symbol Lock key.	*/
  'OperatingSystem', /*	Windows key, or Command key on a Mac.	*/
  'Compose', /*	Compose key.	*/
  'AllCandidates', /*	All candidates key.	*/
  'NextCandidate', /*	Next candidate key.	*/
  'PreviousCandidate', /*	Previous candidate key.	*/
  'CodeInput', /*	Code input key.	*/
  'Convert', /*	Convert key.	*/
  'NonConvert', /*	Non-convert key.	*/
  'FinalMode', /*	Final Mode (Final) key used on some asian keyboards.	*/
  'FullWidth', /*	Full-Width Characters key.	*/
  'HalfWidth', /*	Half-Width Characters key.	*/
  'ModeChange', /*	Mode Change key.	*/
  'RomanCharacters', /*	Roman Characters function key.	*/
  'HangulMode', /*	Hangul (Korean characters) Mode key.	*/
  'HanjaMode', /*	Hanja (Korean characters) Mode key.	*/
  'JunjaMode', /*	Junja Mode key.	*/
  'Hiragana', /*	Hiragana (Japanese Kana characters) key.	*/
  'KanaMode', /*	Kana Mode (Kana Lock) key.	*/
  'KanjiMode', /*	Kanji (Japanese ideographic characters) Mode key.	*/
  'Katakana', /*	Katakana (Japanese Kana characters) key.	*/
  'AudioFaderFront', /*	Audio fader front key.	*/
  'AudioFaderRear', /*	Audio fader rear key.	*/
  'AudioBalanceLeft', /*	Audio balance left key.	*/
  'AudioBalanceRight', /*	Audio balance right key.	*/
  'AudioBaseBoostDown', /*	Audio base boost down key.	*/
  'AudioBaseBoostUp', /*	Audio base boost up key.	*/
  'VolumeMute', /*	Mute audio key.	*/
  'VolumeDown', /*	Key for decreasing the volume of the audio.	*/
  'VolumeUp', /*	Key for increasing the volume of the audio.	*/
  'MediaPause', /*	Key for pausing media.	*/
  'MediaPlay', /*	Key for playing media.	*/
  'MediaTrackEnd', /*	Key for jumping to the end of the current media.	*/
  'MediaNextTrack', /*	Key for going to the next playable media.	*/
  'MediaFastForward', /*	Key for fast-forwarding through the current media.	*/
  'MediaRewind', /*	Key for rewinding through the current media.	*/
  'MediaPlayPause', /*	Key that toggles between playing or pausing the current media.	*/
  'MediaPreviousTrack', /*	Key for going the previous playable media.	*/
  'MediaTrackSkip', /*	Key for going to the next playable media.	*/
  'MediaTrackStart', /*	Key for jumping to the beginning of the current media.	*/
  'MediaStepForward', /*	Key for seeking forward through the current media.	*/
  'MediaStepBackward', /*	Key for seeking backwards through the current media.	*/
  'MediaStop', /*	Key for stopping media playback.	*/
  'MediaInstantReplay', /*	Instant replay key.	*/
  'SelectMedia', /*	Select media key.	*/
  'Blue', /*	The blue key found on a generic TV remote. Also sometimes labelled as D.	*/
  'Brown', /*	The brown key found on a generic TV remote.	*/
  'ChannelDown', /*	Key for going to the next channel.	*/
  'ChannelUp', /*	Key for going to the previous channel.	*/
  'ClearFavorite0', /*	First clear favourite key.	*/
  'ClearFavorite1', /*	Second clear favourite key.	*/
  'ClearFavorite2', /*	Third clear favourite key.	*/
  'ClearFavorite3', /*	Fourth clear favourite key.	*/
  'Dimmer', /*	Dimmer key.	*/
  'DisplaySwap', /*	Display swap key.	*/
  'Green', /*	The green key found on a generic TV remote. Also sometimes labelled as B.	*/
  'Grey', /*	The grey key found on a generic TV remote.	*/
  'Guide', /*	Guide key.	*/
  'MediaList', /*	List media key.	*/
  'Link', /*	Link key.	*/
  'Live', /*	Live key.	*/
  'Lock', /*	Lock key.	*/
  'NextDay', /*	Next day key.	*/
  'NextFavoriteChannel', /*	Next favourite channel key.	*/
  'OnDemand', /*	On demand key.	*/
  'PictureInPictureDown', /*	Picture in Picture down key.	*/
  'PictureInPictureMove', /*	Picture in Picture move key.	*/
  'PictureInPictureToggle', /*	Picture in Picture toggle key.	*/
  'PictureInPictureUp', /*	Picture in Picture up key.	*/
  'PlaySpeedDown', /*	Play speed down key.	*/
  'PlaySpeedReset', /*	Play speed reset key.	*/
  'PreviousDay', /*	Previous day key.	*/
  'RandomToggle', /*	Random toggle key.	*/
  'RecallFavorite0', /*	First recall favourite key.	*/
  'RecallFavorite1', /*	Second recall favourite key.	*/
  'RecallFavorite2', /*	Third recall favourite key.	*/
  'RecallFavorite3', /*	Fourth recall favourite key.	*/
  'MediaRecord', /*	Record media key.	*/
  'RecordSpeedNext', /*	Next record speed key.	*/
  'Red', /*	The red key found on a generic TV remote. Also sometimes labelled as A.	*/
  'RFBypass', /*	Key for switching between IR and RF mode.	*/
  'ScanChannelsToggle', /*	Scan channels toggle key.	*/
  'ScreenModeNext', /*	Next screen mode key.	*/
  'Settings', /*	Settings key.	*/
  'SplitScreenToggle', /*	Split screen toggle key.	*/
  'StoreFavorite0', /*	First store favourite key.	*/
  'StoreFavorite1', /*	Second store favourite key.	*/
  'StoreFavorite2', /*	Third store favourite key.	*/
  'StoreFavorite3', /*	Fourth store favourite key.	*/
  'Subtitle', /*	Subtitle key.	*/
  'AudioSurroundModeNext', /*	Next audio surriund sound mode key.	*/
  'Teletext', /*	Teletext key.	*/
  'VideoModeNext', /*	Next video mode key.	*/
  'DisplayWide', /*	Wide display key.	*/
  'Wink', /*	Wink key.	*/
  'Yellow', /*	The yellow key found on a generic TV remote. Also sometimes labelled as C.	*/
  'SystemHome', /*	System Home button.	*/
  'SystemBack', /*	Back button.	*/
  'Gamepad0', /*	X Button on a Playstation controller, A button on an XBox controller	*/
  'Gamepad1', /*	○ Button on a Playstation controller, B button on an XBox controller	*/
  'Gamepad2', /*	□ Button on a Playstation controller, X button on an XBox controller	*/
  'Gamepad3', /*	△ Button on a Playstation controller, Y button on an XBox controller	*/
  'GamepadLeftBumper', /*	The left bumper on a controller (i.e LB on a PS4 controller)	*/
  'GamepadRightBumper', /*	The right bumper on a controller (i.e RB on a PS4 controller)	*/
  'GamepadLeftTrigger', /*	The left trigger on a controller (i.e LT on a PS4 controller)	*/
  'GamepadRightTrigger', /*	The right trigger on a controller (i.e RT on a PS4 controller)	*/
  'GamepadLeftStick', /*	The left analog button on a controller (i.e. L3 on a PS4 controller)	*/
  'GamepadRightStick', /*	The right analog button on a controller (i.e. R3 on a PS4 controller)	*/
  'GamepadSelect', /*	The select button on a controller	*/
  'GamepadStart', /*	The start button on a controller	*/
  'DVR', /*	DVR key.	*/
  'TV', /*	TV key.	*/
  'Captions', /*	Captions key.	*/
  'Search', /*	Search key on remotes.	*/
  'VoiceSearch', /*	Voice search key on remotes.	*/
  'TV3DMode', /*	Magic Remote 3D TV mode key.	*/
  'MagicInput', /*	Magic Remote input key.	*/
];
