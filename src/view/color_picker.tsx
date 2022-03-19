import { h, JSX } from 'preact';
/** @jsx h */

import * as m from '../model';
import * as c from '../controller';
import { Ctx, go } from '.';

function Cell(color: string, index: number, parentCtx: Ctx<m.ColorPicker>): JSX.Element {
  const style = {
    backgroundColor: color,
  };
  function onClick(): void {
    go(parentCtx, c.colorPickerChooseFg(index));
  }
  function onRightClick(): void {
    go(parentCtx, c.colorPickerChooseBg(index));
  }
  return <div key={index} className='colorCellContainer'>
    <div className='colorCell' style={style} onClick={onClick} onContextMenu={onRightClick}>
    </div>
  </div>;
}

function CurrentCell(color: string): JSX.Element {
  const style = {
    backgroundColor: color,
  };
  return <div className='currentCellContainer'>
    <div className='currentCell' style={style}>
    </div>
    </div>;
}

function CurrentColors(fg: string, bg: string): JSX.Element {
  return <div className='currentColorsContainer'>
    <div className='currentColors'>
        <div className='fg'>{ CurrentCell(fg) }</div>
        <div className='bg'>{ CurrentCell(bg) }</div>
    </div>
  </div>;
}

export function ColorPicker(ctx: Ctx<m.ColorPicker>): JSX.Element {
  const colors = ctx.model.palette.toArray();
  return <div className='colorPicker'>
    {
      CurrentColors(ctx.model.fg, ctx.model.bg)
    }
    <div className='colorSwatches'>
      <div>
        { colors.slice(0, colors.length / 2).map((x, i) => Cell(x, i, ctx)) }
      </div>
      <div>
        { colors.slice(colors.length / 2).map((x, i) => Cell(x, (colors.length / 2) + i, ctx)) }
      </div>
    </div>
  </div>;
}
