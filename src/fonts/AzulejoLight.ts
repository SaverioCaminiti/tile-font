import { TileFontDefinition } from '../type';
import { azulejoTileFont } from './Azulejo';

export const azulejoLightTileFont: TileFontDefinition = {
	format: 'tile-font-v1',
	name: 'Azulejo Light',
	tileWidth: 100,
	letterSpacing: 0,
	wordSpacing: 1,
	defLetterWidth: 2,  // each glyph is 2x3 tiles
	defLetterHeight: 3,
	defLetter: '▢',  // any missing char fall back to an "▢"
	tiles: {
		...structuredClone(azulejoTileFont.tiles),  // deep copy and override the following
		1: `<rect class="inner-line" x="40" width="20" height="100"/>`,  // vline
		5: `<path class="inner-line" d="M7.15493e-07 40C7.87931 40 15.6815 41.5519 22.961 44.5672C30.2405 47.5825 36.8549 52.0021 42.4264 57.5736C47.9979 63.1451 52.4175 69.7595 55.4328 77.039C58.4481 84.3185 60 92.1207 60 100L39.996 100C39.996 94.7477 38.9615 89.5467 36.9515 84.6942C34.9415 79.8417 31.9954 75.4325 28.2814 71.7186C24.5675 68.0046 20.1583 65.0585 15.3058 63.0485C10.4533 61.0385 5.25235 60.004 4.76948e-07 60.004L7.15493e-07 40Z"/>`, // top-right curve
	},
	letters: structuredClone(azulejoTileFont.letters),  // deep copy
}
