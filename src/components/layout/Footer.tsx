import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Play, Pause, RotateCcw } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface FooterProps {
  slides: any[];
  currentSlide: number;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  selectSlide: (index: number) => void;
}

/**
 * Application Footer Component
 *
 * Contains:
 * - Progress bar showing presentation progress
 * - Playback controls (play/pause/reset)
 * - Slide indicator dots
 * - Keyboard shortcut hints
 */
export const Footer: React.FC<FooterProps> = ({
  slides,
  currentSlide,
  isPlaying,
  setIsPlaying,
  selectSlide,
}) => {
  // Calculate progress percentage
  const progress = (currentSlide / slides.length) * 100;

  // Auto-advance slides when playing
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        selectSlide((currentSlide + 1) % slides.length);
      }, 4000); // 4 second intervals
      return () => clearInterval(interval);
    }
  }, [isPlaying, currentSlide, slides.length, selectSlide]);

  // Playback control functions
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const resetSlideshow = () => {
    selectSlide(0);
    setIsPlaying(false);
  };

  return (
    <footer className="bg-zinc-900 border-t border-zinc-800 p-3">
      <div className="max-w-5xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-3">
          <Progress value={progress} className="h-1 bg-zinc-800" />
        </div>

        <div className="flex items-center justify-between">
          {/* Left Controls - Playback */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={togglePlayPause}
              className="text-zinc-400 hover:text-white hover:bg-zinc-800 h-7 w-7 p-0"
              title={isPlaying ? "Pause slideshow (P)" : "Play slideshow (P)"}
            >
              {isPlaying ? (
                <Pause className="w-3 h-3" />
              ) : (
                <Play className="w-3 h-3" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetSlideshow}
              className="text-zinc-400 hover:text-white hover:bg-zinc-800 h-7 w-7 p-0"
              title="Reset to first slide (Home)"
            >
              <RotateCcw className="w-3 h-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => selectSlide((currentSlide - 1 + slides.length) % slides.length)}
              className="text-zinc-400 hover:text-white hover:bg-zinc-800 h-7 w-7 p-0"
              title="Previous slide (←)"
            >
              <ChevronLeft className="w-3 h-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => selectSlide((currentSlide + 1) % slides.length)}
              className="text-zinc-400 hover:text-white hover:bg-zinc-800 h-7 w-7 p-0"
              title="Next slide (→ or Space)"
            >
              <ChevronRight className="w-3 h-3" />
            </Button>
          </div>

          {/* Center - Slide Indicators */}
          <div className="flex items-center gap-1">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => selectSlide(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-blue-500 w-6" // Active slide indicator
                    : "bg-zinc-700 hover:bg-zinc-600 w-1.5" // Inactive slide indicator
                }`}
                aria-label={`Go to slide ${index + 1}`}
                title={`Slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Right Info - Keyboard Shortcuts */}
          <div className="flex items-center gap-4 text-xs text-zinc-500">
            <div className="hidden sm:flex items-center gap-2">
              <span>Use ← → keys to navigate</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};