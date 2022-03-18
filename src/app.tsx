import {
  h, Fragment, Component, JSX
} from 'preact';
/** @jsx h */

import * as m from './model';
import * as v from './view';

type UiState = m.ButtonMenuStrip;

interface RootState {
  uiState: UiState,
}

interface RootProps {
  initialState: RootState,
}

export class App extends Component<RootProps, RootState> {
  constructor(props: RootProps) {
    super(props);
    this.state = props.initialState;
  }

  render(): JSX.Element {
    const updateButtonMenuStrip = (uiState: UiState): void => {
      this.setState({
        uiState
      });
    };
    const { uiState } = this.state;
    return <>
      { v.Container({ model: uiState, update: updateButtonMenuStrip }) }
    </>;
  }
}
