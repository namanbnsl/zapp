
import React from "react";

interface SlideRendererProps {
  slide: any;
}

/**
 * Slide Content Renderer Component
 * 
 * Responsible for rendering the actual content of a slide.
 * Handles different content types and applies styling.
 */
export const SlideRenderer: React.FC<SlideRendererProps> = ({ slide }) => {
  return (
    <div className="w-full h-full flex items-center justify-center p-8 md:p-16">
      <div className="text-center max-w-4xl">
        {/* Slide Title */}
        <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white leading-tight">
          {slide.title || "Untitled Slide"}
        </h2>

        {/* Slide Content */}
        {slide.content && slide.content.length > 0 && (
          <div className="space-y-4">
            {slide.content.map((item: any) => (
              <div
                key={item.id}
                className="text-xl md:text-2xl leading-relaxed text-white opacity-90 font-light"
                style={{
                  fontSize: item.style?.fontSize,
                  fontFamily: item.style?.fontFamily,
                  color: item.style?.color,
                  textAlign: item.style?.textAlign,
                }}
              >
                {item.content}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
