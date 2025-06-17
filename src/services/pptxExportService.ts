import PptxGenJS from 'pptxgenjs';
import { Slide, Presentation, PresentationSettings } from '../types/presentation';

export class PptxExportService {
  private static readonly SLIDE_WIDTH = 10; // inches (standard 16:9)
  private static readonly SLIDE_HEIGHT = 5.625; // inches (standard 16:9)
  private static readonly PIXELS_PER_INCH = 96; // Standard DPI
  
  // Convert pixels to inches for pptxgenjs
  private static pixelsToInches(pixels: number): number {
    return pixels / this.PIXELS_PER_INCH;
  }

  // Convert font size from px to points
  private static pxToPoints(pxSize: string): number {
    const px = parseInt(pxSize.replace('px', ''));
    return Math.round(px * 0.75); // 1px = 0.75pt
  }

  // Convert hex color to pptxgenjs format
  private static formatColor(color: string): string {
    return color.replace('#', '');
  }

  // Map CSS font family to PowerPoint compatible fonts
  private static mapFontFamily(fontFamily: string): string {
    const fontMap: { [key: string]: string } = {
      'Arial': 'Arial',
      'Helvetica': 'Helvetica',
      'Times New Roman': 'Times New Roman',
      'Georgia': 'Georgia',
      'Verdana': 'Verdana',
      'Courier New': 'Courier New',
      'Geist': 'Calibri', // Fallback for custom fonts
      'sans-serif': 'Calibri',
      'serif': 'Times New Roman',
      'monospace': 'Courier New'
    };
    
    return fontMap[fontFamily] || 'Calibri';
  }

  // Convert CSS text alignment to pptxgenjs format
  private static mapTextAlign(textAlign: string): 'left' | 'center' | 'right' | 'justify' {
    const alignMap: { [key: string]: 'left' | 'center' | 'right' | 'justify' } = {
      'left': 'left',
      'center': 'center',
      'right': 'right',
      'justify': 'justify'
    };
    
    return alignMap[textAlign] || 'left';
  }

  // Get theme colors based on presentation theme
  private static getThemeColors(theme: string) {
    const themes: { [key: string]: { background: string; text: string } } = {
      'white': { background: 'FFFFFF', text: '000000' },
      'black': { background: '000000', text: 'FFFFFF' },
      'league': { background: '2B2B2B', text: 'FFFFFF' },
      'beige': { background: 'F7F3DE', text: '333333' },
      'sky': { background: 'E6F3FF', text: '003366' },
      'night': { background: '1A1A2E', text: 'FFFFFF' },
      'serif': { background: 'F5F5F5', text: '2C3E50' },
      'simple': { background: 'FFFFFF', text: '333333' }
    };
    
    return themes[theme] || themes['white'];
  }

  public static async exportToPowerPoint(
    presentation: Presentation,
    filename?: string
  ): Promise<void> {
    try {
      // Create new presentation
      const pptx = new PptxGenJS();
      
      // Set presentation properties
      pptx.author = presentation.settings.author || 'zapp';
      pptx.company = 'zapp - Slideshows Fast';
      pptx.title = presentation.settings.title || 'Untitled Presentation';
      pptx.subject = 'Presentation created with zapp';
      
      // Set slide dimensions (16:9 aspect ratio)
      pptx.defineLayout({
        name: 'LAYOUT_16x9',
        width: this.SLIDE_WIDTH,
        height: this.SLIDE_HEIGHT
      });
      pptx.layout = 'LAYOUT_16x9';

      // Get theme colors
      const themeColors = this.getThemeColors(presentation.settings.theme);

      // Process each slide
      for (let i = 0; i < presentation.slides.length; i++) {
        const slide = presentation.slides[i];
        await this.addSlideToPresentation(pptx, slide, themeColors, i + 1);
      }

      // Generate and download the file
      const exportFilename = filename || `${presentation.settings.title || 'presentation'}.pptx`;
      await pptx.writeFile({ fileName: exportFilename });
      
      console.log(`PowerPoint presentation exported successfully: ${exportFilename}`);
      
    } catch (error) {
      console.error('Error exporting to PowerPoint:', error);
      throw new Error(`Failed to export PowerPoint presentation: ${error}`);
    }
  }

  private static async addSlideToPresentation(
    pptx: PptxGenJS,
    slide: Slide,
    themeColors: { background: string; text: string },
    slideNumber: number
  ): Promise<void> {
    // Add new slide
    const pptxSlide = pptx.addSlide();
    
    // Set slide background
    if (slide.background?.color) {
      pptxSlide.background = { color: this.formatColor(slide.background.color) };
    } else if (slide.background?.gradient) {
      // Handle gradient backgrounds (simplified)
      pptxSlide.background = { color: themeColors.background };
    } else {
      pptxSlide.background = { color: themeColors.background };
    }

    // Add slide number (optional)
    pptxSlide.addText(`${slideNumber}`, {
      x: this.pixelsToInches(750),
      y: this.pixelsToInches(550),
      w: this.pixelsToInches(50),
      h: this.pixelsToInches(30),
      fontSize: 10,
      color: themeColors.text,
      align: 'right',
      fontFace: 'Calibri'
    });

    // Process each content element
    for (const element of slide.content) {
      await this.addElementToSlide(pptxSlide, element, themeColors);
    }

    // Add speaker notes if they exist
    if (slide.notes && slide.notes.trim()) {
      pptxSlide.addNotes(slide.notes);
    }
  }

  private static async addElementToSlide(
    pptxSlide: any,
    element: any,
    themeColors: { background: string; text: string }
  ): Promise<void> {
    const position = element.style.position || { x: 50, y: 50, width: 200, height: 50 };
    
    switch (element.type) {
      case 'text':
        await this.addTextElement(pptxSlide, element, position, themeColors);
        break;
      case 'image':
        await this.addImageElement(pptxSlide, element, position);
        break;
      case 'shape':
        await this.addShapeElement(pptxSlide, element, position);
        break;
      default:
        console.warn(`Unsupported element type: ${element.type}`);
    }
  }

  private static async addTextElement(
    pptxSlide: any,
    element: any,
    position: { x: number; y: number; width: number; height: number },
    themeColors: { background: string; text: string }
  ): Promise<void> {
    // Convert pixel positions to inches
    const x = this.pixelsToInches(position.x);
    const y = this.pixelsToInches(position.y);
    const w = this.pixelsToInches(position.width);
    const h = this.pixelsToInches(position.height);

    // Prepare text options with pixel-perfect styling
    const textOptions: any = {
      x,
      y,
      w,
      h,
      fontSize: this.pxToPoints(element.style.fontSize || '16px'),
      fontFace: this.mapFontFamily(element.style.fontFamily || 'Arial'),
      color: this.formatColor(element.style.color || `#${themeColors.text}`),
      align: this.mapTextAlign(element.style.textAlign || 'left'),
      valign: 'top',
      wrap: true,
      autoFit: false,
      shrinkText: false
    };

    // Apply font weight
    if (element.style.fontWeight === 'bold') {
      textOptions.bold = true;
    }

    // Apply font style
    if (element.style.fontStyle === 'italic') {
      textOptions.italic = true;
    }

    // Apply background color if specified
    if (element.style.backgroundColor && element.style.backgroundColor !== 'transparent') {
      textOptions.fill = { color: this.formatColor(element.style.backgroundColor) };
    }

    // Handle multi-line text with proper line breaks
    const content = element.content.replace(/\n/g, '\r\n');

    // Add text to slide
    pptxSlide.addText(content, textOptions);
  }

  private static async addImageElement(
    pptxSlide: any,
    element: any,
    position: { x: number; y: number; width: number; height: number }
  ): Promise<void> {
    try {
      const x = this.pixelsToInches(position.x);
      const y = this.pixelsToInches(position.y);
      const w = this.pixelsToInches(position.width);
      const h = this.pixelsToInches(position.height);

      // Add image (assuming element.content contains image URL or base64)
      pptxSlide.addImage({
        path: element.content,
        x,
        y,
        w,
        h,
        sizing: { type: 'contain', w, h }
      });
    } catch (error) {
      console.warn('Failed to add image element:', error);
      // Fallback: add a placeholder text
      this.addTextElement(pptxSlide, {
        ...element,
        content: '[Image placeholder]',
        type: 'text'
      }, position, { background: 'FFFFFF', text: '666666' });
    }
  }

  private static async addShapeElement(
    pptxSlide: any,
    element: any,
    position: { x: number; y: number; width: number; height: number }
  ): Promise<void> {
    const x = this.pixelsToInches(position.x);
    const y = this.pixelsToInches(position.y);
    const w = this.pixelsToInches(position.width);
    const h = this.pixelsToInches(position.height);

    // Add basic rectangle shape (can be extended for other shapes)
    pptxSlide.addShape(pptx.ShapeType.rect, {
      x,
      y,
      w,
      h,
      fill: { color: this.formatColor(element.style.backgroundColor || '#CCCCCC') },
      line: { color: this.formatColor(element.style.color || '#000000'), width: 1 }
    });
  }

  // Utility method to export current slide only
  public static async exportCurrentSlide(
    slide: Slide,
    settings: PresentationSettings,
    filename?: string
  ): Promise<void> {
    const tempPresentation: Presentation = {
      id: 'temp-export',
      settings,
      slides: [slide],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await this.exportToPowerPoint(tempPresentation, filename);
  }

  // Method to export specific slides
  public static async exportSelectedSlides(
    slides: Slide[],
    settings: PresentationSettings,
    filename?: string
  ): Promise<void> {
    const tempPresentation: Presentation = {
      id: 'temp-export',
      settings,
      slides,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await this.exportToPowerPoint(tempPresentation, filename);
  }
}