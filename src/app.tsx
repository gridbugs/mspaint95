import {
  h, Fragment, Component, JSX
} from 'preact';
/** @jsx h */

import * as m from './model';
import * as v from './view';

interface RootState {
  leftPanel: m.LeftPanel,
  buttonMenuStrip: m.ButtonMenuStrip,
  colorPicker: m.ColorPicker,

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
    const updateUiState = (container: m.Container): void => {
      this.setState(container);
    };
    const setDropDownMenu = (buttonMenuStrip: m.ButtonMenuStrip): void => {
      this.setState({ buttonMenuStrip });
    };
    return <>
      { v.Container({ model: this.state, update: updateUiState }, setDropDownMenu) }
    </>;
  }
}
