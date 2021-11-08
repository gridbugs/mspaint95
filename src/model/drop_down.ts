import { List } from 'immutable';

export interface ShortcutText {
  text: string,
  shortcutPosition: number,
}

export function shortcutText(text: string, shortcutPosition = 0): ShortcutText {
  return { text, shortcutPosition };
}

export interface MenuItem {
  readonly text: ShortcutText,
  readonly selected: boolean,
}

export interface Menu {
  readonly items: List<MenuItem>,
}

export type ButtonState = 'Normal' | 'Hover' | 'Press';

export interface Button {
  readonly text: ShortcutText,
  readonly state: ButtonState,
}

export interface ButtonMenu {
  readonly button: Button,
  readonly menu: Menu,
  readonly menuVisible: boolean,
}

export interface ButtonMenuStrip {
  readonly buttonMenus: List<ButtonMenu>,
}
