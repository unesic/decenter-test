export const MAX_CDPS = 20;
export const CALLS_PER_SEC = 5;
export const MS_IN_SEC = 1000;

export const WEIGHTS_DOM = +!(CALLS_PER_SEC % 2);
export const WEIGHTS_OFFSET = Math.floor(CALLS_PER_SEC / 2) + 1;
export const BASE_WEIGHTS = new Array(WEIGHTS_OFFSET * 2 + 1)
  .fill(WEIGHTS_OFFSET)
  .map((w, i) => w - i);
