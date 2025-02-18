export type Vec2Like = {
	x: number;
	y: number;
};

export function equal(a: Vec2Like, b: Vec2Like): boolean {
	return a.x === b.x && a.y === b.y;
}

export function abs(v: Vec2Like): Vec2 {
	return new Vec2(Math.abs(v.x), Math.abs(v.y));
}

export function add(a: Vec2Like, b: Vec2Like): Vec2 {
	return new Vec2(a.x + b.x, a.y + b.y);
}

export function sub(a: Vec2Like, b: Vec2Like): Vec2 {
	return new Vec2(a.x - b.x, a.y - b.y);
}

export default class Vec2 implements Vec2Like {
	constructor(public readonly x: number, public readonly y: number) {}

	public equal(o: Vec2Like): boolean {
		return equal(this, o);
	}

	public abs(): Vec2 {
		return abs(this);
	}

	public add(o: Vec2Like): Vec2 {
		return add(this, o);
	}

	public sub(o: Vec2Like): Vec2 {
		return sub(this, o);
	}
}
