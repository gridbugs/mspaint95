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

function isPressing(node: Element): boolean {
	return node.classList.contains(pressing);
}

function clearPressing(node: Element) {
	node.classList.remove(pressing);
}

function setSelected(node: Element) {
	clearAll();
	node.classList.add(selected);
}

function isSelected(node: Element): boolean {
	return node.classList.contains(selected);
}

function getTool(node: HTMLElement): Tool.Tool {
	const tool = node.dataset.tool;
	if (tool === undefined) {
		throw new Error(`tool is undefined on ${node.id}`);
	} else {
		Tool.assertTool(tool);
		return tool;
	}
}

export function run(select: (tool: Tool.Tool) => void) {
	for (const node of allContainers) {
		const tool = getTool(node);
		node.addEventListener('mousedown', _ => {
			if (!isSelected(node)) {
				setPressing(node);
			}
		});
		node.addEventListener('mouseup', _ => {
			if (isPressing(node)) {
				setSelected(node);
				select(tool);
			}
		});
		node.addEventListener('mouseout', _ => {
			clearPressing(node);
		});
	}
}
