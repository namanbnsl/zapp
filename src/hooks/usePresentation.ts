import { useState, useCallback } from 'react';
import { Slide, Presentation, PresentationSettings } from '../types/presentation';
import { dummyPresentation } from '../utils/dummyData';


const createDefaultSlide = (id: string): Slide => ({
  id,
  title: 'New Slide',
  layout: 'content',
  content: [
    {
      id: `title-${Date.now()}`,
      type: 'text',
      content: 'Click to add title',
      style: {
        fontSize: '32px',
        fontFamily: 'Arial',
        color: '#000000',
        textAlign: 'center',
        fontWeight: 'bold',
        position: { x: 50, y: 50, width: 700, height: 80 }
      }
    },
    {
      id: `content-${Date.now()}`,
      type: 'text',
      content: 'Click to add content',
      style: {
        fontSize: '18px',
        fontFamily: 'Arial',
        color: '#000000',
        textAlign: 'left',
        position: { x: 50, y: 150, width: 700, height: 400 }
      }
    }
  ],
  notes: ''
});

export const usePresentation = () => {
  const [presentation, setPresentation] = useState<Presentation>(dummyPresentation);

  const [currentSlide, setCurrentSlide] = useState(0);

  const addSlide = useCallback((layoutType: Slide['layout'] = 'content') => {
    const newSlide = createDefaultSlide(`slide-${Date.now()}`);
    newSlide.layout = layoutType;

    setPresentation(prev => ({
      ...prev,
      slides: [...prev.slides, newSlide],
      updatedAt: new Date().toISOString()
    }));

    setCurrentSlide(presentation.slides.length);
  }, [presentation.slides.length]);

  const deleteSlide = useCallback((index: number) => {
    if (presentation.slides.length <= 1) return;

    setPresentation(prev => ({
      ...prev,
      slides: prev.slides.filter((_, i) => i !== index),
      updatedAt: new Date().toISOString()
    }));

    if (currentSlide >= index && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  }, [presentation.slides.length, currentSlide]);

  const selectSlide = useCallback((index: number) => {
    if (index >= 0 && index < presentation.slides.length) {
      setCurrentSlide(index);
    }
  }, [presentation.slides.length]);

  const updateSlide = useCallback((index: number, updatedSlide: Partial<Slide>) => {
    setPresentation(prev => ({
      ...prev,
      slides: prev.slides.map((slide, i) =>
        i === index ? { ...slide, ...updatedSlide } : slide
      ),
      updatedAt: new Date().toISOString()
    }));
  }, []);

  const reorderSlides = useCallback((fromIndex: number, toIndex: number) => {
    setPresentation(prev => {
      const newSlides = [...prev.slides];
      const [movedSlide] = newSlides.splice(fromIndex, 1);
      newSlides.splice(toIndex, 0, movedSlide);

      return {
        ...prev,
        slides: newSlides,
        updatedAt: new Date().toISOString()
      };
    });

    if (currentSlide === fromIndex) {
      setCurrentSlide(toIndex);
    }
  }, [currentSlide]);

  const updatePresentationSettings = useCallback((settings: Partial<PresentationSettings>) => {
    setPresentation(prev => ({
      ...prev,
      settings: { ...prev.settings, ...settings },
      updatedAt: new Date().toISOString()
    }));
  }, []);

  const loadPresentation = useCallback((loadedPresentation: Presentation) => {
    setPresentation(loadedPresentation);
    setCurrentSlide(0);
  }, []);

  return {
    presentation,
    slides: presentation.slides,
    currentSlide,
    addSlide,
    deleteSlide,
    selectSlide,
    updateSlide,
    reorderSlides,
    updatePresentationSettings,
    loadPresentation
  };
};