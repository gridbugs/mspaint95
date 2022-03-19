import { List } from 'immutable';

export interface ColorPicker {
  fg: string,
  bg: string,
  palette: List<string>,
}
