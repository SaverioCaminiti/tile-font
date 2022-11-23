import { TileFontDefinition } from './type';
import { sampleTileFont } from './fonts/SampleFont';


// This class collects all tile font definitions
export class TileFont {
	static enabled = window.customElements !== undefined;

	static fonts: { [name in string]: TileFontDefinition } = {};
	private static defaultFontName: string = '';

	static registerFont(font: string | TileFontDefinition, isDefault = false) {
		if (!TileFont.enabled) {
			console.error('<tile-font> cannot work because this browser does not support custom HTML elements.');
			return;
		}

		if (typeof font === 'string') {
			TileFont._loadFromUrl(font, isDefault);
		} else {
			TileFont._addFont(font, isDefault);
		}
	}

	static _loadFromUrl(url: string, isDefault: boolean) {
		console.info("Loading font", url, isDefault);
		// TODO: load json file, check structure and call _addFont()
	}

	static _addFont(font: TileFontDefinition, isDefault: boolean) {
		console.info("Adding tile font", font.name, font);
		TileFont.fonts[font.name] = font;
		if (isDefault || !TileFont.defaultFontName) {  // the first added one will be the default
			TileFont.defaultFontName = font.name;
		}
	}

	static getDefaultFont(): TileFontDefinition {
		return TileFont.fonts[TileFont.defaultFontName] || sampleTileFont;
	}

	static getFont(name: string): TileFontDefinition {
		// if the font is not available (maybe still loading) we should return a Promise
		return TileFont.fonts[name];
	}
}
