import './style.scss';
import * as LeftPanelButtons from './left-panel-buttons';
import * as BottomPanel from './bottom-panel';
import * as DrawCanvas from './draw-canvas';
import * as Tool from './tool';

function preventContextMenuOnRightClick() {
	document.addEventListener('contextmenu', event => {
		event.preventDefault();
	});
}

export function main() {
	preventContextMenuOnRightClick();
	BottomPanel.defaultHelp();
	const drawCanvas = DrawCanvas.drawCanvas();
	LeftPanelButtons.run(tool => {
		BottomPanel.setHelp(Tool.helpText(tool));
		drawCanvas.setTool(tool);
	});
}

main();
