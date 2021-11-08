import React from 'react';
import * as model from '../model/drop_down';

type WithUpdateSelf<T> = T & { updateSelf: (x: T) => void };

export function ShortcutText({ text }: model.ShortcutText): JSX.Element {
  return <>{ text }</>;
}

export function MenuItem({ text, selected, updateSelf }: WithUpdateSelf<model.MenuItem>): JSX.Element {
  function onMouseOver(): void {
    updateSelf({ text, selected: true });
  }
  function onMouseLeave(): void {
    updateSelf({ text, selected: false });
  }
  const className = selected ? 'menuItemSelected' : '';
  return <div onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} className={className}>
    { ShortcutText(text) }
  </div>;
}

export function Menu({ items, updateSelf }: WithUpdateSelf<model.Menu>): JSX.Element {
  return <ul>
    {
      items.map((item, i) => {
        function updateMenuItem(menuItem: model.MenuItem): void {
          updateSelf({
            items: items.set(i, menuItem),
          });
        }
        return <li key={ i }>{ MenuItem({ ...item, updateSelf: updateMenuItem }) }</li>;
      })
    }
  </ul>;
}

export function Button({ text }: model.Button): JSX.Element {
  return ShortcutText(text);
}

export function ButtonMenu({
  button, menu, menuVisible, updateSelf
}: WithUpdateSelf<model.ButtonMenu>): JSX.Element {
  function updateMenu(newMenu: model.Menu): void {
    updateSelf({ menu: newMenu, button, menuVisible });
  }
  return <div>
    { Button(button) }
    { menuVisible && Menu({ ...menu, updateSelf: updateMenu }) }
  </div>;
}

export function ButtonMenuStrip({ buttonMenus, updateSelf }: WithUpdateSelf<model.ButtonMenuStrip>): JSX.Element {
  return <ul>
    {
      buttonMenus.map((buttonMenu, i) => {
        function updateButtonMenu(newButtonMenu: model.ButtonMenu): void {
          updateSelf({
            buttonMenus: buttonMenus.set(i, newButtonMenu),
          });
        }
        return <li key={ i }>{ ButtonMenu({ ...buttonMenu, updateSelf: updateButtonMenu }) }</li>;
      })
    }
  </ul>;
}
