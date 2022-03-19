import { List } from 'immutable';
import { Option } from 'fp-ts/Option';

export interface ShortcutText {
  text: string,
  shortcutPosition: number,
}

export type Separator = 'Separator'

export function shortcutText(text: string, shortcutPosition = 0): ShortcutText {
  return { text, shortcutPosition };
}

export interface MenuItem {
  readonly text: ShortcutText,
  readonly selected: boolean,
  readonly shortcut: Option<string>,
  active: boolean,
  submenu: Option<Menu>,
  tick: boolean,
}

export interface Menu {
  readonly items: List<MenuItem | Separator>,
}

export interface Button {
  readonly text: ShortcutText,
}

export interface ButtonMenu {
  readonly button: Button,
  readonly menu: Menu,
  readonly menuVisible: boolean,
}

export interface ButtonMenuStrip {
  readonly buttonMenus: List<ButtonMenu>,
  readonly active: boolean,
}
