/**
 * Dashboard Canvas
 * Main canvas area with grid layout for widgets
 */

import { ReactNode } from 'react';
import GridLayout from 'react-grid-layout';
import { useDashboardStore } from '../store/dashboardStore';
import 'react-grid-layout/css/styles.css';

interface DashboardCanvasProps {
  children?: ReactNode;
}

export function DashboardCanvas({ children }: DashboardCanvasProps) {
  const layout = useDashboardStore((state) => state.layout);
  const config = useDashboardStore((state) => state.config);
  const updateLayout = useDashboardStore((state) => state.updateLayout);

  return (
    <div className="flex-1 bg-gray-950 p-4 overflow-auto">
      <GridLayout
        className="layout"
        layout={layout}
        cols={config.cols}
        rowHeight={config.rowHeight}
        width={1200}
        margin={config.margin}
        containerPadding={config.containerPadding}
        isDraggable={config.isDraggable}
        isResizable={config.isResizable}
        compactType={config.compactType}
        onLayoutChange={updateLayout}
      >
        {children}
      </GridLayout>
    </div>
  );
}
