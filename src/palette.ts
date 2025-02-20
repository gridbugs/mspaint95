import * as Rgb from './rgb';

const defaultColors = [
	'#000000',
	'#808080',
	'#800000',
	'#808000',
	'#008000',
	'#008080',
	'#000080',
	'#800080',
	'#808040',
	'#004040',
	'#0080ff',
	'#004080',
	'#4000ff',
	'#804000',
	'#ffffff',
	'#c0c0c0',
	'#ff0000',
	'#ffff00',
	'#00ff00',
	'#00ffff',
	'#0000ff',
	'#ff00ff',
	'#ffff80',
	'#00ff80',
	'#80ffff',
	'#8080ff',
	'#ff0080',
	'#ff8040',
];

function getHtmlElementById(id: string): HTMLElement {
	const element = document.querySelector(`#${id}`);
	if (element === null) {
		throw new Error(`missing element #${id}`);
	}

	if (!(element instanceof HTMLElement)) {
		throw new TypeError(`#${id} is not an HTMLElement`);
	}

	return element;
}

export type PaletteOps = {
	fg: () => Rgb.Rgb;
	bg: () => Rgb.Rgb;
	color: (index: number) => Rgb.Rgb;
};

export function palette(): PaletteOps {
	const nColors = 28;
	const state = {
		fg: Rgb.fromHexRgbString('#000000'),
		bg: Rgb.fromHexRgbString('#ffffff'),
		colors: defaultColors.map(s => Rgb.fromHexRgbString(s)),
	};
	if (state.colors.length !== nColors) {
		throw new Error('Unexpected number of colors');
	}

	const elements = {
		fg: getHtmlElementById('paletteFg'),
		bg: getHtmlElementById('paletteBg'),
		colors: ([] as HTMLElement[]),
	};
	const sync = () => {
		elements.fg.style.backgroundColor = Rgb.toHexRgbString(state.fg);
		elements.bg.style.backgroundColor = Rgb.toHexRgbString(state.bg);
		for (let i = 0; i < nColors; i++) {
			elements.colors[i].style.backgroundColor = Rgb.toHexRgbString(state.colors[i]);
		}
	};

	for (let i = 0; i < nColors; i++) {
		const element = getHtmlElementById(`palette-${i}`);
		elements.colors.push(element);
		element.addEventListener('mousedown', event => {
			if (event.button === 0) {
				state.fg = state.colors[i];
				sync();
			} else if (event.button === 2) {
				state.bg = state.colors[i];
				sync();
			}
		});
	}

	sync();
	return {
		fg: () => state.fg,
		bg: () => state.bg,
		color: i => state.colors[i],
	};
}
