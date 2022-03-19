import { List } from 'immutable';

export interface LeftPanelButton {
  imageClass: string,
  state: 'Deselected' | 'Pressing' | 'Selected',
}

export interface LeftPanel {
  buttons: List<LeftPanelButton>,
}
