/**
 * Rounds a number to a specified number of decimal places
 */
export function roundTo(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

/**
 * Rounds a number to the nearest grid size
 */
export function roundToGrid(value: number, gridSize: number): number {
  return Math.round(value / gridSize) * gridSize;
}
