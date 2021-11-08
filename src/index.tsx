import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, AnyAction } from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { List } from 'immutable';
import * as model from './model';
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

type UiState = model.ButtonMenuStrip;

interface RootState {
  uiState: UiState,
}

const ROOT_STATE_DEFAULT = {
  uiState: BUTTON_MENU_STRIP,
};

interface SetUiStateAction extends AnyAction {
  type: 'set-ui-state',
  uiState: UiState,
}

function matchSetUiStateAction(action: AnyAction): action is SetUiStateAction {
  return action.type === 'set-ui-state';
}

function reducer(state: RootState = ROOT_STATE_DEFAULT, action: AnyAction): RootState {
  if (matchSetUiStateAction(action)) {
    return { ...state, uiState: action.uiState };
  }
  return state;
}

const store = createStore(reducer);

function App(): JSX.Element {
  const { uiState } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  function updateButtonMenuStrip(buttonMenuStrip: model.ButtonMenuStrip): void {
    dispatch({
      type: 'set-ui-state',
      uiState: buttonMenuStrip,
    });
  }
  return <>
    { ButtonMenuStrip({ ...uiState, updateSelf: updateButtonMenuStrip }) }
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
