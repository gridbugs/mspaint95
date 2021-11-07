import { List } from 'immutable';
import { Option } from 'fp-ts/Option';

export interface ShortcutText {
  text: string,
  shortcutPosition: number,
}

export function shortcutText(text: string, shortcutPosition = 0): ShortcutText {
  return { text, shortcutPosition };
}

export interface MenuItem {
  readonly text: ShortcutText,
}

export interface Menu {
  readonly items: List<MenuItem>,
  readonly selection: Option<number>,
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
