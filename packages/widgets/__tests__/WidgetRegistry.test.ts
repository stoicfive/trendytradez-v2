import { describe, it, expect, beforeEach } from 'vitest';
import { WidgetRegistry } from '../src/WidgetRegistry';
import type { WidgetDefinition } from '@trendytradez/types';

describe('WidgetRegistry', () => {
  let registry: WidgetRegistry;

  const mockWidget: WidgetDefinition = {
    type: 'tradingview',
    label: 'TradingView Chart',
    description: 'Interactive trading chart',
    defaultSize: { width: 400, height: 300 },
    resizable: true,
    draggable: true,
  };

  beforeEach(() => {
    registry = WidgetRegistry.getInstance();
    registry.clear();
  });

  it('should be a singleton', () => {
    const instance1 = WidgetRegistry.getInstance();
    const instance2 = WidgetRegistry.getInstance();
    expect(instance1).toBe(instance2);
  });

  it('should register a widget', () => {
    registry.register(mockWidget);
    expect(registry.has('tradingview')).toBe(true);
  });

  it('should get a registered widget', () => {
    registry.register(mockWidget);
    const widget = registry.get('tradingview');
    expect(widget).toEqual(mockWidget);
  });

  it('should return undefined for unregistered widget', () => {
    const widget = registry.get('nonexistent' as any);
    expect(widget).toBeUndefined();
  });

  it('should get all registered widgets', () => {
    const widget2: WidgetDefinition = {
      ...mockWidget,
      type: 'calculator',
      label: 'Calculator',
    };

    registry.register(mockWidget);
    registry.register(widget2);

    const all = registry.getAll();
    expect(all).toHaveLength(2);
  });

  it('should unregister a widget', () => {
    registry.register(mockWidget);
    expect(registry.has('tradingview')).toBe(true);

    registry.unregister('tradingview');
    expect(registry.has('tradingview')).toBe(false);
  });

  it('should clear all widgets', () => {
    registry.register(mockWidget);
    expect(registry.getAll()).toHaveLength(1);

    registry.clear();
    expect(registry.getAll()).toHaveLength(0);
  });

  it('should warn when registering duplicate widget type', () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    registry.register(mockWidget);
    registry.register(mockWidget);

    expect(consoleSpy).toHaveBeenCalledWith(
      'Widget type "tradingview" is already registered'
    );

    consoleSpy.mockRestore();
  });
});
