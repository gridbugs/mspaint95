import { Controller } from '../controller';

export * from './drop_down';
export * from './color_picker';
export * from './left_panel';
export * from './container';

export type Update<T> = (x: T) => void;

export interface Ctx<T> {
  model: T,
  update: Update<T>,
}

export function go<T>(ctx: Ctx<T>, controller: Controller<T>): void {
  ctx.update(controller(ctx.model));
}
