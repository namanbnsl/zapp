
import React from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SlideRenderer } from "../slides/SlideRenderer";

interface MainSlideAreaProps {
  slides: any[];
  currentSlide: number;
  selectSlide: (index: number) => void;
}

/**
 * Main Slide Display Area Component
 * 
 * Contains:
 * - Large slide display
 * - Navigation arrows
 * - Slide content rendering
 */
export const MainSlideArea: React.FC<MainSlideAreaProps> = ({
  slides,
  currentSlide,
  selectSlide,
}) => {
  // Navigation functions
  const goToNext = () => {
    selectSlide((currentSlide + 1) % slides.length);
  };

  const goToPrevious = () => {
    selectSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  return (
    <main className="flex-1 flex flex-col min-w-0">
      <div className="flex-1 flex items-center justify-center p-4 bg-zinc-950">
        {/* Slide Display Card */}
        <Card className="w-full max-w-5xl aspect-video relative overflow-hidden shadow-2xl border-zinc-700 bg-zinc-900">
          <div className="w-full h-full bg-gradient-to-br from-zinc-900 to-blue-950 transition-all duration-500">
            {/* Render current slide content */}
            {slides[currentSlide] && (
              <SlideRenderer slide={slides[currentSlide]} />
            )}
          </div>

          {/* Previous Slide Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white border-white/20 backdrop-blur-sm"
            onClick={goToPrevious}
            title="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          {/* Next Slide Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white border-white/20 backdrop-blur-sm"
            onClick={goToNext}
            title="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </Card>
      </div>
    </main>
  );
};
