import * as m from '../model';
import { Controller } from '.';

function notUndefined<T>(t: T | undefined): T {
  if (t === undefined) {
    throw new Error('undefined');
  } else {
    return t;
  }
}

export function colorPickerChooseFg(index: number): Controller<m.ColorPicker> {
  return (model) => ({
    ...model,
    fg: notUndefined(model.palette.get(index)),
  });
}

export function colorPickerChooseBg(index: number): Controller<m.ColorPicker> {
  return (model) => ({
    ...model,
    bg: notUndefined(model.palette.get(index)),
  });
}
