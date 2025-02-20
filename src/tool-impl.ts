import * as Vec2 from './vec2';
import type * as Rgb from './rgb';
import type * as Palette from './palette';
import * as Raster from './raster';
import type * as Tool from './tool';

export type ToolInterface = {
	currentMousePosition: () => Vec2.Vec2;
	canvasSize: () => Vec2.Vec2;
	isMouseDown: () => boolean;
	palette: () => Palette.PaletteOps;
	setPixel: (v: Vec2.Vec2, rgb: Rgb.Rgb) => void;
};

export type ToolEventHandlers = {
	mouseMove: () => void;
	mouseDown: () => void;
	mouseUp: () => void;
};

export function unimplemented(_iface: ToolInterface): ToolEventHandlers {
	return {
		mouseMove() { // Unimplemented
		},
		mouseDown() { // Unimplemented
		},
		mouseUp() { // Unimplemented
		},
	};
}

export function pencil(iface: ToolInterface): ToolEventHandlers {
	let previousMousePosition: Vec2.Vec2 | undefined;
	const getPreviousMousePosition = () => {
		if (previousMousePosition === undefined) {
			return iface.currentMousePosition();
		}

		return previousMousePosition;
	};

	const isEitherMousePositionOverCanvas = () => Vec2.contains(iface.currentMousePosition(), iface.canvasSize())
			|| (Vec2.contains(getPreviousMousePosition(), iface.canvasSize()));

	return {
		mouseMove() {
			if (iface.isMouseDown() && isEitherMousePositionOverCanvas()) {
				for (const v of Raster.segment2(iface.currentMousePosition(), getPreviousMousePosition())) {
					iface.setPixel(v, iface.palette().fg());
				}
			}

			previousMousePosition = iface.currentMousePosition();
		},
		mouseDown() {
			iface.setPixel(iface.currentMousePosition(), iface.palette().fg());
			previousMousePosition = iface.currentMousePosition();
		},
		mouseUp() { // Do nothing
		},
	};
}

export function fromTool(tool: Tool.Tool): (iface: ToolInterface) => ToolEventHandlers {
	switch (tool) {
		case 'FreeFormSelect': { return unimplemented;
		}

		case 'Select': { return unimplemented;
		}

		case 'Eraser': { return unimplemented;
		}

		case 'FillWithColor': { return unimplemented;
		}

		case 'ColorPicker': { return unimplemented;
		}

		case 'Magnifier': { return unimplemented;
		}

		case 'Pencil': { return pencil;
		}

		case 'Brush': { return unimplemented;
		}

		case 'Airbrush': { return unimplemented;
		}

		case 'Text': { return unimplemented;
		}

		case 'Line': { return unimplemented;
		}

		case 'Curve': { return unimplemented;
		}

		case 'Rectangle': { return unimplemented;
		}

		case 'Polygon': { return unimplemented;
		}

		case 'Ellipse': { return unimplemented;
		}

		case 'RoundedRectangle': { return unimplemented;
		}
	}
}

