import { h, Fragment, Component } from 'preact';
/** @jsx h */

import * as model from './model';
import { ButtonMenuStrip } from './view';

type UiState = model.ButtonMenuStrip;

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
      { ButtonMenuStrip({ ...uiState, updateSelf: updateButtonMenuStrip }) }
    </>;
  }
}
