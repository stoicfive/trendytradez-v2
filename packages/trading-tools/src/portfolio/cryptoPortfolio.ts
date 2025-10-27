/**
 * Crypto Portfolio Tracker
 * Track and calculate cryptocurrency portfolio metrics
 */

import type { CryptoHolding, CryptoPortfolioResult } from '../types';

export function calculateCryptoPortfolio(holdings: CryptoHolding[]): CryptoPortfolioResult {
  let totalValue = 0;
  let totalCost = 0;

  const calculatedHoldings = holdings.map((holding) => {
    const value = holding.amount * holding.currentPrice;
    const cost = holding.amount * holding.averageCost;
    const profitLoss = value - cost;
    const profitLossPercentage = (profitLoss / cost) * 100;

    totalValue += value;
    totalCost += cost;

    return {
      symbol: holding.symbol,
      amount: holding.amount,
      value,
      cost,
      profitLoss,
      profitLossPercentage,
      allocation: 0, // Will be calculated after totals
    };
  });

  // Calculate allocations
  calculatedHoldings.forEach((holding) => {
    holding.allocation = (holding.value / totalValue) * 100;
  });

  const totalProfitLoss = totalValue - totalCost;
  const totalProfitLossPercentage = (totalProfitLoss / totalCost) * 100;

  return {
    totalValue,
    totalCost,
    totalProfitLoss,
    totalProfitLossPercentage,
    holdings: calculatedHoldings,
  };
}
