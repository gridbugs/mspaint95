import * as Tool from './tool';
import * as CursorClass from './cursor-class';
import Palette from './palette';

export default class DrawCanvas {
	element: HTMLCanvasElement;
	context: CanvasRenderingContext2D;
	tool: Tool.T;
	palette: Palette;

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

	static init(): DrawCanvas {
		const drawCanvasElement = document.querySelector('.drawCanvas');
		if (!(drawCanvasElement instanceof HTMLCanvasElement)) {
			throw new TypeError('Can\'t find draw canvas');
		}
		const drawCanvas = new DrawCanvas(drawCanvasElement, Palette.init());
		drawCanvas.clear();
		return drawCanvas;
	}
}
