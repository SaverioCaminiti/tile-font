import { TileFontElement, TileFontElementAttributes } from './TileFontElement';
import { TileFont } from './TileFont';
import { brailleTileFont } from './fonts/Braille';
import { sampleTileFont } from './fonts/SampleFont';
import { azulejoTileFont } from './fonts/Azulejo';
import { azulejoLightTileFont } from './fonts/AzulejoLight';
import { azulejoBoldTileFont } from './fonts/AzulejoBold';

declare global {
	namespace JSX {
		interface TileFontHTMLAttributes<T> extends React.SVGAttributes<T>, TileFontElementAttributes {
		}

		interface IntrinsicElements {
			"tile-font": React.DetailedHTMLProps<TileFontHTMLAttributes<TileFontElement>, TileFontElement>; //
		}
	}
}

if (window.customElements !== undefined) {
	if (!customElements.get('tile-font')) {
		customElements.define('tile-font', TileFontElement);
	}
}

export {
	TileFontElement,
	TileFontElementAttributes,
	TileFont,
	sampleTileFont,
	brailleTileFont,
	azulejoTileFont,
	azulejoLightTileFont,
	azulejoBoldTileFont,
}
