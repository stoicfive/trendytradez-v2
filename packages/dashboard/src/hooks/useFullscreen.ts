/**
 * Fullscreen hook
 */

import { useEffect } from 'react';
import { useDashboardStore } from '../store/dashboardStore';

export function useFullscreen() {
  const isFullscreen = useDashboardStore((state) => state.isFullscreen);
  const toggleFullscreen = useDashboardStore((state) => state.toggleFullscreen);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!document.fullscreenElement;
      if (isCurrentlyFullscreen !== isFullscreen) {
        toggleFullscreen();
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [isFullscreen, toggleFullscreen]);

  const enterFullscreen = async () => {
    try {
      await document.documentElement.requestFullscreen();
    } catch (error) {
      console.error('Error entering fullscreen:', error);
    }
  };

  const exitFullscreen = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error('Error exiting fullscreen:', error);
    }
  };

  return {
    isFullscreen,
    enterFullscreen,
    exitFullscreen,
    toggleFullscreen: async () => {
      if (isFullscreen) {
        await exitFullscreen();
      } else {
        await enterFullscreen();
      }
    },
  };
}
