/**
 * Dashboard store tests
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { useDashboardStore } from '../src/store/dashboardStore';

describe('Dashboard Store', () => {
  beforeEach(() => {
    // Reset store before each test
    useDashboardStore.getState().reset();
  });

  it('should have initial state', () => {
    const state = useDashboardStore.getState();
    
    expect(state.widgets).toEqual([]);
    expect(state.layout).toEqual([]);
    expect(state.isFullscreen).toBe(false);
    expect(state.isSidebarOpen).toBe(true);
    expect(state.isToolbarVisible).toBe(true);
  });

  it('should toggle fullscreen', () => {
    const { toggleFullscreen } = useDashboardStore.getState();
    
    toggleFullscreen();
    expect(useDashboardStore.getState().isFullscreen).toBe(true);
    
    toggleFullscreen();
    expect(useDashboardStore.getState().isFullscreen).toBe(false);
  });

  it('should toggle sidebar', () => {
    const { toggleSidebar } = useDashboardStore.getState();
    
    toggleSidebar();
    expect(useDashboardStore.getState().isSidebarOpen).toBe(false);
    
    toggleSidebar();
    expect(useDashboardStore.getState().isSidebarOpen).toBe(true);
  });

  it('should update layout', () => {
    const { updateLayout } = useDashboardStore.getState();
    const newLayout = [{ i: 'test', x: 0, y: 0, w: 2, h: 2 }];
    
    updateLayout(newLayout);
    expect(useDashboardStore.getState().layout).toEqual(newLayout);
  });

  it('should reset to initial state', () => {
    const { toggleFullscreen, toggleSidebar, reset } = useDashboardStore.getState();
    
    toggleFullscreen();
    toggleSidebar();
    
    reset();
    
    const state = useDashboardStore.getState();
    expect(state.isFullscreen).toBe(false);
    expect(state.isSidebarOpen).toBe(true);
  });
});
