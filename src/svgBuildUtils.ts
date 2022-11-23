import {
	isModifiedTile,
	isModifiedTileSet,
	isSVGFragment,
	isTileId,
	ModifiedTile,
	ModifiedTileSet,
	Tile,
	TileFontDefinition,
	TileInLetter,
} from './type';

function getNumber(v: any, def: number): number {
	return (typeof v === 'number' && !isNaN(v)) ? v : def;
}

// render a line and return [code, width, height]
export function renderText(font: TileFontDefinition, text: string, scaleAttr: string | null): [string, number, number] {
	// context for following inner functions
	const tw = font.tileWidth;  // in pixel
	const th = (font.tileHeight || font.tileWidth);  // in pixel
	const lineSpacing = getNumber(font.lineSpacing, 1) * th;  // in pixel
	const wordSpacing = getNumber(font.wordSpacing, 2) * tw;  // in pixel
	const letterSpacing = getNumber(font.letterSpacing, 1) * tw;  // in pixel

	// convert case if required by the font
	if (font.forceCase === 'lower') {
		text = text.toLowerCase();
	} else if (font.forceCase === 'upper') {
		text = text.toUpperCase();
	}

	// render each line recursively
	const lines = text.split("\n");
	let width = 0;
	let height = 0;
	const scale = getNumber(Number(scaleAttr || "1"), 1);

	let code = `<g class="text" transform="scale(${scale}, ${scale})">`;
	lines.forEach(l => {
		const [c, w, h] = renderLine(l, height);
		if ((w > 0) || (h > 0)) {
			width = Math.max(width, w);
			height += h + lineSpacing;
		}
		code += c;
	});
	code += '</g>';
	height -= (height > 0) ? lineSpacing : 0;  // remove last lineSpacing (if any)

	return [code, width * scale, height * scale];

	// inner functions follows ------------------------------------------------

	// render a line and return [code, width, height]
	function renderLine(text: string, y: number): [string, number, number] {
		const letters = Array.from(text);  // avoid text.split('') which destroys UTF-16 surrogate pairs
		let width = 0;
		let height = 0;

		// render each letter recursively
		let code = '<g class="line">';
		let index = 0;
		let spaceNextLetter = false;
		while (index < letters.length) {
			if (spaceNextLetter) {  // letter spacing before next letter
				width += letterSpacing;
			}
			const [letter, used] = findValidLetter(letters, index);
			index += used;
			const [c, w, h] = renderLetter(letter, width, y);
			spaceNextLetter = true;
			if (w !== 0) {
				width += w;
			} else {
				// remove letter spacing added before (if any)
				width -= spaceNextLetter ? letterSpacing : 0;
				if (letter === ' ') {
					// was a standard space, not customized by the font: add word spacing
					width += wordSpacing;
					spaceNextLetter = false;
				}
			}
			height = Math.max(height, h);
			code += c;
		}
		code += '</g>';

		return [code, width, height];
	}

	// find the next valid letter based on text (letter[]) and font letters
	// return the string (to be used to index font.letters and its length (used letters)
	function findValidLetter(letters: string[], index: number): [string, number] {
		let letter = '';
		let used = 0;

		// try with at least single letter at first
		// check ligatures with a simple lookahead strategy
		// it matches 'ffi' only if there is 'ff' as well, otherwise will stop
		while (true) {
			letter += letters[index];
			used++;
			index++;
			if ((index >= letters.length) ||  // end of text
				(!font.letters[letter + letters[index]])) {  // no ligature found with next char
				break;
			}
		}

		// fallback to default but preserve spaces
		if (!font.letters[letter] && letter !== ' ') {
			letter = font.defLetter || '';
		}

		return [letter, used];
	}

	// render a letter and return [code, width, height]
	function renderLetter(letter: string, x: number, y: number): [string, number, number] {
		const letterDef = font.letters[letter];
		if (!letterDef) {
			return ['', 0, 0];
		}

		// letter size (different letters may have different size)
		const lw = letterDef.width || font.defLetterWidth;  // in tiles
		const lh = letterDef.height || font.defLetterHeight || font.defLetterWidth;  // in tiles
		const w = lw * tw;  // in pixel
		const h = lh * th;  // in pixel

		let code = `<g class="letter ${letter}" transform="translate(${x}, ${y})">`;
		if (!letterDef._cachedBody) {  // we cache generated code to avoid identical re-computation
			let body = '';
			letterDef.tiles.forEach((t, index) => {  // each tile in a letter definition
				const c = renderTileInLetter(t, index % lw, Math.floor(index / lw));
				body += c;
			});
			letterDef._cachedBody = body;
		}
		code += letterDef._cachedBody;
		code += '</g>';

		return [code, w, h];
	}

	// render a tile (in a letter) and return code
	function renderTileInLetter(tile: TileInLetter, tx: number, ty: number): string {
		let code = `<g class="tile ${tile}" transform="translate(${tx * tw}, ${ty * th})">`;
		if (isTileId(tile)) {  // just a simple id of a tile definition
			code += renderTileContent(font.tiles[tile]);
		} else if (isModifiedTile(tile)) {  // a tile with some transformation
			code += renderModifiedTile(tile);
		} else if (isModifiedTileSet(tile)) {
			code += renderModifiedTileSet(tile);
		} else {  // @ts-ignore
			console.warn('Unrecognized tile', tile);
		}
		code += '</g>';

		return code;
	}

	// render a tile (ad defined in font.tiles) and return code
	function renderTileContent(tileDef?: Tile): string {
		if (!tileDef) {
			return '';
		}

		let code = '';
		if (isSVGFragment(tileDef)) {
			code += tileDef;
		} else if (isModifiedTile(tileDef)) {
			code += renderModifiedTile(tileDef);
		} else if (isModifiedTileSet(tileDef)) {
			code += renderModifiedTileSet(tileDef);
		} else {  // @ts-ignore
			console.warn('Unrecognized tile definition', tileDef);
		}

		return code;
	}

	// render a tile translated and rotated
	function renderModifiedTile(tile: ModifiedTile) {
		let code = '';
		const [tileId, shiftX = 0, shiftY = 0, rot = 0] = tile;
		code += (shiftX || shiftY) ? `<g class="rotate" transform="translate(${shiftX * tw}, ${shiftY * th})">` : '';
		code += rot ? `<g class="rotate" transform="rotate(${rot}, ${tw / 2}, ${th / 2})">` : '';
		code += renderTileInLetter(tileId, 0, 0);
		code += rot ? '</g>' : '';
		code += (shiftX || shiftY) ? '</g>' : '';
		return code;
	}

	// render a tile set
	function renderModifiedTileSet(tileSet: ModifiedTileSet) {
		let code = '';
		tileSet.tiles.forEach(t => {
			code += renderTileInLetter(t, 0, 0);  // gater new tx and ty and use them
		});
		return code;
	}
}
