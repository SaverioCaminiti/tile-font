import { TileFontDefinition } from '../type';

export const brailleTileFont: TileFontDefinition = {
	format: 'tile-font-v1',
	name: 'Braille',
	tileWidth: 20,
	wordSpacing: 2,
	defLetterWidth: 2,  // each glyph is 2x3 tiles
	defLetterHeight: 3,
	forceCase: 'upper',
	// defLetter: 'a',  // any missing char fall back to an "a"
	tiles: {
		0: '<circle cx="10" cy="10" r="3"/>',  // small dot
		1: '<circle cx="10" cy="10" r="8"/>',  // big circle
	},
	letters: {
		'A': {tiles: [1, 0, 0, 0, 0, 0]},
		'B': {tiles: [1, 0, 1, 0, 0, 0]},
		'C': {tiles: [1, 1, 0, 0, 0, 0]},
		'D': {tiles: [1, 1, 0, 1, 0, 0]},
		'E': {tiles: [1, 0, 0, 1, 0, 0]},
		'F': {tiles: [1, 1, 1, 0, 0, 0]},
		'G': {tiles: [1, 1, 1, 1, 0, 0]},
		'H': {tiles: [1, 0, 1, 1, 0, 0]},
		'I': {tiles: [0, 1, 1, 0, 0, 0]},
		'J': {tiles: [0, 1, 1, 1, 0, 0]},

		'K': {tiles: [1, 0, 0, 0, 1, 0]},
		'L': {tiles: [1, 0, 1, 0, 1, 0]},
		'M': {tiles: [1, 1, 0, 0, 1, 0]},
		'N': {tiles: [1, 1, 0, 1, 1, 0]},
		'O': {tiles: [1, 0, 0, 1, 1, 0]},
		'P': {tiles: [1, 1, 1, 0, 1, 0]},
		'Q': {tiles: [1, 1, 1, 1, 1, 0]},
		'R': {tiles: [1, 0, 1, 1, 1, 0]},
		'S': {tiles: [0, 1, 1, 0, 1, 0]},
		'T': {tiles: [0, 1, 1, 1, 1, 0]},

		'U': {tiles: [1, 0, 0, 0, 1, 1]},
		'V': {tiles: [1, 0, 1, 0, 1, 1]},
		'W': {tiles: [0, 1, 1, 1, 0, 1]},
		'X': {tiles: [1, 1, 0, 0, 1, 1]},
		'Y': {tiles: [1, 1, 0, 1, 1, 1]},
		'Z': {tiles: [1, 0, 0, 1, 1, 1]},

		'0': {tiles: [0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0], width: 4},
		'1': {tiles: [0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0], width: 4},
		'2': {tiles: [0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0], width: 4},
		'3': {tiles: [0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0], width: 4},
		'4': {tiles: [0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0], width: 4},
		'5': {tiles: [0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0], width: 4},
		'6': {tiles: [0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0], width: 4},
		'7': {tiles: [0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0], width: 4},
		'8': {tiles: [0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0], width: 4},
		'9': {tiles: [0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0], width: 4},

		' ': {tiles: [0, 0, 0, 0, 0, 0]},
		'^': {tiles: [0, 0, 0, 0, 1, 0]},

		'-': {tiles: [0, 0, 0, 0, 1, 1]},
		'+': {tiles: [0, 1, 0, 0, 1, 1]},
		'*': {tiles: [0, 0, 0, 1, 1, 0]},
		'/': {tiles: [0, 1, 0, 0, 1, 0]},

		'(': {tiles: [0, 0, 1, 1, 1, 1]},
		')': {tiles: [0, 0, 1, 1, 1, 1]},

		'.': {tiles: [0, 0, 1, 1, 0, 1]},
		',': {tiles: [0, 0, 1, 0, 0, 0]},
		';': {tiles: [0, 0, 1, 0, 1, 0]},
		':': {tiles: [0, 0, 1, 1, 0, 0]},
		'!': {tiles: [0, 0, 1, 1, 1, 0]},
		'?': {tiles: [0, 0, 1, 0, 1, 1]},

		'<<': {tiles: [0, 0, 1, 0, 1, 1]},
		'«': {tiles: [0, 0, 1, 0, 1, 1]},
		'“': {tiles: [0, 0, 1, 0, 1, 1]},
		'‟': {tiles: [0, 0, 1, 0, 1, 1]},
		'„': {tiles: [0, 0, 1, 0, 1, 1]},

		'>>': {tiles: [0, 0, 0, 1, 1, 1]},
		'»': {tiles: [0, 0, 0, 1, 1, 1]},
		'”': {tiles: [0, 0, 0, 1, 1, 1]},
		'"': {tiles: [0, 0, 0, 1, 1, 1]},

		'\'': {tiles: [0, 0, 0, 0, 1, 0]},
	},
}
