import React, { useEffect, useRef } from 'react';
import { X, Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { Slide, PresentationSettings } from '../types/presentation';

interface PreviewModalProps {
  slides: Slide[];
  onClose: () => void;
  presentationSettings: PresentationSettings;
}

export const PreviewModal: React.FC<PreviewModalProps> = ({
  slides,
  onClose,
  presentationSettings
}) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          setCurrentSlide(prev => Math.max(0, prev - 1));
          break;
        case 'ArrowRight':
        case ' ':
          setCurrentSlide(prev => Math.min(slides.length - 1, prev + 1));
          break;
        case 'Escape':
          onClose();
          break;
        case 'Home':
          setCurrentSlide(0);
          break;
        case 'End':
          setCurrentSlide(slides.length - 1);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [slides.length, onClose]);

  useEffect(() => {
    if (isPlaying && presentationSettings.autoSlide > 0) {
      const timer = setTimeout(() => {
        if (currentSlide < slides.length - 1) {
          setCurrentSlide(prev => prev + 1);
        } else {
          setIsPlaying(false);
        }
      }, presentationSettings.autoSlide * 1000);

      return () => clearTimeout(timer);
    }
  }, [currentSlide, isPlaying, presentationSettings.autoSlide, slides.length]);

  const renderSlideContent = (slide: Slide) => {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center p-8">
        {slide.content.map(element => (
          <div
            key={element.id}
            className="mb-4"
            style={{
              fontSize: element.style.fontSize,
              fontFamily: element.style.fontFamily,
              color: element.style.color,
              textAlign: element.style.textAlign,
              fontWeight: element.style.fontWeight,
              fontStyle: element.style.fontStyle,
              backgroundColor: element.style.backgroundColor
            }}
          >
            {element.content}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Presentation Header */}
      <div className="absolute top-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 flex items-center justify-between z-10">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold">{presentationSettings.title}</h2>
          <span className="text-sm opacity-75">
            Slide {currentSlide + 1} of {slides.length}
          </span>
        </div>
        
        <button
          onClick={onClose}
          className="p-2 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Slide Content */}
      <div 
        ref={revealRef}
        className="flex-1 bg-white flex items-center justify-center"
        style={{
          background: slides[currentSlide]?.background?.color || 
                     slides[currentSlide]?.background?.gradient || 
                     '#ffffff'
        }}
      >
        {slides[currentSlide] && renderSlideContent(slides[currentSlide])}
      </div>

      {/* Presentation Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={() => setCurrentSlide(0)}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
            disabled={currentSlide === 0}
          >
            <SkipBack className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
            disabled={currentSlide === 0}
          >
            ←
          </button>
          
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-3 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
          
          <button
            onClick={() => setCurrentSlide(prev => Math.min(slides.length - 1, prev + 1))}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
            disabled={currentSlide === slides.length - 1}
          >
            →
          </button>
          
          <button
            onClick={() => setCurrentSlide(slides.length - 1)}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
            disabled={currentSlide === slides.length - 1}
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 bg-white bg-opacity-20 rounded-full h-1">
          <div
            className="bg-blue-500 h-1 rounded-full transition-all duration-300"
            style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          />
        </div>

        {/* Speaker Notes */}
        {slides[currentSlide]?.notes && (
          <div className="mt-4 p-3 bg-white bg-opacity-10 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Volume2 className="w-4 h-4" />
              <span className="text-sm font-medium">Speaker Notes</span>
            </div>
            <p className="text-sm opacity-90">{slides[currentSlide].notes}</p>
          </div>
        )}
      </div>
    </div>
  );
};