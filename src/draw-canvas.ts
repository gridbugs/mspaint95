import * as Tool from './tool';
import * as CursorClass from './cursor-class';
import Palette from './palette';
import * as Raster from './raster';
import Vec2 from './vec2';
import * as Rgb from './rgb';

function mouseEventVec2(event: MouseEvent): Vec2 {
	return new Vec2(event.layerX, event.layerY);
}

export default class DrawCanvas {
	static init(): DrawCanvas {
		const drawCanvasElement = document.querySelector('.drawCanvas');
		if (!(drawCanvasElement instanceof HTMLCanvasElement)) {
			throw new TypeError('Can\'t find draw canvas');
		}

		const drawCanvas = new DrawCanvas(drawCanvasElement, Palette.init());
		drawCanvas.clear();
		let currentMouseVec2 = new Vec2(0, 0);
		let mouseDown = false;
		drawCanvasElement.addEventListener('mousedown', event => {
			currentMouseVec2 = mouseEventVec2(event);
			mouseDown = true;
			drawCanvas.setPixel(currentMouseVec2, drawCanvas.palette.getFg());
		});
		drawCanvasElement.addEventListener('mouseup', _ => {
			mouseDown = false;
		});
		drawCanvasElement.addEventListener('mousemove', event => {
			if (mouseDown) {
				const v = mouseEventVec2(event);
				for (const v_ of Raster.segment2(currentMouseVec2, v)) {
					drawCanvas.setPixel(v_, drawCanvas.palette.getFg());
				}

				currentMouseVec2 = v;
			}
		});
		drawCanvasElement.addEventListener('mouseout', event => {
			if (mouseDown) {
				const v = mouseEventVec2(event);
				for (const v_ of Raster.segment2(currentMouseVec2, v)) {
					drawCanvas.setPixel(v_, drawCanvas.palette.getFg());
				}

				currentMouseVec2 = v;
			}

			mouseDown = false;
		});
		return drawCanvas;
	}

	element: HTMLCanvasElement;
	context: CanvasRenderingContext2D;
	tool: Tool.T;
	palette: Palette;
	imageData1Pixel: ImageData;

	constructor(element: HTMLCanvasElement, palette: Palette) {
		const context = element.getContext('2d');
		if (context === null) {
			throw new Error('Failed to initialize canvas context');
		}

		this.element = element;
		this.context = context;
		const initialTool = 'Pencil';
		this.tool = initialTool;
		this.setCursorClassForTool(initialTool);
		this.palette = palette;
		this.imageData1Pixel = context.createImageData(1, 1);
	}

	clear() {
		this.context.fillStyle = 'white';
		this.context.fillRect(0, 0, this.element.width, this.element.height);
		this.context.fill();
	}

	clearCursorClass() {
		for (const class_ of CursorClass.all) {
			this.element.classList.remove(class_);
		}
	}

	setCursorClassForTool(tool: Tool.T) {
		this.clearCursorClass();
		this.element.classList.add(Tool.cursorClass(tool));
	}

	setTool(tool: Tool.T) {
		this.tool = tool;
		this.setCursorClassForTool(tool);
	}

	setPixel(v: Vec2, rgb: Rgb.T) {
		Rgb.copyToImageDataArray(rgb, this.imageData1Pixel.data);
		this.context.putImageData(this.imageData1Pixel, v.x, v.y);
	}
}
