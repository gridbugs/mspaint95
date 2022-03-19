import { h, JSX } from 'preact';
import {
  useEffect, useRef, MutableRef
} from 'preact/hooks';
/** @jsx h */

import * as m from '../model';
import * as v from '../view';
import * as c from '../controller';
import { Ctx } from '.';

export function Container(
  ctx: Ctx<m.Container>,
  setDropDownMenu: (buttonMenuStrip: m.ButtonMenuStrip) => void,
): JSX.Element {
  const dropdownAreaRef: MutableRef<HTMLDivElement | null> = useRef(null);

  const buttonMenuStripCtx = {
    model: ctx.model.buttonMenuStrip,
    update: (buttonMenuStrip: m.ButtonMenuStrip) => ctx.update({
      ...ctx.model,
      buttonMenuStrip,
    }),
  };

  const leftPanelCtx = {
    model: ctx.model.leftPanel,
    update: (leftPanel: m.LeftPanel) => ctx.update({
      ...ctx.model,
      leftPanel,
    }),
  };

  const colorPickerCtx = {
    model: ctx.model.colorPicker,
    update: (colorPicker: m.ColorPicker) => ctx.update({
      ...ctx.model,
      colorPicker,
    }),
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      if (dropdownAreaRef.current !== null) {
        const path = event.composedPath();
        if (!path.includes(dropdownAreaRef.current)) {
          setDropDownMenu(c.deativateDropDownMenu(buttonMenuStripCtx.model));
        }
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ctx.model]);

  return <div className='container'>
      <div>
        <div className='title'>
          MSPaint95
        </div>
        <div ref={dropdownAreaRef}>
        {
          v.ButtonMenuStrip(buttonMenuStripCtx)
        }
        </div>
        <div className='leftPanelArea'>
          <div className='leftPanelTop'>
          </div>
          { v.LeftPanel(leftPanelCtx) }
          <div className='leftPanelBottom'>
          </div>
        </div>
        <div className='drawAreaContainer'>
          <div>
          {
            v.DrawArea(ctx.model.colorPicker.fg, m.selectedTool(ctx.model.leftPanel))
          }
          </div>
        </div>
        <div className='colorPickerContainer'>
        {
          v.ColorPicker(colorPickerCtx)
        }
        </div>
      </div>
    </div>;
}
