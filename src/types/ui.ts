
/**
 * UI-Specific Type Definitions
 * 
 * Types related to user interface components and interactions
 */

// Panel state types
export interface PanelState {
  isVisible: boolean;
  width: number;
  isResizing: boolean;
}

// Application view state
export interface ViewState {
  isFullscreen: boolean;
  showLeftPanel: boolean;
  showRightPanel: boolean;
  isPlaying: boolean;
}

// Resize handling types
export interface ResizeState {
  leftPanelWidth: number;
  rightPanelWidth: number;
  isResizingLeft: boolean;
  isResizingRight: boolean;
}

// Navigation state
export interface NavigationState {
  currentSlide: number;
  totalSlides: number;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

// Chat message types for AI assistant
export interface ChatMessage {
  id: string | number;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
}

// Keyboard shortcut configuration
export interface KeyboardShortcut {
  key: string;
  description: string;
  action: string;
}

// Export options
export interface ExportOption {
  format: string;
  label: string;
  description: string;
}

// Component props types for better type safety
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface SlideComponentProps extends BaseComponentProps {
  slide: any; // Will be replaced with proper Slide type from presentation.ts
  isSelected?: boolean;
  onSelect?: () => void;
}

export interface LayoutComponentProps extends BaseComponentProps {
  isVisible?: boolean;
  width?: number;
}
