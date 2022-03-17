import { h, Fragment, JSX } from 'preact';
/** @jsx h */

import * as m from '../model/drop_down';
import * as c from '../controller/drop_down';

type WithUpdateSelf<T> = T & { updateSelf: (x: T) => void };

export function ShortcutText({ text }: m.ShortcutText): JSX.Element {
  return <>{ text }</>;
}

export function MenuItem({ text, selected, updateSelf }: WithUpdateSelf<m.MenuItem>): JSX.Element {
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

export function Menu({ items, updateSelf }: WithUpdateSelf<m.Menu>): JSX.Element {
  return <ul className='menu'>
    {
      items.map((item, i) => {
        function updateMenuItem(menuItem: m.MenuItem): void {
          updateSelf({
            items: items.set(i, menuItem),
          });
        }
        return <li key={ i }>{ MenuItem({ ...item, updateSelf: updateMenuItem }) }</li>;
      }).toArray()
    }
  </ul>;
}

export function Button({ text, onClick }: m.Button & { onClick: () => void}): JSX.Element {
  return <div className='button' onClick={onClick}>
    {ShortcutText(text)}
  </div>;
}

export function ButtonMenu({
  button, menu, menuVisible, updateSelf
}: WithUpdateSelf<m.ButtonMenu>, index: number, controller: c.ButtonMenuStrip): JSX.Element {
  function updateMenu(newMenu: m.Menu): void {
    updateSelf({ menu: newMenu, button, menuVisible });
  }
  function onMouseOver(): void {
    if (controller.model.active) {
      controller.displayMenu(index);
    }
  }
  function onClick(): void {
    if (controller.model.active) {
      controller.deactivate();
    } else {
      controller.activate(index);
    }
  }
  return <div className='buttonMenu' onMouseOver={onMouseOver}>
    { Button({ ...button, onClick }) }
    {
      menuVisible && Menu({ ...menu, updateSelf: updateMenu })
    }
  </div>;
}

export function ButtonMenuStrip({
  active, buttonMenus, updateSelf
}: WithUpdateSelf<m.ButtonMenuStrip>): JSX.Element {
  const controller = new c.ButtonMenuStrip({ active, buttonMenus }, updateSelf);
  function onClick(): void {
    console.log('a');
  }
  return <div className='buttonMenuStrip' onClick={onClick}>
    {
      buttonMenus.map((buttonMenu, i) => {
        function updateButtonMenu(newButtonMenu: m.ButtonMenu): void {
          updateSelf({
            buttonMenus: buttonMenus.set(i, newButtonMenu),
            active,
          });
        }
        return <div key={ i }>
          {
            ButtonMenu({ ...buttonMenu, updateSelf: updateButtonMenu }, i, controller)
          }
        </div>;
      }).toArray()
    }
  </div>;
}
