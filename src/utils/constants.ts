
/**
 * Application Constants
 * 
 * Centralized location for all application constants including:
 * - Default values
 * - Configuration options
 * - UI constants
 */

// Slideshow timing constants
export const SLIDESHOW_CONFIG = {
  AUTO_ADVANCE_INTERVAL: 4000, // 4 seconds
  TRANSITION_DURATION: 500, // 0.5 seconds
} as const;

// Panel size constraints
export const PANEL_CONSTRAINTS = {
  LEFT_PANEL: {
    MIN_WIDTH: 160,
    MAX_WIDTH: 400,
    DEFAULT_WIDTH: 200, // Used when no localStorage value exists
  },
  RIGHT_PANEL: {
    MIN_WIDTH: 280,
    MAX_WIDTH: 500,
    DEFAULT_WIDTH: 320, // Used when no localStorage value exists
  },
} as const;

// Slide preview colors (cycling through these for visual variety)
export const SLIDE_PREVIEW_COLORS = {
  BACKGROUNDS: [
    "bg-orange-200",
    "bg-white",
    "bg-zinc-100",
    "bg-pink-200",
    "bg-zinc-50",
    "bg-zinc-100",
    "bg-teal-300",
    "bg-blue-900",
    "bg-yellow-200",
    "bg-pink-100",
  ],
  BORDERS: [
    "border-orange-400",
    "border-red-500",
    "border-blue-600",
    "border-zinc-600",
    "border-zinc-500",
    "border-zinc-500",
    "border-teal-600",
    "border-blue-800",
    "border-yellow-600",
    "border-zinc-500",
  ],
} as const;

// Keyboard shortcuts
export const KEYBOARD_SHORTCUTS = {
  // Navigation
  NEXT_SLIDE: ["ArrowRight", " "], // Right arrow or spacebar
  PREVIOUS_SLIDE: ["ArrowLeft"],
  FIRST_SLIDE: ["Home"],
  LAST_SLIDE: ["End"],
  EXIT_FULLSCREEN: ["Escape"],
  
  // Presentation
  START_SLIDESHOW: ["F5"],
  PLAY_PAUSE: ["P", "p"],
  
  // File operations
  SAVE: ["Ctrl+S"],
  EXPORT: ["Ctrl+E"],
  
  // Editing
  UNDO: ["Ctrl+Z"],
  REDO: ["Ctrl+Y", "Ctrl+Shift+Z"],
  COPY: ["Ctrl+C"],
  PASTE: ["Ctrl+V"],
  CUT: ["Ctrl+X"],
  
  // Formatting
  BOLD: ["Ctrl+B"],
  ITALIC: ["Ctrl+I"],
  UNDERLINE: ["Ctrl+U"],
  
  // Help
  TOGGLE_HELP: ["?"],
  
  // UI toggles
  TOGGLE_LEFT_PANEL: ["Ctrl+1"],
  TOGGLE_RIGHT_PANEL: ["Ctrl+2"],
} as const;

// Export format options
export const EXPORT_FORMATS = {
  PDF: "pdf",
  HTML: "html",
  IMAGES: "images",
} as const;
