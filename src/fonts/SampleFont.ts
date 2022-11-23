import { TileFontDefinition } from '../type';

export const sampleTileFont: TileFontDefinition = {
	format: 'tile-font-v1',
	name: 'Sample',
	tileWidth: 100,
	wordSpacing: 3,
	defLetterWidth: 2,  // each glyph is 2x3 tiles
	defLetterHeight: 3,
	forceCase: 'upper',
	tiles: {
		1: `<rect x="0" width="100" height="100"/>`,  // vline
		2: [1, 0, 0, 90],  // hline
		'|-': {tiles: [1, [2, .5]]},  // |- like in E F

		4: [5, 0, 0, 270],  // top-left curve
		5: `<path d="M1.19249e-06 0C13.1322 1.566e-07 26.1358 2.58658 38.2683 7.61205C50.4009 12.6375 61.4248 20.0035 70.7107 29.2893C79.9965 38.5752 87.3625 49.5991 92.388 61.7317C97.4134 73.8642 100 86.8678 100 100L0 100L1.19249e-06 0Z"/>`, // top-right curve
		6: [5, 0, 0, 180],  // bottom-left curve
		7: [5, 0, 0, 90],  // bottom-right curve

		46: {tiles: [4, 6]},  // double curve like in X
		75: {tiles: [7, 5]},  // double curve like in B K R
	},
	letters: {
		'A': {tiles: [4, 5, 1, 1, 7, 6]},
		'B': {tiles: [2, 5, 1, 75, 2, 7]},
		'C': {tiles: [4, 5, 1, 0, 6, 7]},
		'D': {tiles: [2, 5, 1, 1, 2, 7]},
		'E': {tiles: [4, 2, '|-', 0, 6, 2]},
		'F': {tiles: [4, 2, '|-', 0, 1, 0]},
		'G': {tiles: [4, 2, 1, 4, 6, 7]},
		'H': {tiles: [5, 4, 1, 1, 7, 6]},
		'I': {tiles: [1, 1, 1], width: 1},
		'J': {tiles: [0, 1, 0, 1, 6, 7]},
		'K': {tiles: [1, 4, 1, 75, 1, 6]},
		'L': {tiles: [1, 0, 1, 0, 6, 2]},
		'M': {tiles: [4, {tiles: [4, 5]}, 5, 1, 1, 1, 1, 0, 1], width: 3},
		'N': {tiles: [4, 5, 1, 1, 1, 1, 1, 6, 7], width: 3},
		'O': {tiles: [4, 5, 1, 1, 6, 7]},
		'P': {tiles: [2, 5, 1, 7, 1, 0]},
		'Q': {tiles: [4, 5, 1, 1, 6, 75]},
		'R': {tiles: [2, 5, 1, 75, 1, 6]},
		'S': {tiles: [4, 5, 6, 5, 6, 7]},
		'T': {tiles: [2, 2, [1, .5], 0, [1, .5], 0]},
		'U': {tiles: [1, 1, 1, 1, 6, 7]},
		'V': {tiles: [5, 4, 1, 1, 6, 7]},
		'W': {tiles: [1, 0, 1, 1, 1, 1, 6, {tiles: [6, 7]}, 7], width: 3},
		'X': {tiles: [5, 4, 46, 75, 7, 6]},
		'Y': {tiles: [5, 4, 6, 75, 4, 7]},
		'Z': {tiles: [2, 5, 4, 7, 6, 2]},
	},
}
