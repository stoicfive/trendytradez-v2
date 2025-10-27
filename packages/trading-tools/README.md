# @trendytradez/trading-tools

Trading calculators and tools for TrendyTradez.

## Features

### Options P&L Calculator
Calculate profit/loss for options trades with:
- Strike price
- Premium paid/received
- Number of contracts
- Current stock price
- Call/Put selection

### Position Sizing Calculator
Determine optimal position size based on:
- Account size
- Risk percentage
- Entry price
- Stop loss price

### Stop-Loss Calculator
Calculate stop-loss levels using:
- Entry price
- Risk amount or percentage
- Position size

### Crypto Portfolio Tracker
Track cryptocurrency holdings with:
- Multiple coin support
- Real-time value calculation
- Profit/loss tracking
- Portfolio allocation

### Leverage Calculator
Calculate leverage and margin requirements:
- Position size
- Leverage ratio
- Margin required
- Liquidation price

## Installation

```bash
pnpm add @trendytradez/trading-tools
```

## Usage

```typescript
import { 
  calculateOptionsPnL,
  calculatePositionSize,
  calculateStopLoss,
  calculateLeverage
} from '@trendytradez/trading-tools';

// Options P&L
const pnl = calculateOptionsPnL({
  strikePrice: 100,
  premium: 5,
  contracts: 10,
  currentPrice: 110,
  optionType: 'call'
});

// Position sizing
const size = calculatePositionSize({
  accountSize: 10000,
  riskPercentage: 2,
  entryPrice: 50,
  stopLossPrice: 48
});
```
