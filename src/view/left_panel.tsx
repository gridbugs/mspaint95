import { h, JSX } from 'preact';
/** @jsx h */

import * as m from '../model';
import * as c from '../controller';
import { Ctx, go } from '.';

function LeftPanelButton(ctx: Ctx<m.LeftPanelButton>, index: number, parentCtx: Ctx<m.LeftPanel>): JSX.Element {
  function onMouseDown(): void {
    go(ctx, c.leftPanelButtonPressing);
  }
  function onMouseUp(): void {
    go(parentCtx, c.leftPanelButtonSelect(index));
  }
  function onMouseLeave(): void {
    if (ctx.model.state === 'Pressing') {
      go(ctx, c.leftPanelButtonDeselected);
    }
  }
  let extraContainerClass = '';
  let extraClass = '';
  if (ctx.model.state === 'Pressing') {
    extraContainerClass = 'leftPanelButtonContainerPressing';
    extraClass = 'leftPanelButtonPressing';
  }
  if (ctx.model.state === 'Selected') {
    extraContainerClass = 'leftPanelButtonContainerSelected';
    extraClass = 'leftPanelButtonSelected';
  }

  return <div className={`leftPanelButtonContainer ${extraContainerClass}`}>
    <div
      key={index}
      className={`leftPanelButton ${ctx.model.imageClass} ${extraClass}`}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
    >
    </div>
  </div>;
}

export function LeftPanel(ctx: Ctx<m.LeftPanel>): JSX.Element {
  return <div className='leftPanel'>
    {
      ctx.model.buttons.map((button, i) => {
        const buttonCtx = {
          model: button,
          update: (newButton: m.LeftPanelButton) => ctx.update({
            ...ctx.model,
            buttons: ctx.model.buttons.set(i, newButton),
          }),
        };
        return LeftPanelButton(buttonCtx, i, ctx);
      }).toArray()
    }
  </div>;
}
