import { List } from 'immutable';
import { Option, some, none } from 'fp-ts/Option';

export type Tool =
  | 'Airbrush'
  | 'Brush'
  | 'ColorPicker'
  | 'Curve'
  | 'Ellipse'
  | 'Eraser'
  | 'FillWithColor'
  | 'FreeFormSelect'
  | 'Line'
  | 'Magnifier'
  | 'Pencil'
  | 'Polygon'
  | 'Rectangle'
  | 'RoundedRectangle'
  | 'Select'
  | 'Text';

export interface LeftPanelButton {
  imageClass: string,
  state: 'Deselected' | 'Pressing' | 'Selected',
  tool: Tool,
}

export interface LeftPanel {
  buttons: List<LeftPanelButton>,
}

export function selectedTool(model: LeftPanel): Option<Tool> {
  const maybeSelectedButton = model.buttons.find((b) => b.state === 'Selected');
  if (maybeSelectedButton === undefined) {
    return none;
  }
  return some(maybeSelectedButton.tool);
}
