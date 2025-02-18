export type T = {
	r: number;
	g: number;
	b: number;
};

export function copyToImageDataArray(
	rgb: T,
	imageDataArray: Uint8ClampedArray,
) {
	imageDataArray[0] = rgb.r;
	imageDataArray[1] = rgb.g;
	imageDataArray[2] = rgb.b;
	imageDataArray[3] = 255;
}

export function fromHexRgbString(hexString: string): T {
	if (!hexString.startsWith('#') || hexString.length !== 7) {
		throw new Error('Doesn not look like a hex rgb string');
	}

	const r = Number.parseInt(hexString.slice(1, 3), 16);
	const g = Number.parseInt(hexString.slice(3, 5), 16);
	const b = Number.parseInt(hexString.slice(5, 7), 16);
	return {r, g, b};
}

function numberToHex(x: number): string {
	return x.toString(16).padStart(2, '0');
}

export function toHexRgbString(rgb: T): string {
	return `#${numberToHex(rgb.r)}${numberToHex(rgb.g)}${numberToHex(rgb.b)}`;
}
