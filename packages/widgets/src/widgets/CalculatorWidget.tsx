import { useState } from 'react';
import type { Widget } from '@trendytradez/types';

interface CalculatorWidgetProps {
  widget: Widget;
}

/**
 * Options P&L Calculator Widget
 * Calculate profit/loss for options trades
 */
export function CalculatorWidget({ widget: _widget }: CalculatorWidgetProps) {
  const [strikePrice, setStrikePrice] = useState('');
  const [premium, setPremium] = useState('');
  const [contracts, setContracts] = useState('1');
  const [currentPrice, setCurrentPrice] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const strike = parseFloat(strikePrice);
    const prem = parseFloat(premium);
    const cont = parseInt(contracts);
    const current = parseFloat(currentPrice);

    if (!isNaN(strike) && !isNaN(prem) && !isNaN(cont) && !isNaN(current)) {
      // Simple call option P&L calculation
      const intrinsicValue = Math.max(0, current - strike);
      const profitPerContract = (intrinsicValue - prem) * 100;
      const totalProfit = profitPerContract * cont;
      setResult(totalProfit);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    marginBottom: '12px',
    backgroundColor: '#0d1117',
    border: '1px solid #30363d',
    borderRadius: '6px',
    color: '#e6edf3',
    fontSize: '14px',
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#1f6feb',
    border: 'none',
    borderRadius: '6px',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
  };

  const resultStyle = {
    marginTop: '16px',
    padding: '12px',
    backgroundColor: result && result >= 0 ? '#1a472a' : '#4c1f1f',
    border: `1px solid ${result && result >= 0 ? '#3fb950' : '#f85149'}`,
    borderRadius: '6px',
    color: '#e6edf3',
    fontSize: '16px',
    fontWeight: 600,
    textAlign: 'center' as const,
  };

  return (
    <div>
      <input
        type="number"
        placeholder="Strike Price"
        value={strikePrice}
        onChange={(e) => setStrikePrice(e.target.value)}
        style={inputStyle}
      />
      <input
        type="number"
        placeholder="Premium Paid"
        value={premium}
        onChange={(e) => setPremium(e.target.value)}
        style={inputStyle}
      />
      <input
        type="number"
        placeholder="Number of Contracts"
        value={contracts}
        onChange={(e) => setContracts(e.target.value)}
        style={inputStyle}
      />
      <input
        type="number"
        placeholder="Current Stock Price"
        value={currentPrice}
        onChange={(e) => setCurrentPrice(e.target.value)}
        style={inputStyle}
      />
      <button onClick={calculate} style={buttonStyle}>
        Calculate P&L
      </button>
      {result !== null && (
        <div style={resultStyle}>
          {result >= 0 ? 'Profit' : 'Loss'}: ${Math.abs(result).toFixed(2)}
        </div>
      )}
    </div>
  );
}
