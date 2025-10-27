import React, { CSSProperties } from 'react';
import type { Widget } from '@trendytradez/types';

interface WidgetContainerProps {
  widget: Widget;
  children: React.ReactNode;
  onMove?: (id: string, x: number, y: number) => void;
  onResize?: (id: string, width: number, height: number) => void;
  onRemove?: (id: string) => void;
}

/**
 * Widget Container
 * Wraps widget content with positioning, sizing, and controls
 */
export function WidgetContainer({
  widget,
  children,
  onMove: _onMove,
  onResize: _onResize,
  onRemove,
}: WidgetContainerProps) {
  const style: CSSProperties = {
    position: 'absolute',
    left: `${widget.position.x}px`,
    top: `${widget.position.y}px`,
    width: `${widget.size.width}px`,
    height: `${widget.size.height}px`,
    zIndex: widget.position.z || 0,
    backgroundColor: '#161b22',
    border: '1px solid #30363d',
    borderRadius: '8px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  };

  const headerStyle: CSSProperties = {
    padding: '12px 16px',
    borderBottom: '1px solid #30363d',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'move',
    backgroundColor: '#0d1117',
  };

  const titleStyle: CSSProperties = {
    color: '#e6edf3',
    fontSize: '14px',
    fontWeight: 600,
    margin: 0,
  };

  const contentStyle: CSSProperties = {
    flex: 1,
    overflow: 'auto',
    padding: '16px',
  };

  const buttonStyle: CSSProperties = {
    background: 'none',
    border: 'none',
    color: '#8b949e',
    cursor: 'pointer',
    padding: '4px 8px',
    fontSize: '14px',
  };

  return (
    <div style={style} data-widget-id={widget.id}>
      <div style={headerStyle}>
        <h3 style={titleStyle}>{widget.config.title || widget.type}</h3>
        <div>
          {onRemove && (
            <button
              style={buttonStyle}
              onClick={() => onRemove(widget.id)}
              aria-label="Remove widget"
            >
              ×
            </button>
          )}
        </div>
      </div>
      <div style={contentStyle}>{children}</div>
    </div>
  );
}
