/**
 * Leverage Calculator
 * Calculate leverage, margin, and liquidation prices
 */

import type { LeverageInput, LeverageResult } from '../types';

export function calculateLeverage(input: LeverageInput): LeverageResult {
  const { positionSize, leverage, entryPrice } = input;

  // Calculate margin required
  const marginRequired = positionSize / leverage;

  // Calculate effective position size
  const effectivePositionSize = positionSize * leverage;

  // Calculate liquidation price (simplified - assumes 100% margin call)
  // For long positions: liquidation when equity = 0
  const priceChange = entryPrice / leverage;
  const liquidationPrice = entryPrice - priceChange;

  return {
    marginRequired,
    liquidationPrice,
    effectivePositionSize,
  };
}
