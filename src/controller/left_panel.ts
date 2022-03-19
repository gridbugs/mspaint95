import * as m from '../model';
import { Controller } from '.';

export const leftPanelButtonPressing: Controller<m.LeftPanelButton> = (model) => ({
  ...model,
  state: 'Pressing',
});

export const leftPanelButtonSelected: Controller<m.LeftPanelButton> = (model) => ({
  ...model,
  state: 'Selected',
});

export const leftPanelButtonDeselected: Controller<m.LeftPanelButton> = (model) => ({
  ...model,
  state: 'Deselected',
});

export function leftPanelButtonSelect(index: number): Controller<m.LeftPanel> {
  return (model) => ({
    buttons: model.buttons.map((x, i) => ({ ...x, state: i === index ? 'Selected' : 'Deselected' })),
  });
}
