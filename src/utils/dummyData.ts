
import { Presentation, Slide, PresentationSettings } from '../types/presentation';

const defaultPresentationSettings: PresentationSettings = {
  title: 'Demo Presentation',
  author: 'Demo User',
  theme: 'white',
  transition: 'slide',
  controls: true,
  progress: true,
  center: true,
  touch: true,
  loop: false,
  rtl: false,
  shuffle: false,
  fragments: true,
  embedded: false,
  help: true,
  showNotes: false,
  autoSlide: 0,
  autoSlideStoppable: true,
  mouseWheel: false,
  hideAddressBar: true,
  previewLinks: false,
  focusBodyOnLoad: true,
  hash: false,
  respondToHashChanges: true,
  jumpToSlide: true,
  history: false
};

const dummySlides: Slide[] = [
  {
    id: 'slide-1',
    title: 'Welcome Slide',
    layout: 'title',
    content: [
      {
        id: 'title-1',
        type: 'text',
        content: 'Welcome to Our Presentation',
        style: {
          fontSize: '48px',
          fontFamily: 'Arial',
          color: '#2563eb',
          textAlign: 'center',
          fontWeight: 'bold',
          position: { x: 50, y: 200, width: 700, height: 100 }
        }
      },
      {
        id: 'subtitle-1',
        type: 'text',
        content: 'A comprehensive overview of our project',
        style: {
          fontSize: '24px',
          fontFamily: 'Arial',
          color: '#64748b',
          textAlign: 'center',
          position: { x: 50, y: 320, width: 700, height: 60 }
        }
      }
    ],
    notes: 'Welcome the audience and introduce the presentation topic'
  },
  {
    id: 'slide-2',
    title: 'About Us',
    layout: 'content',
    content: [
      {
        id: 'title-2',
        type: 'text',
        content: 'About Our Company',
        style: {
          fontSize: '36px',
          fontFamily: 'Arial',
          color: '#1e293b',
          textAlign: 'left',
          fontWeight: 'bold',
          position: { x: 50, y: 50, width: 700, height: 80 }
        }
      },
      {
        id: 'content-2',
        type: 'text',
        content: '• Founded in 2020\n• Focus on innovative solutions\n• Serving clients worldwide\n• Award-winning team',
        style: {
          fontSize: '20px',
          fontFamily: 'Arial',
          color: '#374151',
          textAlign: 'left',
          position: { x: 50, y: 150, width: 700, height: 300 }
        }
      }
    ],
    notes: 'Highlight key company milestones and achievements'
  },
  {
    id: 'slide-3',
    title: 'Our Services',
    layout: 'two-column',
    content: [
      {
        id: 'title-3',
        type: 'text',
        content: 'Our Services',
        style: {
          fontSize: '36px',
          fontFamily: 'Arial',
          color: '#1e293b',
          textAlign: 'center',
          fontWeight: 'bold',
          position: { x: 50, y: 50, width: 700, height: 80 }
        }
      },
      {
        id: 'services-left',
        type: 'text',
        content: 'Consulting\n• Strategic Planning\n• Process Optimization\n• Technology Assessment',
        style: {
          fontSize: '18px',
          fontFamily: 'Arial',
          color: '#374151',
          textAlign: 'left',
          position: { x: 50, y: 150, width: 320, height: 250 }
        }
      },
      {
        id: 'services-right',
        type: 'text',
        content: 'Development\n• Custom Software\n• Web Applications\n• Mobile Solutions',
        style: {
          fontSize: '18px',
          fontFamily: 'Arial',
          color: '#374151',
          textAlign: 'left',
          position: { x: 430, y: 150, width: 320, height: 250 }
        }
      }
    ],
    notes: 'Explain each service category and provide examples'
  },
  {
    id: 'slide-4',
    title: 'Thank You',
    layout: 'content',
    content: [
      {
        id: 'title-4',
        type: 'text',
        content: 'Thank You!',
        style: {
          fontSize: '48px',
          fontFamily: 'Arial',
          color: '#059669',
          textAlign: 'center',
          fontWeight: 'bold',
          position: { x: 50, y: 200, width: 700, height: 100 }
        }
      },
      {
        id: 'contact-4',
        type: 'text',
        content: 'Questions?\ncontact@company.com\n(555) 123-4567',
        style: {
          fontSize: '20px',
          fontFamily: 'Arial',
          color: '#6b7280',
          textAlign: 'center',
          position: { x: 50, y: 320, width: 700, height: 120 }
        }
      }
    ],
    notes: 'Open floor for questions and provide contact information'
  }
];

export const dummyPresentation: Presentation = {
  id: 'demo-presentation-1',
  settings: defaultPresentationSettings,
  slides: dummySlides,
  createdAt: '2024-01-15T10:00:00.000Z',
  updatedAt: '2024-01-15T14:30:00.000Z'
};
