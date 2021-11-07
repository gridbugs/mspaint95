import * as model from '../model/drop_down';
import { some, none } from 'fp-ts/Option';

export function clearMenuItemSelection(state: model.ButtonMenuStrip, menuIndex: number): model.ButtonMenuStrip {
  return {
    buttonMenus: state.buttonMenus.update(menuIndex, (value) => {
      if (value === undefined) {
        throw new Error();
      }
      return { ...value, selection: none };
    }),
  };
}
