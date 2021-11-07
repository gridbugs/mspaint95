import React from 'react';
import { useDispatch } from 'react-redux';
import * as data from '../data/drop_down';

export function ShortcutText({ text }: data.ShortcutText): JSX.Element {
  return <>{ text }</>;
}

export function MenuItem({ text, selected }: data.MenuItem): JSX.Element {
  const dispatch = useDispatch();
  function onMouseOver(): void {
    dispatch({ message: () => text.text, type: 'foo' });
  }
  const className = selected ? 'menuItemSelected' : '';
  return <div onMouseOver={onMouseOver} className={className}>
    { ShortcutText(text) }
  </div>;
}

export function Menu({ items }: data.Menu): JSX.Element {
  return <ul>
    { items.map((item, i) => <li key={ i }>{ MenuItem(item) }</li>) }
  </ul>;
}

export function Button({ text }: data.Button): JSX.Element {
  return ShortcutText(text);
}

export function ButtonMenu({ button, menu, menuVisible }: data.ButtonMenu): JSX.Element {
  return <div>
    { Button(button) }
    { menuVisible && Menu(menu) }
  </div>;
}

export function ButtonMenuStrip({ buttonMenus }: data.ButtonMenuStrip): JSX.Element {
  return <ul>
    { buttonMenus.map((buttonMenu, i) => <li key={ i }>{ ButtonMenu(buttonMenu) }</li>) }
  </ul>;
}
