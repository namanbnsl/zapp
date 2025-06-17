
import { useState, useCallback, useEffect } from "react";

/**
 * Hook for managing panel resizing functionality
 * 
 * Handles:
 * - Panel width state
 * - Resize mode tracking
 * - Mouse event handling for resize operations
 * - localStorage persistence for panel sizes
 */
export const useResizing = () => {
  // Get initial panel widths from localStorage or use defaults
  const getInitialLeftWidth = () => {
    const saved = localStorage.getItem('leftPanelWidth');
    return saved ? parseInt(saved, 10) : 200;
  };

  const getInitialRightWidth = () => {
    const saved = localStorage.getItem('rightPanelWidth');
    return saved ? parseInt(saved, 10) : 320;
  };

  // Panel width states
  const [leftPanelWidth, setLeftPanelWidth] = useState(getInitialLeftWidth);
  const [rightPanelWidth, setRightPanelWidth] = useState(getInitialRightWidth);
  
  // Resize state tracking
  const [isResizingLeft, setIsResizingLeft] = useState(false);
  const [isResizingRight, setIsResizingRight] = useState(false);

  // Handle mouse move during resize
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isResizingLeft) {
        // Constrain left panel width between 160px and 400px
        const newWidth = Math.max(160, Math.min(400, e.clientX));
        setLeftPanelWidth(newWidth);
        localStorage.setItem('leftPanelWidth', newWidth.toString());
      }
      if (isResizingRight) {
        // Constrain right panel width between 280px and 500px
        const newWidth = Math.max(
          280,
          Math.min(500, window.innerWidth - e.clientX),
        );
        setRightPanelWidth(newWidth);
        localStorage.setItem('rightPanelWidth', newWidth.toString());
      }
    },
    [isResizingLeft, isResizingRight],
  );

  // Handle mouse up to end resize
  const handleMouseUp = useCallback(() => {
    setIsResizingLeft(false);
    setIsResizingRight(false);
  }, []);

  // Add event listeners for resizing
  useEffect(() => {
    if (isResizingLeft || isResizingRight) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      
      // Change cursor and disable text selection during resize
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      };
    }
  }, [isResizingLeft, isResizingRight, handleMouseMove, handleMouseUp]);

  // Functions to programmatically set panel widths (also saves to localStorage)
  const updateLeftPanelWidth = useCallback((width: number) => {
    const constrainedWidth = Math.max(160, Math.min(400, width));
    setLeftPanelWidth(constrainedWidth);
    localStorage.setItem('leftPanelWidth', constrainedWidth.toString());
  }, []);

  const updateRightPanelWidth = useCallback((width: number) => {
    const constrainedWidth = Math.max(280, Math.min(500, width));
    setRightPanelWidth(constrainedWidth);
    localStorage.setItem('rightPanelWidth', constrainedWidth.toString());
  }, []);

  return {
    leftPanelWidth,
    rightPanelWidth,
    isResizingLeft,
    isResizingRight,
    setIsResizingLeft,
    setIsResizingRight,
    updateLeftPanelWidth,
    updateRightPanelWidth,
  };
};
