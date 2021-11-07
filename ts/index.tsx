import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, Action } from 'redux';
import { Provider, useSelector } from 'react-redux';
import { List } from 'immutable';
import { some, none } from 'fp-ts/Option';
import * as model from './model';
import * as controller from './controller';
import { shortcutText } from './model';
import { ButtonMenuStrip } from './view';

const BUTTON_MENU_STRIP: model.ButtonMenuStrip = {
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
        selection: none,
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
        selection: some(2),
      },
    },
  ])
};

type UiState = model.ButtonMenuStrip;

interface RootState {
  uiState: UiState,
}

const ROOT_STATE_DEFAULT = {
  uiState: BUTTON_MENU_STRIP,
};

function reducer(state: RootState = ROOT_STATE_DEFAULT, action: Action): RootState {
  return { ...state };
}

const store = createStore(reducer);

function App(): JSX.Element {
  const { uiState } = useSelector((state: RootState) => state);
  return <>
    { ButtonMenuStrip(uiState) }
  </>;
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
