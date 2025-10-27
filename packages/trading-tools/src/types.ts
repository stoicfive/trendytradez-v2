/**
 * Trading tools types
 */

export type OptionType = 'call' | 'put';

export interface OptionsPnLInput {
  strikePrice: number;
  premium: number;
  contracts: number;
  currentPrice: number;
  optionType: OptionType;
}

export interface OptionsPnLResult {
  profitLoss: number;
  profitLossPercentage: number;
  breakEvenPrice: number;
  maxProfit: number;
  maxLoss: number;
}

export interface PositionSizingInput {
  accountSize: number;
  riskPercentage: number;
  entryPrice: number;
  stopLossPrice: number;
}

export interface PositionSizingResult {
  shares: number;
  positionValue: number;
  riskAmount: number;
  riskPerShare: number;
}

export interface StopLossInput {
  entryPrice: number;
  riskAmount?: number;
  riskPercentage?: number;
  positionSize?: number;
}

export interface StopLossResult {
  stopLossPrice: number;
  riskAmount: number;
  riskPercentage: number;
}

export interface LeverageInput {
  positionSize: number;
  leverage: number;
  entryPrice: number;
}

export interface LeverageResult {
  marginRequired: number;
  liquidationPrice: number;
  effectivePositionSize: number;
}

export interface CryptoHolding {
  symbol: string;
  amount: number;
  averageCost: number;
  currentPrice: number;
}

export interface CryptoPortfolioResult {
  totalValue: number;
  totalCost: number;
  totalProfitLoss: number;
  totalProfitLossPercentage: number;
  holdings: Array<{
    symbol: string;
    amount: number;
    value: number;
    cost: number;
    profitLoss: number;
    profitLossPercentage: number;
    allocation: number;
  }>;
}
