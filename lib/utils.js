

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
  WEBDRIVER_INVALID_SELECTOR: 32
};

/**
 * List of valid input event names.
 */
export const youiEngineKeycode = {
  'Unidentified':	0, /*	Key code for unidentified keys.	*/
  'Attention':	1, /*	Secure attention key.	*/
  'Application':	2, /*	Application or menu key.	*/
  'Crsel':	3, /*	Crsel key.	*/
  'Exsel':	4, /*	Exsel key.	*/
  'F1':	5, /*	F1 key.	*/
  'F2':	6, /*	F2 key.	*/
  'F3':	7, /*	F3 key.	*/
  'F4':	8, /*	F4 key.	*/
  'F5':	9, /*	F5 key.	*/
  'F6':	10, /*	F6 key.	*/
  'F7':	11, /*	F7 key.	*/
  'F8':	12, /*	F8 key.	*/
  'F9':	13, /*	F9 key.	*/
  'F10':	14, /*	F10 key.	*/
  'F11':	15, /*	F11 key.	*/
  'F12':	16, /*	F12 key.	*/
  'F13':	17, /*	F13 key.	*/
  'F14':	18, /*	F14 key.	*/
  'F15':	19, /*	F15 key.	*/
  'F16':	20, /*	F16 key.	*/
  'F17':	21, /*	F17 key.	*/
  'F18':	22, /*	F18 key.	*/
  'F19':	23, /*	F19 key.	*/
  'F20':	24, /*	F20 key.	*/
  'F21':	25, /*	F21 key.	*/
  'F22':	26, /*	F22 key.	*/
  'F23':	27, /*	F23 key.	*/
  'F24':	28, /*	F24 key.	*/
  'LaunchApp1':	29, /*	Key for launching the first application.	*/
  'LaunchApp2':	30, /*	Key for launching the second application.	*/
  'LaunchMail':	31, /*	Key for launching the mail application.	*/
  'List':	32, /*	List key.	*/
  'Props':	33, /*	Props key.	*/
  'Soft1':	34, /*	Soft1 key.	*/
  'Soft2':	35, /*	Soft2 key.	*/
  'Soft3':	36, /*	Soft3 key.	*/
  'Soft4':	37, /*	Soft4 key.	*/
  'Accept':	38, /*	Accept, Commit or OK key.	*/
  'Again':	39, /*	Again key.	*/
  'Enter':	40, /*	Enter key.	*/
  'Find':	41, /*	Find key.	*/
  'Help':	42, /*	Help key.	*/
  'Info':	43, /*	Info key.	*/
  'Menu':	44, /*	Menu key.	*/
  'Pause':	45, /*	Pause key.	*/
  'Play':	46, /*	Play key.	*/
  'ScrollLock':	47, /*	Scrolling Lock key.	*/
  'Execute':	48, /*	Execute key.	*/
  'Cancel':	49, /*	Cancel key.	*/
  'Escape':	50, /*	Escape key.	*/
  'Zoom':	51, /*	Zoom key.	*/
  'Separator':	52, /*	Separator key.	*/
  'Space':	53, /*	Space key.	*/
  'Add':	54, /*	Add key.	*/
  'Subtract':	55, /*	Subtract key.	*/
  'Multiply':	56, /*	Multiply key.	*/
  'Divide':	57, /*	Divide key.	*/
  'Equal':	58, /*	Equal key.	*/
  'Decimal':	59, /*	Decimal key.	*/
  'BrightnessDown':	60, /*	Key for decreasing the display brightness.	*/
  'BrightnessUp':	61, /*	Key for increasing the display brightness.	*/
  'Camera':	62, /*	Camera button.	*/
  'Eject':	63, /*	Eject button.	*/
  'Power':	64, /*	Power button.	*/
  'PrintScreen':	65, /*	Printscreen key.	*/
  'BrowserFavorites':	66, /*	Key for opening the favourites/bookmarks.	*/
  'BrowserHome':	67, /*	Key for returning to your Homepage.	*/
  'BrowserRefresh':	68, /*	Key to refresh the page.	*/
  'BrowserSearch':	69, /*	Key for searching the internet.	*/
  'BrowserStop':	70, /*	Key for stopping a page load.	*/
  'BrowserBack':	71, /*	Key to go to the previous loaded webpage in your history	*/
  'BrowserForward':	72, /*	Key to go to the next loaded webpage in your history	*/
  'PageUp':	73, /*	Page Up key.	*/
  'PageDown':	74, /*	Page Down key.	*/
  'ArrowLeft':	75, /*	Left Arrow key.	*/
  'ArrowRight':	76, /*	Right Arrow key.	*/
  'ArrowUp':	77, /*	Up Arrow key.	*/
  'ArrowUpLeft':	78, /*	Diagonal up-left arrow key.	*/
  'ArrowUpRight':	79, /*	Diagonal up-right arrow key.	*/
  'ArrowDown':	80, /*	Down Arrow key.	*/
  'ArrowDownLeft':	81, /*	Diagonal down-left arrow key.	*/
  'ArrowDownRight':	82, /*	Diagonal down-right arrow key.	*/
  'Home':	83, /*	Home key.	*/
  'End':	84, /*	End key.	*/
  'Select':	85, /*	Select key.	*/
  'Tab':	86, /*	Tab key.	*/
  'Backspace':	87, /*	Backspace key.	*/
  'Clear':	88, /*	Clear key.	*/
  'Copy':	89, /*	Copy key.	*/
  'Cut':	90, /*	Cut key.	*/
  'Delete':	91, /*	Delete key.	*/
  'EraseEndOfField':	92, /*	Erase to End of Field key. Deletes any characters from the current cursor position to the end of the current field.	*/
  'Insert':	93, /*	Insert key.	*/
  'Paste':	94, /*	Paste key.	*/
  'Undo':	95, /*	Undo key.	*/
  'DeadGrave':	96, /*	Combining Grave accent (Greek Varia, Dead Grave) key.	*/
  'DeadAcute':	97, /*	Combining Acute accent (Stress Mark, Greek Oxia, Tonos, Dead Eacute) key.	*/
  'DeadCircumflex':	98, /*	Combining Circumflex accent (Hat, Dead Circumflex) key.	*/
  'DeadTilde':	99, /*	Combinging Tilde (Dead Tilde) key.	*/
  'DeadMacron':	100, /*	Combining Macron (Long, Dead Macron) key.	*/
  'DeadBreve':	101, /*	Combining Breve (Short, Dead Breve) key.	*/
  'DeadAboveDot':	102, /*	Combining Dot Above (Derivative, Dead Above Dot) key.	*/
  'DeadUmlaut':	103, /*	Combining Diaeresis (Double Dot Above, Umlaut, Greek Dialytika, Double Derivative, Dead Diaeresis) key.	*/
  'DeadAboveRing':	104, /*	Combining Ring Above (Dead Above Ring) key.	*/
  'DeadDoubleAcute':	105, /*	Combining Double Acute accent (Dead Doubleacute) key.	*/
  'DeadCaron':	106, /*	Combining Caron (Hacek, V Above, Dead Caron) key.	*/
  'DeadCedilla':	107, /*	Combining Cedilla (Dead Cedilla) key.	*/
  'DeadOgonek':	108, /*	Combining Ogonek (Nasal Hook, Dead Ogonek) key.	*/
  'DeadIota':	109, /*	Combining Greek Ypogegrammeni (Greek Non-Spacing Iota Below, Iota Subscript, Dead Iota) key.	*/
  'DeadVoicedSound':	110, /*	Combining Katakana-Hiragana Voiced Sound Mark (Dead Voiced Sound) key.	*/
  'DeadSemiVoicedSound':	111, /*	Combining Katakana-Hiragana Semi-Voiced Sound Mark (Dead Semivoiced Sound) key.	*/
  'Alphanumeric':	112, /*	Alphanumeric Keys (a-zA-Z0-9).	*/
  'Alt':	113, /*	Alt key.	*/
  'AltGraph':	114, /*	Alt-Graph or Right Alt key.	*/
  'CapsLock':	115, /*	Caps Lock key.	*/
  'Control':	116, /*	Control key.	*/
  'Function':	117, /*	Function key.	*/
  'Meta':	118, /*	Meta key.	*/
  'Process':	119, /*	Process key.	*/
  'NumLock':	120, /*	Number Lock key.	*/
  'Shift':	121, /*	Shift key.	*/
  'SymbolLock':	122, /*	Symbol Lock key.	*/
  'OperatingSystem':	123, /*	Windows key, or Command key on a Mac.	*/
  'Compose':	124, /*	Compose key.	*/
  'AllCandidates':	125, /*	All candidates key.	*/
  'NextCandidate':	126, /*	Next candidate key.	*/
  'PreviousCandidate':	127, /*	Previous candidate key.	*/
  'CodeInput':	128, /*	Code input key.	*/
  'Convert':	129, /*	Convert key.	*/
  'NonConvert':	130, /*	Non-convert key.	*/
  'FinalMode':	131, /*	Final Mode (Final) key used on some asian keyboards.	*/
  'FullWidth':	132, /*	Full-Width Characters key.	*/
  'HalfWidth':	133, /*	Half-Width Characters key.	*/
  'ModeChange':	134, /*	Mode Change key.	*/
  'RomanCharacters':	135, /*	Roman Characters function key.	*/
  'HangulMode':	136, /*	Hangul (Korean characters) Mode key.	*/
  'HanjaMode':	137, /*	Hanja (Korean characters) Mode key.	*/
  'JunjaMode':	138, /*	Junja Mode key.	*/
  'Hiragana':	139, /*	Hiragana (Japanese Kana characters) key.	*/
  'KanaMode':	140, /*	Kana Mode (Kana Lock) key.	*/
  'KanjiMode':	141, /*	Kanji (Japanese ideographic characters) Mode key.	*/
  'Katakana':	142, /*	Katakana (Japanese Kana characters) key.	*/
  'AudioFaderFront':	143, /*	Audio fader front key.	*/
  'AudioFaderRear':	144, /*	Audio fader rear key.	*/
  'AudioBalanceLeft':	145, /*	Audio balance left key.	*/
  'AudioBalanceRight':	146, /*	Audio balance right key.	*/
  'AudioBaseBoostDown':	147, /*	Audio base boost down key.	*/
  'AudioBaseBoostUp':	148, /*	Audio base boost up key.	*/
  'VolumeMute':	149, /*	Mute audio key.	*/
  'VolumeDown':	150, /*	Key for decreasing the volume of the audio.	*/
  'VolumeUp':	151, /*	Key for increasing the volume of the audio.	*/
  'MediaPause':	152, /*	Key for pausing media.	*/
  'MediaPlay':	153, /*	Key for playing media.	*/
  'MediaTrackEnd':	154, /*	Key for jumping to the end of the current media.	*/
  'MediaNextTrack':	155, /*	Key for going to the next playable media.	*/
  'MediaFastForward':	156, /*	Key for fast-forwarding through the current media.	*/
  'MediaRewind':	157, /*	Key for rewinding through the current media.	*/
  'MediaPlayPause':	158, /*	Key that toggles between playing or pausing the current media.	*/
  'MediaPreviousTrack':	159, /*	Key for going the previous playable media.	*/
  'MediaTrackSkip':	160, /*	Key for going to the next playable media.	*/
  'MediaTrackStart':	161, /*	Key for jumping to the beginning of the current media.	*/
  'MediaStepForward':	162, /*	Key for seeking forward through the current media.	*/
  'MediaStepBackward':	163, /*	Key for seeking backwards through the current media.	*/
  'MediaStop':	164, /*	Key for stopping media playback.	*/
  'MediaInstantReplay':	165, /*	Instant replay key.	*/
  'SelectMedia':	166, /*	Select media key.	*/
  'Blue':	167, /*	The blue key found on a generic TV remote. Also sometimes labelled as D.	*/
  'Brown':	168, /*	The brown key found on a generic TV remote.	*/
  'ChannelDown':	169, /*	Key for going to the next channel.	*/
  'ChannelUp':	170, /*	Key for going to the previous channel.	*/
  'ClearFavorite0':	171, /*	First clear favourite key.	*/
  'ClearFavorite1':	172, /*	Second clear favourite key.	*/
  'ClearFavorite2':	173, /*	Third clear favourite key.	*/
  'ClearFavorite3':	174, /*	Fourth clear favourite key.	*/
  'Dimmer':	175, /*	Dimmer key.	*/
  'DisplaySwap':	176, /*	Display swap key.	*/
  'Green':	177, /*	The green key found on a generic TV remote. Also sometimes labelled as B.	*/
  'Grey':	178, /*	The grey key found on a generic TV remote.	*/
  'Guide':	179, /*	Guide key.	*/
  'MediaList':	180, /*	List media key.	*/
  'Link':	181, /*	Link key.	*/
  'Live':	182, /*	Live key.	*/
  'Lock':	183, /*	Lock key.	*/
  'NextDay':	184, /*	Next day key.	*/
  'NextFavoriteChannel':	185, /*	Next favourite channel key.	*/
  'OnDemand':	186, /*	On demand key.	*/
  'PictureInPictureDown':	187, /*	Picture in Picture down key.	*/
  'PictureInPictureMove':	188, /*	Picture in Picture move key.	*/
  'PictureInPictureToggle':	189, /*	Picture in Picture toggle key.	*/
  'PictureInPictureUp':	190, /*	Picture in Picture up key.	*/
  'PlaySpeedDown':	191, /*	Play speed down key.	*/
  'PlaySpeedReset':	192, /*	Play speed reset key.	*/
  'PreviousDay':	193, /*	Previous day key.	*/
  'RandomToggle':	194, /*	Random toggle key.	*/
  'RecallFavorite0':	195, /*	First recall favourite key.	*/
  'RecallFavorite1':	196, /*	Second recall favourite key.	*/
  'RecallFavorite2':	197, /*	Third recall favourite key.	*/
  'RecallFavorite3':	198, /*	Fourth recall favourite key.	*/
  'MediaRecord':	199, /*	Record media key.	*/
  'RecordSpeedNext':	200, /*	Next record speed key.	*/
  'Red':	201, /*	The red key found on a generic TV remote. Also sometimes labelled as A.	*/
  'RFBypass':	202, /*	Key for switching between IR and RF mode.	*/
  'ScanChannelsToggle':	203, /*	Scan channels toggle key.	*/
  'ScreenModeNext':	204, /*	Next screen mode key.	*/
  'Settings':	205, /*	Settings key.	*/
  'SplitScreenToggle':	206, /*	Split screen toggle key.	*/
  'StoreFavorite0':	207, /*	First store favourite key.	*/
  'StoreFavorite1':	208, /*	Second store favourite key.	*/
  'StoreFavorite2':	209, /*	Third store favourite key.	*/
  'StoreFavorite3':	210, /*	Fourth store favourite key.	*/
  'Subtitle':	211, /*	Subtitle key.	*/
  'AudioSurroundModeNext':	212, /*	Next audio surriund sound mode key.	*/
  'Teletext':	213, /*	Teletext key.	*/
  'VideoModeNext':	214, /*	Next video mode key.	*/
  'DisplayWide':	215, /*	Wide display key.	*/
  'Wink':	216, /*	Wink key.	*/
  'Yellow':	217, /*	The yellow key found on a generic TV remote. Also sometimes labelled as C.	*/
  'SystemHome':	218, /*	System Home button.	*/
  'SystemBack':	219, /*	Back button.	*/
  'Gamepad0':	220, /*	X Button on a Playstation controller, A button on an XBox controller	*/
  'Gamepad1':	221, /*	○ Button on a Playstation controller, B button on an XBox controller	*/
  'Gamepad2':	222, /*	□ Button on a Playstation controller, X button on an XBox controller	*/
  'Gamepad3':	223, /*	△ Button on a Playstation controller, Y button on an XBox controller	*/
  'GamepadLeftBumper':	224, /*	The left bumper on a controller (i.e LB on a PS4 controller)	*/
  'GamepadRightBumper':	225, /*	The right bumper on a controller (i.e RB on a PS4 controller)	*/
  'GamepadLeftTrigger':	226, /*	The left trigger on a controller (i.e LT on a PS4 controller)	*/
  'GamepadRightTrigger':	227, /*	The right trigger on a controller (i.e RT on a PS4 controller)	*/
  'GamepadLeftStick':	228, /*	The left analog button on a controller (i.e. L3 on a PS4 controller)	*/
  'GamepadRightStick':	229, /*	The right analog button on a controller (i.e. R3 on a PS4 controller)	*/
  'GamepadSelect':	230, /*	The select button on a controller	*/
  'GamepadStart':	231, /*	The start button on a controller	*/
  'DVR':	232, /*	DVR key.	*/
  'TV':	233, /*	TV key.	*/
  'Captions':	234, /*	Captions key.	*/
  'Search':	235, /*	Search key on remotes.	*/
  'VoiceSearch':	236, /*	Voice search key on remotes.	*/
  'TV3DMode':	237, /* Magic Remote 3D TV mode key.	*/
  'MagicInput':	238, /* Magic Remote input key.	*/
};