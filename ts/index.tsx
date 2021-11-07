import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, Action } from 'redux';
import { Provider } from 'react-redux';
import { List } from 'immutable';
import * as data from './data';
import { shortcutText } from './data';
import { ButtonMenuStrip } from './components';

const BUTTON_MENU_STRIP: data.ButtonMenuStrip = {
  buttonMenus: List([
    {
      button: { text: shortcutText('File'), state: 'Normal' },
      menuVisible: true,
      menu: {
        items: List([
          { text: shortcutText('New'), selected: false },
          { text: shortcutText('Open'), selected: false },
          { text: shortcutText('Save'), selected: false },
        ]),
      },
    },
    {
      button: { text: shortcutText('Edit'), state: 'Normal' },
      menuVisible: true,
      menu: {
        items: List([
          { text: shortcutText('Undo'), selected: false },
          { text: shortcutText('Repeat'), selected: false },
          { text: shortcutText('Cut'), selected: true },
          { text: shortcutText('Copy'), selected: false },
          { text: shortcutText('Paste'), selected: false },
        ]),
      },
    },
  ])
};

type UiState = data.ButtonMenuStrip;
const UiStateInitial = BUTTON_MENU_STRIP;

function reducer(state: UiState = UiStateInitial, action: Action): UiState {
  console.log(action);
  return state;
}

const store = createStore(reducer);

function App({ uiState }: { uiState: UiState }): JSX.Element {
  return <>
    { ButtonMenuStrip(uiState) }
  </>;
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App uiState={store.getState()} />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
