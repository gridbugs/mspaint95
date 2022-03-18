import * as m from '../model/drop_down';
import { Controller } from './controller';

export function displayDropDownMenu(menuIndex: number): Controller<m.ButtonMenuStrip> {
  return (model) => ({
    active: model.active,
    buttonMenus: model.buttonMenus.map((x, i) => ({ ...x, menuVisible: i === menuIndex })),
  });
}

export function activateDropDownMenu(menuIndex: number): Controller<m.ButtonMenuStrip> {
  return (model) => ({ ...displayDropDownMenu(menuIndex)(model), active: true });
}

export const deativateDropDownMenu: Controller<m.ButtonMenuStrip> = (model) => ({
  active: false,
  buttonMenus: model.buttonMenus.map((x) => ({ ...x, menuVisible: false })),
});
