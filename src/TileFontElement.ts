import { TileFont } from './TileFont';
import { TileFontDefinition } from './type';
import { renderText } from './svgBuildUtils';

export interface TileFontElementAttributes {
	text?: string;
	font?: string;
	'shadow-dom-style'?: string;
}

// attributes that should not be passed from the <tile-font> tag to the inner <svg> tag
const renderAttributes = ['text', 'font', 'scale'];
const styleAttributes = ['shadow-dom-style'];
const filteredAttributes = [...renderAttributes, ...styleAttributes];

export class TileFontElement extends HTMLElement {
	private readonly svg: SVGElement;
	private font?: TileFontDefinition;
	private readonly styleTag: HTMLStyleElement;

	// @ts-ignore
	static get observedAttributes() {
		return [...renderAttributes, ...styleAttributes];
	}

	constructor() {
		super();

		this.attachShadow({mode: 'open'});
		this.styleTag = document.createElement('style');
		this.shadowRoot!.appendChild(this.styleTag);
		this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		this.shadowRoot!.appendChild(this.svg);
	}

	connectedCallback() {
		if (this.innerHTML) {
			this.render();
		} else {
			setTimeout(() => this.render());
		}
	}

	attributeChangedCallback(name: string) {
		if (renderAttributes.includes(name)) {
			this.render();
		} else if (styleAttributes.includes(name)) {
			this.setDomStyle();
		} else {
			this.cloneAttributes();
		}
	}

	private setDomStyle() {
		this.styleTag.textContent = this.getAttribute('shadow-dom-style') || '';
	}

	private cloneAttributes() {
		// pass (almost) all attributes of the external tag to the svg tag
		for (let i = 0; i < this.attributes.length; i++) {
			const attr = this.attributes.item(i);
			if (attr && !filteredAttributes.includes(attr.name)) {
				this.svg.setAttributeNS(null, attr.name, attr.value);
			}
		}
	}

	private render() {
		this.cloneAttributes();

		const fontName = this.getAttribute('font') || '';
		if (!this.font || this.font.name !== fontName) {
			this.font = fontName ? TileFont.getFont(fontName) : TileFont.getDefaultFont();
		}

		const text = this.getAttribute('text') || this.innerHTML;
		const scale = this.getAttribute('scale');

		if (this.font) {
			const [code, w, h] = renderText(this.font, text, scale);

			this.svg.setAttributeNS(null, "viewBox", "0 0 " + w + " " + h);
			this.svg.setAttributeNS(null, "width", this.getAttribute('width') || w + 'px');

			this.svg.innerHTML = code;
		} else {
			// wait, maybe the font is still being loaded
			// getFont should return a promise than
			this.svg.setAttributeNS(null, "viewBox", "0 0 100 20");
			this.svg.setAttributeNS(null, "width", this.getAttribute('width') || '100px');

			this.svg.innerHTML = `<text x="0" y="15" font-size="12px">Loading...</text>`;
		}
	}

}
