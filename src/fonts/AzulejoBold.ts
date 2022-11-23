import { TileFontDefinition } from '../type';
import { azulejoTileFont } from './Azulejo';

export const azulejoBoldTileFont: TileFontDefinition = {
	format: 'tile-font-v1',
	name: 'Azulejo Bold',
	tileWidth: 100,
	letterSpacing: 0.5,
	wordSpacing: 1,
	defLetterWidth: 2,  // each glyph is 2x3 tiles
	defLetterHeight: 3,
	defLetter: '▢',  // any missing char fall back to an "▢"
	tiles: {
		...structuredClone(azulejoTileFont.tiles),  // deep copy and override the following
		1: `<rect class="outer-shape" x="0" width="100" height="100"/>
			<rect class="center-fill" x="20" width="60" height="100"/>
			<rect class="inner-line" x="40" width="20" height="100"/>`,  // vline
		5: `<path class="outer-shape" d="M1.19249e-06 0C13.1322 1.566e-07 26.1358 2.58658 38.2683 7.61205C50.4009 12.6375 61.4248 20.0035 70.7107 29.2893C79.9965 38.5752 87.3625 49.5991 92.388 61.7317C97.4134 73.8642 100 86.8678 100 100L0 100L1.19249e-06 0Z"/>
			<path class="center-fill" d="M9.5399e-07 20C10.5058 20 20.9086 22.0693 30.6147 26.0896C40.3207 30.11 49.1399 36.0028 56.5685 43.4315C63.9972 50.8602 69.89 59.6793 73.9104 69.3853C77.9307 79.0914 80 89.4943 80 100L20 100C20 97.3736 19.4827 94.7728 18.4776 92.3463C17.4725 89.9198 15.9993 87.715 14.1421 85.8579C12.285 84.0007 10.0802 82.5275 7.65367 81.5224C5.22716 80.5173 2.62644 80 2.38498e-07 80L9.5399e-07 20Z"/>
			<path class="inner-line" d="M7.15493e-07 40C7.87931 40 15.6815 41.5519 22.961 44.5672C30.2405 47.5825 36.8549 52.0021 42.4264 57.5736C47.9979 63.1451 52.4175 69.7595 55.4328 77.039C58.4481 84.3185 60 92.1207 60 100L39.996 100C39.996 94.7477 38.9615 89.5467 36.9515 84.6942C34.9415 79.8417 31.9954 75.4325 28.2814 71.7186C24.5675 68.0046 20.1583 65.0585 15.3058 63.0485C10.4533 61.0385 5.25235 60.004 4.76948e-07 60.004L7.15493e-07 40Z"/>`, // top-right curve
	},
	letters: structuredClone(azulejoTileFont.letters),  // deep copy
}
