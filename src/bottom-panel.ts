export function setHelp(value: string) {
	const element = document.querySelector('#helpText');
	if (element === null) {
		throw new Error('Missing element #helpText');
	}

	element.innerHTML = value;
}

export function clearHelp() {
	setHelp('');
}

export function defaultHelp() {
	setHelp('For Help, click Help Topics on the Help Menu.');
}
