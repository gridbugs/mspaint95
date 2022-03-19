import { h, JSX } from 'preact';
import {
  useEffect, useRef, MutableRef, useState,
} from 'preact/hooks';
/** @jsx h */

import { Option, isSome, none } from 'fp-ts/Option';
import * as m from '../model';

interface Coord2 {
  x: number,
  y: number,
}

class DrawState {
  private drawing = false;

  private cursor: Coord2 | null = null;

  private fg = '#000000';

  private tool: Option<m.Tool> = none;

  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly context: CanvasRenderingContext2D,
  ) {
    this.context.strokeStyle = this.fg;
  }

  fill(): void {
    if (this.cursor !== null) {
      const { data } = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
      const stack = [this.cursor];
      const indexOfCoord2 = ({ x, y }: Coord2): number => ((y * this.canvas.width) + x) * 4;
      const cursorIndex = indexOfCoord2(this.cursor);
      const originalColor = [data[cursorIndex], data[cursorIndex + 1], data[cursorIndex + 2]];
      this.context.fillStyle = this.fg;
      this.context.fillRect(this.cursor.x, this.cursor.y, 1, 1);
      this.context.fill();
      const im2 = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
      const [newR, newG, newB] = [im2.data[cursorIndex], im2.data[cursorIndex + 1], im2.data[cursorIndex + 2]];
      const neighbours = [
        { x: 0, y: 1 },
        { x: 0, y: -1 },
        { x: 1, y: 0 },
        { x: -1, y: 0 },
      ];
      while (stack.length > 0) {
        const current = stack.pop();
        if (current === undefined) {
          break;
        }
        for (let i = 0; i < neighbours.length; i += 1) {
          const next = { x: current.x + neighbours[i].x, y: current.y + neighbours[i].y };
          if (next.x >= 0 && next.x < this.canvas.width && next.y >= 0 && next.y < this.canvas.height) {
            const index = indexOfCoord2(next);
            const [r, g, b] = [im2.data[index], im2.data[index + 1], im2.data[index + 2]];
            if (r === originalColor[0] && g === originalColor[1] && b === originalColor[2]) {
              im2.data[index] = newR;
              im2.data[index + 1] = newG;
              im2.data[index + 2] = newB;
              stack.push(next);
            }
          }
        }
      }
      this.context.putImageData(im2, 0, 0);
    }
  }

  setFg(fg: string): void {
    this.fg = fg;
    this.context.strokeStyle = fg;
  }

  setTool(tool: Option<m.Tool>): void {
    this.tool = tool;
  }

  mouseDown(): void {
    if (isSome(this.tool) && this.tool.value === 'Fill') {
      this.fill();
    } else {
      this.drawing = true;
    }
  }

  mouseUp(): void {
    this.drawing = false;
  }

  mouseMove(coord2: Coord2): void {
    const bb = this.canvas.getBoundingClientRect();
    const coord2Adjusted = { x: coord2.x - bb.x, y: coord2.y - bb.y };
    if (coord2Adjusted.x < 0
      || coord2Adjusted.x >= this.canvas.width
      || coord2Adjusted.y < 0
      || coord2Adjusted.y >= this.canvas.height) {
      this.cursor = null;
      return;
    }
    if (isSome(this.tool) && this.tool.value === 'Pencil' && this.drawing && this.cursor !== null) {
      this.context.beginPath();
      this.context.moveTo(this.cursor.x, this.cursor.y);
      this.context.lineTo(coord2Adjusted.x, coord2Adjusted.y);
      this.context.stroke();
    }
    this.cursor = coord2Adjusted;
  }
}

export function DrawArea(fg: string, tool: Option<m.Tool>): JSX.Element {
  const canvasRef: MutableRef<HTMLCanvasElement | null> = useRef(null);
  const [drawState, setDrawState] = useState<DrawState | null>(null);

  if (drawState !== null) {
    drawState.setFg(fg);
    drawState.setTool(tool);
  }

  useEffect(() => {
    if (drawState === null) {
      if (canvasRef.current !== null) {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (context !== null) {
          context.fillStyle = '#ffffff';
          context.fillRect(0, 0, canvas.width, canvas.height);
          setDrawState(new DrawState(canvas, context));
        }
      }
    }

    function onMouseDown(): void {
      if (drawState !== null) {
        drawState.mouseDown();
      }
    }

    function onMouseUp(): void {
      if (drawState !== null) {
        drawState.mouseUp();
      }
    }

    function onMouseMove(event: MouseEvent): void {
      if (drawState !== null) {
        drawState.mouseMove({ x: event.clientX, y: event.clientY });
      }
    }

    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mousemove', onMouseMove);
    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, [drawState]);

  return <canvas className='drawCanvas' ref={canvasRef} width='640' height='480'></canvas>;
}
