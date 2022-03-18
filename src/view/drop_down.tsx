import { h, Fragment, JSX } from 'preact';
/** @jsx h */

import { isSome } from 'fp-ts/Option';
import * as m from '../model';
import * as c from '../controller';
import { Ctx, go } from '.';

export function ShortcutText({ text }: m.ShortcutText): JSX.Element {
  return <>{ text }</>;
}

export function MenuItem(ctx: Ctx<m.MenuItem>): JSX.Element {
  function onMouseOver(): void {
    ctx.update({ ...ctx.model, selected: true });
  }
  function onMouseLeave(): void {
    ctx.update({ ...ctx.model, selected: false });
  }
  const className = `menuItem ${ctx.model.selected ? 'menuItemSelected' : ''}`;
  return <div onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} className={className}>
    <div className='leftContainer'>
    <div className='tickContainer'>
    { ctx.model.tick ? '✓' : '' }
    </div>
    <div className='nameContainer'>
    { ShortcutText(ctx.model.text) }
    </div>
    </div>
    <div className='shortcutContainer'>
    { isSome(ctx.model.shortcut) ? ctx.model.shortcut.value : '' }
    </div>
  </div>;
}

export function Menu(ctx: Ctx<m.Menu>): JSX.Element {
  return <ul className='menu'>
    {
      ctx.model.items.map((item, i) => {
        if (item === 'Separator') {
          return <div className='separator'></div>;
        }
        const menuItemCtx = {
          model: item,
          update: (menuItem: m.MenuItem) => ctx.update({
            items: ctx.model.items.set(i, menuItem),
          }),
        };
        return <li key={ i }>{ MenuItem(menuItemCtx) }</li>;
      }).toArray()
    }
  </ul>;
}

export function Button({ text, onClick }: m.Button & { onClick: () => void}, selected: boolean): JSX.Element {
  const className = `button ${selected ? 'menuItemSelected' : ''}`;
  return <div className={className} onClick={onClick}>
    {ShortcutText(text)}
  </div>;
}

export function ButtonMenu(
  ctx: Ctx<m.ButtonMenu>,
  topCtx: Ctx<m.ButtonMenuStrip>,
  index: number,
): JSX.Element {
  const menuCtx = {
    model: ctx.model.menu,
    update: (newMenu: m.Menu) => ctx.update({
      ...ctx.model,
      menu: newMenu,
    }),
  };
  function onMouseOver(): void {
    if (topCtx.model.active) {
      go(topCtx, c.displayDropDownMenu(index));
    }
  }
  function onClick(): void {
    if (topCtx.model.active) {
      go(topCtx, c.deativateDropDownMenu);
    } else {
      go(topCtx, c.activateDropDownMenu(index));
    }
  }
  return <div className='buttonMenu' onMouseOver={onMouseOver}>
    { Button({ ...ctx.model.button, onClick }, ctx.model.menuVisible) }
    {
      ctx.model.menuVisible && Menu(menuCtx)
    }
  </div>;
}

export function ButtonMenuStrip(ctx: Ctx<m.ButtonMenuStrip>): JSX.Element {
  return <div className='buttonMenuStrip'>
    {
      ctx.model.buttonMenus.map((buttonMenu, i) => {
        const buttonMenuCtx = {
          model: buttonMenu,
          update: (newButtonMenu: m.ButtonMenu) => ctx.update({
            ...ctx.model,
            buttonMenus: ctx.model.buttonMenus.set(i, newButtonMenu),
          }),
        };
        return <div key={ i }>
          {
            ButtonMenu(buttonMenuCtx, ctx, i)
          }
        </div>;
      }).toArray()
    }
  </div>;
}
