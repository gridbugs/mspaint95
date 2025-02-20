import * as Tool from './tool';
import * as CursorClass from './cursor-class';
import * as Palette from './palette';
import * as Raster from './raster';
import * as Vec2 from './vec2';
import * as Rgb from './rgb';

function mouseEventVec2(event: MouseEvent): Vec2.Vec2 {
	return Vec2.vec2(event.layerX, event.layerY);
}

export type DrawCanvasOps = {
	clear: () => void;
	setTool: (tool: Tool.Tool) => void;
};

export function drawCanvas(): DrawCanvasOps {
	const element = document.querySelector('.drawCanvas');
	if (!(element instanceof HTMLCanvasElement)) {
		throw new TypeError('Can\'t find draw canvas');
	}

	const context = element.getContext('2d');
	if (context === null) {
		throw new Error('Failed to initialize canvas context');
	}

	const palette = Palette.palette();
	const imageData1Pixel = context.createImageData(1, 1);

	const clear = () => {
		context.fillStyle = 'white';
		context.fillRect(0, 0, element.width, element.height);
		context.fill();
	};

	const setPixel = (v: Vec2.Vec2, rgb: Rgb.Rgb) => {
		Rgb.copyToImageDataArray(rgb, imageData1Pixel.data);
		context.putImageData(imageData1Pixel, v.x, v.y);
	};

	const setCursorClassForTool = (tool: Tool.Tool) => {
		for (const class_ of CursorClass.all) {
			element.classList.remove(class_);
		}
		element.classList.add(Tool.cursorClass(tool));
	};

	let tool: Tool.Tool = 'Pencil';

	const setTool = (tool_: Tool.Tool) => {
		tool = tool_;
		setCursorClassForTool(tool);
	};

	let currentMouseVec2 = Vec2.vec2(0, 0);
	let mouseDown = false;
	element.addEventListener('mousedown', event => {
		currentMouseVec2 = mouseEventVec2(event);
		mouseDown = true;
		setPixel(currentMouseVec2, palette.fg());
	});
	element.addEventListener('mouseup', _ => {
		mouseDown = false;
	});
	element.addEventListener('mousemove', event => {
		if (mouseDown) {
			const v = mouseEventVec2(event);
			for (const v_ of Raster.segment2(currentMouseVec2, v)) {
				setPixel(v_, palette.fg());
			}

			currentMouseVec2 = v;
		}
	});
	element.addEventListener('mouseout', event => {
		if (mouseDown) {
			const v = mouseEventVec2(event);
			for (const v_ of Raster.segment2(currentMouseVec2, v)) {
				setPixel(v_, palette.fg());
			}

			currentMouseVec2 = v;
		}

		mouseDown = false;
	});

	clear();

	return { clear, setTool };
}
