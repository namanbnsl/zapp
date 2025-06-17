import { useEffect } from "react";

interface UseKeyboardNavigationProps {
  selectSlide: (index: number) => void;
  currentSlide: number;
  slidesLength: number;
  setIsFullscreen: (isFullscreen: boolean) => void;
  onPreview: () => void;
  onExport: (format: string) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  isPlaying: boolean;
  onSave: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onCopy: () => void;
  onPaste: () => void;
  onCut: () => void;
  onToggleLeftPanel: () => void;
  onToggleRightPanel: () => void;
  onToggleFooter: () => void;
}

/**
 * Hook for handling keyboard navigation and shortcuts
 * 
 * Manages:
 * - Slide navigation (arrow keys, space)
 * - Playback controls (play/pause)
 * - Panel toggles (left, right, footer)
 * - Common shortcuts (save, export, etc.)
 */
export const useKeyboardNavigation = ({
  selectSlide,
  currentSlide,
  slidesLength,
  setIsFullscreen,
  onPreview,
  onExport,
  setIsPlaying,
  isPlaying,
  onSave,
  onUndo,
  onRedo,
  onCopy,
  onPaste,
  onCut,
  onToggleLeftPanel,
  onToggleRightPanel,
  onToggleFooter,
}: UseKeyboardNavigationProps) => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Don't handle keyboard shortcuts if user is typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      // Navigation
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        selectSlide((currentSlide + 1) % slidesLength);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        selectSlide((currentSlide - 1 + slidesLength) % slidesLength);
      } else if (e.key === "Home") {
        e.preventDefault();
        selectSlide(0);
      } else if (e.key === "End") {
        e.preventDefault();
        selectSlide(slidesLength - 1);
      }

      // Playback
      if (e.key === "p" || e.key === "P") {
        e.preventDefault();
        setIsPlaying(!isPlaying);
      }

      // Fullscreen
      if (e.key === "Escape") {
        e.preventDefault();
        setIsFullscreen(false);
      }

      // Panel toggles
      if (e.ctrlKey || e.metaKey) {
        if (e.key === "1") {
          e.preventDefault();
          onToggleLeftPanel();
        } else if (e.key === "2") {
          e.preventDefault();
          onToggleRightPanel();
        } else if (e.key === "3") {
          e.preventDefault();
          onToggleFooter();
        }
      }

      // Common shortcuts
      if (e.ctrlKey || e.metaKey) {
        if (e.key === "s") {
          e.preventDefault();
          onSave();
        } else if (e.key === "e") {
          e.preventDefault();
          onExport("pdf");
        } else if (e.key === "z") {
          e.preventDefault();
          if (e.shiftKey) {
            onRedo();
          } else {
            onUndo();
          }
        } else if (e.key === "y") {
          e.preventDefault();
          onRedo();
        } else if (e.key === "c") {
          e.preventDefault();
          onCopy();
        } else if (e.key === "v") {
          e.preventDefault();
          onPaste();
        } else if (e.key === "x") {
          e.preventDefault();
          onCut();
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [
    selectSlide,
    currentSlide,
    slidesLength,
    setIsFullscreen,
    onPreview,
    onExport,
    setIsPlaying,
    isPlaying,
    onSave,
    onUndo,
    onRedo,
    onCopy,
    onPaste,
    onCut,
    onToggleLeftPanel,
    onToggleRightPanel,
    onToggleFooter,
  ]);
};
