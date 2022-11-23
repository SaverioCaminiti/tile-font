import 'react-app-polyfill/ie11';
import * as React from 'react';
import { useEffect, useState } from 'react';
import * as ReactDOM from 'react-dom';

import {
	azulejoBoldTileFont,
	azulejoLightTileFont,
	azulejoTileFont,
	brailleTileFont,
	sampleTileFont,
	TileFont,
} from '../.';


TileFont.registerFont(sampleTileFont);
TileFont.registerFont(brailleTileFont);
TileFont.registerFont(azulejoTileFont);
TileFont.registerFont(azulejoLightTileFont);
TileFont.registerFont(azulejoBoldTileFont);

const colors = ['green', 'red'];

const debugCss = `
.red { fill: red }
.line { outline: solid 3px blue; outline-offset: -3px; }
.letter { outline: solid 2px green; outline-offset: -2px; }
.tile { outline: solid 1px red; outline-offset: -1px; }
`;

const debug = false;

const App = () => {
	const [cnt, setCnt] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCnt(cnt => cnt + 1);
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	// const contentBraille = "abcdefghij\nklmnopqrst\nuvwxyz\n1234567890\n?!.- ,;:/* <<>>()'";
	const contentAzul = "ABCDEFGHIJKLMNOPQRSTUVWXYZ\n" +
		"abcdefghijklmnopqrstuvwxyz\n" +
		"0123456789 flfifffflffi^M^Wwwwww\n" +
		".,:;!?_'\"^+-*/=\\()[]{}%#@&<>▢:)🙂:(\n" +
		"Saverio, Simona, Giosue' e Anna Sofia Caminiti\n" +
		"saverio.caminiti@gmail.com\n" +
		"https://www.google.com/?h=a+b";

	const styleAzul = (debug ? debugCss : '') +
		`.inner-line { fill: #95D4E8; }
		.outer-shape { fill: black; }`;

	return (<div>
		<tile-font scale="0.2">Sample tile font</tile-font>
		<tile-font scale="0.2">ABCDEFGHIJKLMNOPQRSTUVWXYZ</tile-font>
		<br/>
		<tile-font text={contentAzul} fill="#6FB8CF" font="Azulejo"
				   scale="0.1" shadow-dom-style={styleAzul}/>
		<br/>
		<tile-font fill="#6FB8CF" font="Azulejo"
				   scale="0.2" shadow-dom-style={styleAzul}>Azulejo</tile-font>
		<br/>
		<tile-font fill="#6FB8CF" font="Azulejo Light"
				   scale="0.2" shadow-dom-style={styleAzul}>Azulejo Light</tile-font>
		<br/>
		<tile-font fill="#6FB8CF" font="Azulejo Bold"
				   scale="0.2" shadow-dom-style={styleAzul}>Azulejo Bold</tile-font>
		<br/>
		<tile-font text={`cnt = ${cnt}`} fill="#6FB8CF" font="Azulejo Light"
				   scale="0.2" shadow-dom-style={styleAzul}></tile-font>

		<h1 style={{color: colors[cnt % 2], fill: colors[cnt % 2]}}>
			BRAILLE <br/>
			<tile-font font="Braille" shadow-dom-style={debug ? debugCss : ''}>^anna ^sofia</tile-font>
		</h1>
	</div>);
};

ReactDOM.render(<App/>, document.getElementById('root'));
