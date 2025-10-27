import { useEffect, useRef } from 'react';
import type { Widget } from '@trendytradez/types';

interface TradingViewWidgetProps {
  widget: Widget;
}

/**
 * TradingView Chart Widget
 * Embeds TradingView lightweight charts
 */
export function TradingViewWidget({ widget }: TradingViewWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // TradingView chart initialization would go here
    // For now, just a placeholder
    if (containerRef.current) {
      containerRef.current.innerHTML = '<p>TradingView Chart (Integration pending)</p>';
    }
  }, [widget]);

  const style = {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#8b949e',
    fontSize: '14px',
  };

  return <div ref={containerRef} style={style} />;
}
