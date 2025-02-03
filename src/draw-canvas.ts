import * as Tool from './tool';
import * as CursorClass from './cursor-class';

export default class DrawCanvas {
	element: HTMLCanvasElement;
	context: CanvasRenderingContext2D;
	tool: Tool.T;

	constructor(element: HTMLCanvasElement) {
		const context = element.getContext('2d');
		if (context === null) {
			throw new Error('Failed to initialize canvas context');
		}
		this.element = element;
		this.context = context;
		const initialTool = 'Pencil';
		this.tool = initialTool; 
		this.setCursorClassForTool(initialTool);
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
		const drawCanvas = new DrawCanvas(drawCanvasElement);
		drawCanvas.clear();
		return drawCanvas;
	}
}
