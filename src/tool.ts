import * as CursorClass from './cursor-class';

export const all = [
	'FreeFormSelect',
	'Select',
	'Eraser',
	'FillWithColor',
	'ColorPicker',
	'Magnifier',
	'Pencil',
	'Brush',
	'Airbrush',
	'Text',
	'Line',
	'Curve',
	'Rectangle',
	'Polygon',
	'Ellipse',
	'RoundedRectangle',
] as const;

export type T = typeof all[number];

export function isT(value: string): value is T {
	return all.includes(value as T);
}

export function assertT(value: string): asserts value is T {
	if (!isT(value)) {
		throw new Error(`Invalid tool: ${value}`);
	}
}

export function cursorClass(t: T): string {
	switch (t) {
		case 'Pencil': return CursorClass.pencil;
		default: return CursorClass.select;
	}
}
