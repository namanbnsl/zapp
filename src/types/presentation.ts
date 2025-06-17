export interface SlideContent {
  type: 'text' | 'image' | 'video' | 'shape';
  id: string;
  content: string;
  style: {
    fontSize?: string;
    fontFamily?: string;
    color?: string;
    backgroundColor?: string;
    textAlign?: 'left' | 'center' | 'right' | 'justify';
    fontWeight?: 'normal' | 'bold';
    fontStyle?: 'normal' | 'italic';
    position?: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
  };
}

export interface Slide {
  id: string;
  title: string;
  layout: 'title' | 'content' | 'two-column' | 'image-text' | 'blank';
  content: SlideContent[];
  notes: string;
  transition?: string;
  background?: {
    color?: string;
    image?: string;
    gradient?: string;
  };
}

export interface PresentationSettings {
  title: string;
  author: string;
  theme: string;
  transition: string;
  controls: boolean;
  progress: boolean;
  center: boolean;
  touch: boolean;
  loop: boolean;
  rtl: boolean;
  shuffle: boolean;
  fragments: boolean;
  embedded: boolean;
  help: boolean;
  showNotes: boolean;
  autoSlide: number;
  autoSlideStoppable: boolean;
  mouseWheel: boolean;
  hideAddressBar: boolean;
  previewLinks: boolean;
  focusBodyOnLoad: boolean;
  hash: boolean;
  respondToHashChanges: boolean;
  jumpToSlide: boolean;
  history: boolean;
}

export interface Presentation {
  id: string;
  settings: PresentationSettings;
  slides: Slide[];
  createdAt: string;
  updatedAt: string;
}