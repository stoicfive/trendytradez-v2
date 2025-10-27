import { useState } from 'react';
import type { Widget } from '@trendytradez/types';

interface WatchlistWidgetProps {
  widget: Widget;
}

interface Stock {
  symbol: string;
  price: number;
  change: number;
}

/**
 * Watchlist Widget
 * Display a list of tracked stocks
 */
export function WatchlistWidget({ widget: _widget }: WatchlistWidgetProps) {
  const [stocks] = useState<Stock[]>([
    { symbol: 'AAPL', price: 178.52, change: 2.34 },
    { symbol: 'MSFT', price: 378.91, change: -1.23 },
    { symbol: 'GOOGL', price: 141.80, change: 0.87 },
    { symbol: 'TSLA', price: 242.15, change: 5.67 },
    { symbol: 'AMZN', price: 145.32, change: -0.45 },
  ]);

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse' as const,
  };

  const headerStyle = {
    textAlign: 'left' as const,
    padding: '12px 8px',
    borderBottom: '1px solid #30363d',
    color: '#8b949e',
    fontSize: '12px',
    fontWeight: 600,
  };

  const cellStyle = {
    padding: '12px 8px',
    borderBottom: '1px solid #21262d',
    color: '#e6edf3',
    fontSize: '14px',
  };

  const getChangeColor = (change: number) => {
    return change >= 0 ? '#3fb950' : '#f85149';
  };

  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th style={headerStyle}>Symbol</th>
          <th style={headerStyle}>Price</th>
          <th style={headerStyle}>Change</th>
        </tr>
      </thead>
      <tbody>
        {stocks.map((stock) => (
          <tr key={stock.symbol}>
            <td style={cellStyle}>
              <strong>{stock.symbol}</strong>
            </td>
            <td style={cellStyle}>${stock.price.toFixed(2)}</td>
            <td style={{ ...cellStyle, color: getChangeColor(stock.change) }}>
              {stock.change >= 0 ? '+' : ''}
              {stock.change.toFixed(2)}%
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
