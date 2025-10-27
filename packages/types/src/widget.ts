/**
 * Widget type definitions
 */

export type WidgetType =
  | 'tradingview'
  | 'calculator'
  | 'watchlist'
  | 'news'
  | 'portfolio'
  | 'chart'
  | 'table'
  | 'note';

export interface Position {
  x: number;
  y: number;
  z?: number;
}

export interface Size {
  width: number;
  height: number;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
}

export interface WidgetConfig {
  title?: string;
  color?: string;
  resizable?: boolean;
  draggable?: boolean;
  [key: string]: unknown;
}

export interface Widget {
  id: string;
  type: WidgetType;
  position: Position;
  size: Size;
  config: WidgetConfig;
  createdAt: Date;
  updatedAt: Date;
}

export interface WidgetDefinition {
  type: WidgetType;
  label: string;
  description?: string;
  defaultSize: Size;
  minSize?: Omit<Size, 'width' | 'height'> & { width: number; height: number };
  maxSize?: Omit<Size, 'width' | 'height'> & { width: number; height: number };
  resizable?: boolean;
  draggable?: boolean;
}
