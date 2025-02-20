export type Vec2 = {
	readonly x: number;
	readonly y: number;
};

export function vec2(x: number, y: number): Vec2 {
	return {x, y};
}

export function equal(a: Vec2, b: Vec2): boolean {
	return a.x === b.x && a.y === b.y;
}

export function abs(v: Vec2): Vec2 {
	return vec2(Math.abs(v.x), Math.abs(v.y));
}

export function add(a: Vec2, b: Vec2): Vec2 {
	return vec2(a.x + b.x, a.y + b.y);
}

export function sub(a: Vec2, b: Vec2): Vec2 {
	return vec2(a.x - b.x, a.y - b.y);
}

export function contains(point: Vec2, size: Vec2): boolean {
	return point.x >= 0 && point.x < size.x && point.y >= 0 && point.y < size.y;
}
