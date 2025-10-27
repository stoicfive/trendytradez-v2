import { widgetRegistry } from './WidgetRegistry';

/**
 * Register default widget types
 * Call this function to register all built-in widgets
 */
export function registerDefaultWidgets(): void {
  widgetRegistry.register({
    type: 'tradingview',
    label: 'TradingView Chart',
    description: 'Interactive trading chart with technical indicators',
    defaultSize: { width: 800, height: 500 },
    minSize: { width: 400, height: 300 },
    resizable: true,
    draggable: true,
  });

  widgetRegistry.register({
    type: 'calculator',
    label: 'Options Calculator',
    description: 'Calculate profit/loss for options trades',
    defaultSize: { width: 400, height: 450 },
    minSize: { width: 300, height: 400 },
    resizable: true,
    draggable: true,
  });

  widgetRegistry.register({
    type: 'watchlist',
    label: 'Watchlist',
    description: 'Track your favorite stocks',
    defaultSize: { width: 350, height: 400 },
    minSize: { width: 250, height: 300 },
    resizable: true,
    draggable: true,
  });

  widgetRegistry.register({
    type: 'news',
    label: 'Market News',
    description: 'Latest market news and updates',
    defaultSize: { width: 400, height: 500 },
    minSize: { width: 300, height: 400 },
    resizable: true,
    draggable: true,
  });

  widgetRegistry.register({
    type: 'portfolio',
    label: 'Portfolio',
    description: 'View your portfolio performance',
    defaultSize: { width: 500, height: 400 },
    minSize: { width: 400, height: 300 },
    resizable: true,
    draggable: true,
  });
}
