import { BASE_WEIGHTS, WEIGHTS_DOM, WEIGHTS_OFFSET } from "@/lib/constants";

/**
 * @param cycle request batch order
 * @param pivot `true` will give advantage to positive weights - `false` will give advantage to negative weights
 * @param shouldPivot when batch size is smaller than 3 we shouldn't give advantage to either by pivoting
 * @param max starting point for positive weights
 * @param min starting point for negative weights
 * @returns weights based on current cycle
 */
export function getCycleWeights(
  cycle: number,
  pivot: boolean,
  shouldPivot: boolean,
  max: number,
  min: number
) {
  const evenCorrect = cycle ? WEIGHTS_DOM : 0;

  const positiveStart = (shouldPivot && !pivot ? 2 : 1) - evenCorrect;
  const positiveEnd = WEIGHTS_OFFSET + 1 - evenCorrect;

  const negativeStart = BASE_WEIGHTS.length - WEIGHTS_OFFSET;
  const negativeEnd = BASE_WEIGHTS.length - (shouldPivot ? +pivot : 0) - WEIGHTS_DOM;

  let cycleWeights = [
    ...BASE_WEIGHTS.slice(positiveStart, positiveEnd),
    ...BASE_WEIGHTS.slice(negativeStart, negativeEnd),
  ];

  if (cycle) {
    cycleWeights = cycleWeights.map((w) => {
      if (w < 0) return w + min;
      return w + max + 1 - WEIGHTS_DOM;
    });
  }

  return cycleWeights;
}

export function correctCycleWeights(weights: number[], id: number) {
  const max = Math.max(...weights);

  let increment = 0;
  const valid = weights.map((w) => {
    const isValid = w + id > 0;
    if (isValid) return w;
    return max + 1 + increment++;
  });

  return valid;
}

export function weighIds(weights: number[], id: number) {
  return weights.map((w) => w + id);
}

export function setAbort(id?: number) {
  const ids = Object.keys(window.abort ?? {});
  window.abort = ids.reduce((a, id) => ({ ...a, [id]: true }), {});
  if (id) window.abort[id] = false;
}
