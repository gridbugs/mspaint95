import { Controller } from '../controller/controller';

export type Update<T> = (x: T) => void;

export interface Ctx<T> {
  model: T,
  update: Update<T>,
}

export function go<T>(ctx: Ctx<T>, controller: Controller<T>): void {
  ctx.update(controller(ctx.model));
}
