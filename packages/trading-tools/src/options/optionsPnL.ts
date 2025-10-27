/**
 * Options P&L Calculator
 * Calculate profit/loss for options trades
 */

import type { OptionsPnLInput, OptionsPnLResult } from '../types';

export function calculateOptionsPnL(input: OptionsPnLInput): OptionsPnLResult {
  const { strikePrice, premium, contracts, currentPrice, optionType } = input;

  const contractMultiplier = 100; // Standard options contract
  const totalPremiumPaid = premium * contracts * contractMultiplier;

  let intrinsicValue = 0;
  let breakEvenPrice = 0;
  let maxProfit = 0;
  let maxLoss = totalPremiumPaid;

  if (optionType === 'call') {
    // Call option
    intrinsicValue = Math.max(0, currentPrice - strikePrice);
    breakEvenPrice = strikePrice + premium;
    maxProfit = Infinity; // Theoretically unlimited for calls
  } else {
    // Put option
    intrinsicValue = Math.max(0, strikePrice - currentPrice);
    breakEvenPrice = strikePrice - premium;
    maxProfit = (strikePrice - premium) * contracts * contractMultiplier;
  }

  const currentValue = intrinsicValue * contracts * contractMultiplier;
  const profitLoss = currentValue - totalPremiumPaid;
  const profitLossPercentage = (profitLoss / totalPremiumPaid) * 100;

  return {
    profitLoss,
    profitLossPercentage,
    breakEvenPrice,
    maxProfit,
    maxLoss,
  };
}
