import React from "react";

interface SlideRendererProps {
  slide: any;
}

/**
 * Slide Content Renderer Component
 * 
 * Responsible for rendering the actual content of a slide.
 * Handles different content types and applies styling.
 * 
 * Canvas dimensions: 800x450 (16:9 aspect ratio)
 */
export const SlideRenderer: React.FC<SlideRendererProps> = ({ slide }) => {
  return (
    <div 
      className="w-full h-full flex items-center justify-center p-8 md:p-16 relative"
      style={{
        background: slide.background?.gradient || 
                   slide.background?.color || 
                   'linear-gradient(135deg, #1e293b 0%, #1e3a8a 100%)', // Default gradient
        minHeight: '450px', // Ensure consistent canvas height
        aspectRatio: '16/9' // Maintain aspect ratio
      }}
    >
      <div className="text-center max-w-4xl relative z-10">
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
                  fontWeight: item.style?.fontWeight,
                  fontStyle: item.style?.fontStyle,
                  // Position elements absolutely if position is specified
                  ...(item.style?.position && {
                    position: 'absolute',
                    left: `${(item.style.position.x / 800) * 100}%`, // Normalize to percentage
                    top: `${(item.style.position.y / 450) * 100}%`,   // Normalize to percentage
                    width: `${(item.style.position.width / 800) * 100}%`,
                    height: `${(item.style.position.height / 450) * 100}%`,
                    transform: 'none', // Remove centering transform for positioned elements
                  })
                }}
              >
                {item.content}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Debug info for canvas dimensions (remove in production) */}
      <div className="absolute bottom-2 right-2 text-xs text-white/50 font-mono">
        Canvas: 800×450
      </div>
    </div>
  );
};