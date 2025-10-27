import type { WidgetType, WidgetDefinition } from '@trendytradez/types';

/**
 * Widget Registry
 * Central registry for all widget types and their definitions
 */
export class WidgetRegistry {
  private static instance: WidgetRegistry;
  private widgets: Map<WidgetType, WidgetDefinition> = new Map();

  private constructor() {}

  static getInstance(): WidgetRegistry {
    if (!WidgetRegistry.instance) {
      WidgetRegistry.instance = new WidgetRegistry();
    }
    return WidgetRegistry.instance;
  }

  /**
   * Register a widget type
   */
  register(definition: WidgetDefinition): void {
    if (this.widgets.has(definition.type)) {
      console.warn(`Widget type "${definition.type}" is already registered`);
      return;
    }
    this.widgets.set(definition.type, definition);
  }

  /**
   * Unregister a widget type
   */
  unregister(type: WidgetType): void {
    this.widgets.delete(type);
  }

  /**
   * Get a widget definition by type
   */
  get(type: WidgetType): WidgetDefinition | undefined {
    return this.widgets.get(type);
  }

  /**
   * Get all registered widget definitions
   */
  getAll(): WidgetDefinition[] {
    return Array.from(this.widgets.values());
  }

  /**
   * Check if a widget type is registered
   */
  has(type: WidgetType): boolean {
    return this.widgets.has(type);
  }

  /**
   * Clear all registered widgets
   */
  clear(): void {
    this.widgets.clear();
  }
}

// Export singleton instance
export const widgetRegistry = WidgetRegistry.getInstance();
