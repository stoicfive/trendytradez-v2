import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import type { Widget } from '@trendytradez/types';
import { WidgetContainer } from './WidgetContainer';

interface DraggableWidgetProps {
  widget: Widget;
  children: React.ReactNode;
  onRemove?: (id: string) => void;
}

/**
 * Draggable Widget
 * Makes widgets draggable using @dnd-kit
 */
export function DraggableWidget({ widget, children, onRemove }: DraggableWidgetProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: widget.id,
    data: { widget },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    cursor: isDragging ? 'grabbing' : 'grab',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <WidgetContainer widget={widget} onRemove={onRemove}>
        {children}
      </WidgetContainer>
    </div>
  );
}
