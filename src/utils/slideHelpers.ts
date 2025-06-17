
import { SLIDE_PREVIEW_COLORS } from "./constants";

/**
 * Slide Helper Utilities
 * 
 * Collection of utility functions for working with slides:
 * - Preview generation
 * - Content processing
 * - Slide manipulation
 */

/**
 * Get preview styling for a slide based on its index
 * 
 * @param index - The slide index
 * @returns Object containing thumbnail and border color classes
 */
export const getSlidePreview = (index: number) => {
  const { BACKGROUNDS, BORDERS } = SLIDE_PREVIEW_COLORS;
  
  return {
    thumbnail: BACKGROUNDS[index % BACKGROUNDS.length],
    borderColor: BORDERS[index % BORDERS.length],
  };
};

/**
 * Calculate presentation progress as a percentage
 * 
 * @param currentSlide - Current slide index (0-based)
 * @param totalSlides - Total number of slides
 * @returns Progress percentage (0-100)
 */
export const calculateProgress = (currentSlide: number, totalSlides: number): number => {
  if (totalSlides === 0) return 0;
  return ((currentSlide + 1) / totalSlides) * 100;
};

/**
 * Get slide navigation bounds
 * 
 * @param currentSlide - Current slide index
 * @param totalSlides - Total number of slides
 * @returns Object with navigation information
 */
export const getNavigationBounds = (currentSlide: number, totalSlides: number) => {
  return {
    isFirstSlide: currentSlide === 0,
    isLastSlide: currentSlide === totalSlides - 1,
    canGoNext: currentSlide < totalSlides - 1,
    canGoPrevious: currentSlide > 0,
  };
};

/**
 * Generate a unique slide ID
 * 
 * @returns Unique string ID for a slide
 */
export const generateSlideId = (): string => {
  return `slide-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Create a new empty slide object
 * 
 * @param title - Optional title for the slide
 * @returns New slide object with default structure
 */
export const createEmptySlide = (title: string = "New Slide") => {
  return {
    id: generateSlideId(),
    title,
    layout: "content",
    content: [],
    notes: "",
    style: {
      background: "gradient",
      theme: "default",
    },
  };
};

/**
 * Validate slide content structure
 * 
 * @param slide - Slide object to validate
 * @returns Boolean indicating if slide is valid
 */
export const isValidSlide = (slide: any): boolean => {
  return (
    slide &&
    typeof slide.id === "string" &&
    typeof slide.title === "string" &&
    Array.isArray(slide.content)
  );
};
