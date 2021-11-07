import React from 'react';
import { useDispatch } from 'react-redux';
import * as option from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';
import * as model from '../model/drop_down';
import './style.css';

type Idx<T> = T & { index: number };

export function ShortcutText({ text }: model.ShortcutText): JSX.Element {
  return <>{ text }</>;
}

export function MenuItem({
  text, selected, menuIndex, itemIndex
}: model.MenuItem & { selected: boolean, menuIndex: number, itemIndex: number }): JSX.Element {
  const dispatch = useDispatch();
  function onMouseOver(): void {
    dispatch({ message: () => text.text, type: 'foo' });
  }
  const className = selected ? 'menuItemSelected' : '';
  return <div onMouseOver={onMouseOver} className={className}>
    { ShortcutText(text) }
  </div>;
}

export function Menu({ items, selection, index }: Idx<model.Menu>): JSX.Element {
  return <ul>
    {
      items.map((item, i) => {
        const selected = pipe(
          selection,
          option.match(
            () => false,
            (s) => s === i,
          ),
        );
        return <li key={ i }>{ MenuItem({
          ...item, selected, menuIndex: index, itemIndex: i
        }) }</li>;
      })
    }
  </ul>;
}

export function Button({ text }: model.Button): JSX.Element {
  return ShortcutText(text);
}

export function ButtonMenu({
  button, menu, menuVisible, index
}: Idx<model.ButtonMenu>): JSX.Element {
  return <div>
    { Button(button) }
    { menuVisible && Menu({ ...menu, index }) }
  </div>;
}

export function ButtonMenuStrip({ buttonMenus }: model.ButtonMenuStrip): JSX.Element {
  return <ul>
    {
      buttonMenus.map((buttonMenu, i) => <li key={ i }>{ ButtonMenu({ ...buttonMenu, index: i }) }</li>)
    }
  </ul>;
}
