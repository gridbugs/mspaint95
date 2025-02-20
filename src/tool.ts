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

export type Tool = typeof all[number];

export function isTool(value: string): value is Tool {
	return all.includes(value as Tool);
}

export function assertTool(value: string): asserts value is Tool {
	if (!isTool(value)) {
		throw new Error(`Invalid tool: ${value}`);
	}
}

export function cursorClass(t: Tool): string {
	switch (t) {
		case 'Pencil': { return CursorClass.pencil;
		}

		default: { return CursorClass.select;
		}
	}
}

export function helpText(t: Tool): string {
	switch (t) {
		case 'FreeFormSelect': { return 'Selects a free-form part of the picture to move, copy, or edit.';
		}

		case 'Select': { return 'Selects a rectangular part of the picture to move, copy, or edit.';
		}

		case 'Eraser': { return 'Erases a portion of the picture, using the selected eraser shape.';
		}

		case 'FillWithColor': { return 'Fills an area with the current drawing color.';
		}

		case 'ColorPicker': { return 'Picks a color from the picture for drawing.';
		}

		case 'Magnifier': { return 'Changes the magnification.';
		}

		case 'Pencil': { return 'Draws a free-form line one pixel wide.';
		}

		case 'Brush': { return 'Draws using a brush with the selected shape and size.';
		}

		case 'Airbrush': { return 'Draws using an airbrush of the selected size.';
		}

		case 'Text': { return 'Inserts text into the picture.';
		}

		case 'Line': { return 'Draws a straight line with the selected line width.';
		}

		case 'Curve': { return 'Draws a curved line with the selected line width.';
		}

		case 'Rectangle': { return 'Draws a rectangle with the selected fill style.';
		}

		case 'Polygon': { return 'Draws a polygon with the selected fill style.';
		}

		case 'Ellipse': { return 'Draws an ellipse with the selected fill style.';
		}

		case 'RoundedRectangle': { return 'Draws a rounded rectangle with the selected fill style.';
		}
	}
}

