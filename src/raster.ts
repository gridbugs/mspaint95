import * as Vec2 from './vec2';

type Segment2Desc = {
	major: Vec2.Vec2;
	minor: Vec2.Vec2;
	majorDeltaAbs: number;
	minorDeltaAbs: number;
};

function segment2Desc(start: Vec2.Vec2, end: Vec2.Vec2): Segment2Desc {
	const delta = Vec2.sub(end, start);
	const deltaAbs = Vec2.abs(delta);
	if (deltaAbs.x > deltaAbs.y) {
		const major = delta.x > 0 ? Vec2.vec2(1, 0) : Vec2.vec2(-1, 0);
		const minor = delta.y > 0 ? Vec2.vec2(0, 1) : Vec2.vec2(0, -1);
		return {
			major,
			minor,
			majorDeltaAbs: deltaAbs.x,
			minorDeltaAbs: deltaAbs.y,
		};
	}

	const minor = delta.x > 0 ? Vec2.vec2(1, 0) : Vec2.vec2(-1, 0);
	const major = delta.y > 0 ? Vec2.vec2(0, 1) : Vec2.vec2(0, -1);
	return {
		major,
		minor,
		majorDeltaAbs: deltaAbs.y,
		minorDeltaAbs: deltaAbs.x,
	};
}

export function segment2(start: Vec2.Vec2, end: Vec2.Vec2): Vec2.Vec2[] {
	if (Vec2.equal(start, end)) {
		return [start];
	}

	const {
		minor,
		major,
		majorDeltaAbs,
		minorDeltaAbs,
	} = segment2Desc(start, end);
	const minorOrdinal = Vec2.add(major, minor); // Every minor step will be diagonal
	const returnValue = [start];
	let accumulator = 0;
	let current = start;
	for (let i = 0; i < majorDeltaAbs; i++) {
		accumulator += minorDeltaAbs;
		if (accumulator > (majorDeltaAbs / 2)) {
			accumulator -= majorDeltaAbs;
			current = Vec2.add(current, minorOrdinal);
		} else {
			current = Vec2.add(current, major);
		}

		returnValue.push(current);
	}

	return returnValue;
}
