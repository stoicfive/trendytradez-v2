/**
 * Stop-Loss Calculator
 * Calculate stop-loss levels for risk management
 */

import type { StopLossInput, StopLossResult } from '../types';

export function calculateStopLoss(input: StopLossInput): StopLossResult {
  const { entryPrice, riskAmount, riskPercentage, positionSize } = input;

  let calculatedRiskAmount: number;
  let calculatedRiskPercentage: number;
  let stopLossPrice: number;

  if (riskPercentage !== undefined) {
    // Calculate based on percentage
    calculatedRiskPercentage = riskPercentage;
    stopLossPrice = entryPrice * (1 - riskPercentage / 100);
    calculatedRiskAmount = positionSize
      ? positionSize * (riskPercentage / 100)
      : entryPrice * (riskPercentage / 100);
  } else if (riskAmount !== undefined && positionSize !== undefined) {
    // Calculate based on dollar amount
    calculatedRiskAmount = riskAmount;
    const riskPerShare = riskAmount / positionSize;
    stopLossPrice = entryPrice - riskPerShare;
    calculatedRiskPercentage = (riskPerShare / entryPrice) * 100;
  } else {
    throw new Error('Must provide either riskPercentage or both riskAmount and positionSize');
  }

  return {
    stopLossPrice,
    riskAmount: calculatedRiskAmount,
    riskPercentage: calculatedRiskPercentage,
  };
}
