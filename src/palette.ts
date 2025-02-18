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

export default class Palette {
	static init(): Palette {
		const palette = new Palette();
		palette.sync();
		return palette;
	}

	private fg: Rgb.T = Rgb.fromHexRgbString('#000000');
	private bg: Rgb.T = Rgb.fromHexRgbString('#ffffff');
	private readonly colors: Rgb.T[] = defaultColors.map(s => Rgb.fromHexRgbString(s));
	private readonly elements: {
		fg: HTMLElement;
		bg: HTMLElement;
		colors: HTMLElement[];
	};

	private constructor() {
		const nColors = 28;
		if (this.colors.length !== nColors) {
			throw new Error('Unexpected number of colors');
		}

		this.elements = {
			fg: getHtmlElementById('paletteFg'),
			bg: getHtmlElementById('paletteBg'),
			colors: [],
		};
		for (let i = 0; i < nColors; i++) {
			const element = getHtmlElementById(`palette-${i}`);
			this.elements.colors.push(element);
			element.addEventListener('mousedown', event => {
				if (event.button === 0) {
					this.fg = this.colors[i];
					this.sync();
				} else if (event.button === 2) {
					this.bg = this.colors[i];
					this.sync();
				}
			});
		}
	}

	getFg(): Rgb.T {
		return this.fg;
	}

	getBg(): Rgb.T {
		return this.bg;
	}

	get(index: number): Rgb.T {
		return this.colors[index];
	}

	private sync() {
		this.elements.fg.style.backgroundColor = Rgb.toHexRgbString(this.fg);
		this.elements.bg.style.backgroundColor = Rgb.toHexRgbString(this.bg);
		for (let i = 0; i < this.colors.length; i++) {
			this.elements.colors[i].style.backgroundColor = Rgb.toHexRgbString(this.colors[i]);
		}
	}
}
