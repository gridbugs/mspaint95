import { h, JSX } from 'preact';
import { useEffect, useRef, MutableRef } from 'preact/hooks';
/** @jsx h */

import * as m from '../model';
import * as v from '../view';
import * as c from '../controller';
import { Ctx, go } from '.';

export function Container(buttonMenuStripCtx: Ctx<m.ButtonMenuStrip>): JSX.Element {
  const dropdownAreaRef: MutableRef<HTMLDivElement | null> = useRef(null);

  function handleClickOutside(event: MouseEvent): void {
    if (dropdownAreaRef.current !== null) {
      const path = (event.composedPath && event.composedPath());
      if (!path.includes(dropdownAreaRef.current)) {
        go(buttonMenuStripCtx, c.deativateDropDownMenu);
      }
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

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
          <div className='leftPanelBottom'>
          </div>
        </div>
        <div className='drawAreaContainer'>
          <div>
          </div>
        </div>
      </div>
    </div>;
}
