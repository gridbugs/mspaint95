import * as m from '../model/drop_down';

export class ButtonMenuStrip {
  constructor(readonly model: m.ButtonMenuStrip, readonly update: (x: m.ButtonMenuStrip) => void) {}

  displayMenu_(index: number): m.ButtonMenuStrip {
    return {
      active: this.model.active,
      buttonMenus: this.model.buttonMenus.map((x, i) => ({ ...x, menuVisible: i === index })),
    };
  }

  activate_(index: number): m.ButtonMenuStrip {
    return { ...this.displayMenu_(index), active: true };
  }

  deactivate_(): m.ButtonMenuStrip {
    return {
      active: false,
      buttonMenus: this.model.buttonMenus.map((x) => ({ ...x, menuVisible: false })),
    };
  }

  displayMenu(index: number): void {
    this.update(this.displayMenu_(index));
  }

  activate(index: number): void {
    this.update(this.activate_(index));
  }

  deactivate(): void {
    this.update(this.deactivate_());
  }
}
