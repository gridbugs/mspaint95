import React from 'react';
import ReactDOM from 'react-dom';

import { List } from 'immutable';
import * as model from './model';
import { shortcutText } from './model';
import { App } from './App';

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
      },
    },
    {
      button: { text: shortcutText('Edit'), state: 'Normal' },
      menuVisible: true,
      menu: {
        items: List([
          { text: shortcutText('Undo'), selected: false },
          { text: shortcutText('Repeat'), selected: false },
          { text: shortcutText('Cut'), selected: false },
          { text: shortcutText('Copy'), selected: false },
          { text: shortcutText('Paste'), selected: false },
        ]),
      },
    },
  ])
};

const ROOT_STATE_DEFAULT = {
  uiState: BUTTON_MENU_STRIP,
};

ReactDOM.render(
  <React.StrictMode>
    <App initialState={ROOT_STATE_DEFAULT} />
  </React.StrictMode>,
  document.getElementById('root'),
);