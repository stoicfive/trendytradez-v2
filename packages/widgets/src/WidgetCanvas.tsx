import React, { CSSProperties } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { Widget } from '@trendytradez/types';

interface WidgetCanvasProps {
  children: React.ReactNode;
  onDragEnd?: (widgetId: string, x: number, y: number) => void;
  style?: CSSProperties;
}

/**
 * Widget Canvas
 * Container for draggable widgets with grid layout
 */
export function WidgetCanvas({ children, onDragEnd, style }: WidgetCanvasProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;
    const widget = active.data.current?.widget as Widget | undefined;

    if (widget && onDragEnd) {
      const newX = widget.position.x + delta.x;
      const newY = widget.position.y + delta.y;
      onDragEnd(widget.id, newX, newY);
    }
  };

  const canvasStyle: CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: '#0d1117',
    overflow: 'auto',
    ...style,
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div style={canvasStyle}>{children}</div>
      <DragOverlay />
    </DndContext>
  );
}
