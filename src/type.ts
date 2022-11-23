type SVGFragment = string;  // some svg code that will go inside a <g> tag

// id used in tiles array
type TileId = string | number;

// used to define a new tile modifying an existing one with
export type ModifiedTile = [
	TileId,
	number?, number?,  // x and y offset in tiles
	number?,  // rotation
	// number?, number?,  // x and y scaling
];

// grouping more tiles together (with or without modifications)
export type ModifiedTileSet = { tiles: (TileId | ModifiedTile)[] };

// in tiles array
export type Tile = SVGFragment | ModifiedTile | ModifiedTileSet;

// in letters array
export type TileInLetter = TileId | ModifiedTile | ModifiedTileSet;

type Letter = {
	width?: number;  // in tiles
	height?: number;  // in tiles
	tiles: TileInLetter[]
	_cachedBody?: string;
};

export interface TileFontDefinition {
	format: 'tile-font-v1';
	name: string;  // font name, mandatory and unique
	tileWidth: number;  // in px
	tileHeight?: number;  // in px

	defLetterWidth: number;
	defLetterHeight: number;
	letterSpacing?: number;
	wordSpacing?: number;
	lineSpacing?: number;

	forceCase?: 'lower' | 'upper';  // font is not case-sensitive, we force string case
	defLetter?: string;  // which letter must be used for missing ones

	tiles: {
		[id in TileId]: Tile;
	};

	letters: {
		[match in string]: Letter;  // match can be a single letter or something longer (ligatures)
	}
}

export function isSVGFragment(v: Tile): v is SVGFragment {
	return (typeof v === 'string');
}

export function isTileId(v: TileInLetter): v is TileId {
	return (typeof v === 'string') || (typeof v === 'number');
}

export function isModifiedTile(v: Tile | TileInLetter): v is ModifiedTile {
	if (Array.isArray(v) && !v.some((part: any) => Array.isArray(part))) {
		const id = v[0];
		return (typeof id === 'string') || (typeof id === 'number');
		// TODO check that all others are numbers or undefined
	}
	return false;
}

export function isModifiedTileSet(v: Tile | TileInLetter): v is ModifiedTileSet {
	return !isTileId(v) && !isModifiedTile(v) && (v as any).tiles;
}
