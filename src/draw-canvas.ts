import * as Tool from './tool';
import * as ToolImpl from './tool-impl';
import * as CursorClass from './cursor-class';
import * as Palette from './palette';
import * as Vec2 from './vec2';
import * as Rgb from './rgb';

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

	let mousePositionRelativeToCanvas: Vec2.Vec2 = Vec2.vec2(0, 0);
	let canvasSize = Vec2.vec2(0, 0);
	let mouseDown = false;

	const updateMousePosition = (event: MouseEvent) => {
		const canvasBoundingRect = element.getBoundingClientRect();
		mousePositionRelativeToCanvas = {
			x: event.pageX - canvasBoundingRect.x,
			y: event.pageY - canvasBoundingRect.y,
		};
		canvasSize = {
			x: canvasBoundingRect.width,
			y: canvasBoundingRect.height,
		};
	};

	const toolInterface: ToolImpl.ToolInterface = {
		currentMousePosition: () => mousePositionRelativeToCanvas,
		canvasSize: () => canvasSize,
		isMouseDown: () => mouseDown,
		palette: () => palette,
		setPixel,
	};

	let toolEventHandlers = ToolImpl.pencil(toolInterface);
	const setTool = (tool_: Tool.Tool) => {
		tool = tool_;
		setCursorClassForTool(tool);
		toolEventHandlers = ToolImpl.fromTool(tool)(toolInterface);
	};

	// The mousemove listener is registered to the document so the mouse can be
	// tracked when it leaves the canvas. This allows tools such as the Pencil
	// to draw lines that leave the canvas and then re-enter the canvas.
	document.addEventListener('mousemove', event => {
		updateMousePosition(event);
		toolEventHandlers.mouseMove();
	});

	// The mousedown listener is only registered to the canvas as mouse presses
	// off the canvas have no bearing on drawing.
	element.addEventListener('mousedown', event => {
		updateMousePosition(event);
		mouseDown = true;
		toolEventHandlers.mouseDown();
	});

	// The mouseup listener is registered to the document to handle the case
	// where a tool is dragged off the canvas before the mouse is released.
	document.addEventListener('mouseup', _ => {
		mouseDown = false;
		toolEventHandlers.mouseUp();
	});

	clear();

	return {clear, setTool};
}
