import './style.scss';
import * as LeftPanelButtons from './left-panel-buttons';
import * as State from './state';

export function main() {
	LeftPanelButtons.init();
	console.log(State.globalState);
}

main();
