import type * as Tool from './tool';

type State = {
	currentTool: Tool.T | undefined;
};

export const globalState: State = {
	currentTool: undefined,
};
