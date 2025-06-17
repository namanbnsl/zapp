import { useState } from "react";

/**
 * Hook for managing global application state
 * 
 * This hook centralizes the management of UI state such as:
 * - Play/pause state for slideshow
 * - Fullscreen mode
 * - Panel visibility (left, right, footer)
 */
export const useAppState = () => {
  // Slideshow playback state
  const [isPlaying, setIsPlaying] = useState(false);

  // Fullscreen mode state
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Panel visibility states
  const [showLeftPanel, setShowLeftPanel] = useState(true);
  const [showRightPanel, setShowRightPanel] = useState(true);
  const [showFooter, setShowFooter] = useState(true);

  return {
    isPlaying,
    setIsPlaying,
    isFullscreen,
    setIsFullscreen,
    showLeftPanel,
    setShowLeftPanel,
    showRightPanel,
    setShowRightPanel,
    showFooter,
    setShowFooter,
  };
};
