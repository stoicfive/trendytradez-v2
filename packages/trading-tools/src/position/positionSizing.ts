/**
 * Position Sizing Calculator
 * Calculate optimal position size based on risk management
 */

import type { PositionSizingInput, PositionSizingResult } from '../types';

export function calculatePositionSize(input: PositionSizingInput): PositionSizingResult {
  const { accountSize, riskPercentage, entryPrice, stopLossPrice } = input;

  // Calculate risk amount
  const riskAmount = accountSize * (riskPercentage / 100);

  // Calculate risk per share
  const riskPerShare = Math.abs(entryPrice - stopLossPrice);

  // Calculate number of shares
  const shares = Math.floor(riskAmount / riskPerShare);

  // Calculate position value
  const positionValue = shares * entryPrice;

  return {
    shares,
    positionValue,
    riskAmount,
    riskPerShare,
  };
}
