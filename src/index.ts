import './style.scss';
import * as LeftPanelButtons from './left-panel-buttons';
import DrawCanvas from './draw-canvas';

export function main() {
	const drawCanvas = DrawCanvas.init();
	LeftPanelButtons.run((tool) => {
		drawCanvas.setTool(tool);
	});
}

main();
