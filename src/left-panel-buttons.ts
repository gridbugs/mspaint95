import * as Tool from './tool';

const allContainers: HTMLElement[] = Array.from(document.querySelectorAll('.leftPanelButtonContainer'));

const selected = 'leftPanelButtonContainerSelected';
const pressing = 'leftPanelButtonContainerPressing';

function clear(node: Element) {
	node.classList.remove(selected, pressing);
}

function clearAll() {
	for (const node of allContainers) {
		clear(node);
	}
}

function setPressing(node: Element) {
	node.classList.remove(selected);
	node.classList.add(pressing);
}

function clearPressing(node: Element) {
	node.classList.remove(pressing);
}

function setSelected(node: Element) {
	clearAll();
	node.classList.add(selected);
}

function getTool(node: HTMLElement): Tool.T {
	const tool = node.dataset.tool;
	if (tool === undefined) {
		throw new Error(`tool is undefined on ${node.id}`);
	} else {
		Tool.assertT(tool);
		return tool;
	}
}

export function run(select: (tool: Tool.T) => void) {
	for (const node of allContainers) {
		const tool = getTool(node);
		node.addEventListener('mousedown', _ => {
			setPressing(node);
		});
		node.addEventListener('mouseup', _ => {
			setSelected(node);
			select(tool);
		});
		node.addEventListener('mouseout', _ => {
			clearPressing(node);
		});
	}
}
