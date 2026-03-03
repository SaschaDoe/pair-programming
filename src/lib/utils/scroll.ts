/** Smooth per-phase opacity with crossfade overlap. */
export function fadeCalc(scroll: number, fadeIn: number, solidStart: number, solidEnd: number, fadeOut: number): number {
	if (scroll <= fadeIn) return 0;
	if (scroll <= solidStart) return (scroll - fadeIn) / (solidStart - fadeIn);
	if (scroll <= solidEnd) return 1;
	if (scroll <= fadeOut) return 1 - (scroll - solidEnd) / (fadeOut - solidEnd);
	return 0;
}

/** Linear ramp from 0→1 between start and end scroll positions. */
export function rampIn(scroll: number, start: number, end: number): number {
	if (scroll <= start) return 0;
	if (scroll >= end) return 1;
	return (scroll - start) / (end - start);
}
