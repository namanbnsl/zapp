import PptxGenJS from 'pptxgenjs';
import { Slide, Presentation, PresentationSettings } from '../types/presentation';

export class PptxExportService {
  private static readonly SLIDE_WIDTH = 10; // inches (standard 16:9)
  private static readonly SLIDE_HEIGHT = 5.625; // inches (standard 16:9)
  private static readonly PIXELS_PER_INCH = 96; // Standard DPI
  
  // Canvas dimensions from your app (based on MainSlideArea aspect-video)
  private static readonly APP_CANVAS_WIDTH = 800; // pixels - typical aspect-video width
  private static readonly APP_CANVAS_HEIGHT = 450; // pixels - typical aspect-video height (16:9)
  
  // Convert pixels to inches with normalization
  private static pixelsToInches(pixels: number, isWidth: boolean = true): number {
    // Normalize based on canvas dimensions
    const canvasSize = isWidth ? this.APP_CANVAS_WIDTH : this.APP_CANVAS_HEIGHT;
    const slideSize = isWidth ? this.SLIDE_WIDTH : this.SLIDE_HEIGHT;
    
    // Convert to normalized ratio, then to inches
    const normalizedRatio = pixels / canvasSize;
    return normalizedRatio * slideSize;
  }

  // Convert font size from px to points with scaling
  private static pxToPoints(pxSize: string): number {
    const px = parseInt(pxSize.replace('px', ''));
    // Scale font size based on canvas ratio
    const scaleFactor = this.SLIDE_WIDTH / (this.APP_CANVAS_WIDTH / this.PIXELS_PER_INCH);
    return Math.round(px * 0.75 * scaleFactor);
  }

  // Convert hex color to pptxgenjs format
  private static formatColor(color: string): string {
    if (!color) return 'FFFFFF';
    return color.replace('#', '').toUpperCase();
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
      'Geist': 'Calibri',
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

  // Extract gradient colors and create background
  private static parseGradient(gradientString: string): { color: string; gradient?: any } {
    // Handle CSS gradients like "bg-gradient-to-br from-zinc-900 to-blue-950"
    if (gradientString.includes('gradient')) {
      // Default gradient colors based on your app's styling
      return {
        color: '1E293B', // zinc-900 equivalent
        gradient: {
          type: 'linear',
          angle: 135, // br = bottom-right = 135 degrees
          colors: [
            { color: '1E293B', position: 0 },   // zinc-900
            { color: '1E3A8A', position: 100 }  // blue-950
          ]
        }
      };
    }
    
    // Handle solid colors
    return { color: this.formatColor(gradientString) };
  }

  // Get theme colors and backgrounds
  private static getThemeBackground(theme: string) {
    const themes: { [key: string]: any } = {
      'white': { color: 'FFFFFF' },
      'black': { color: '000000' },
      'league': { color: '2B2B2B' },
      'beige': { color: 'F7F3DE' },
      'sky': { color: 'E6F3FF' },
      'night': { color: '1A1A2E' },
      'serif': { color: 'F5F5F5' },
      'simple': { color: 'FFFFFF' },
      // Default gradient background like your app
      'default': {
        color: '1E293B',
        gradient: {
          type: 'linear',
          angle: 135,
          colors: [
            { color: '1E293B', position: 0 },   // zinc-900
            { color: '1E3A8A', position: 100 }  // blue-950
          ]
        }
      }
    };
    
    return themes[theme] || themes['default'];
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

      // Process each slide
      for (let i = 0; i < presentation.slides.length; i++) {
        const slide = presentation.slides[i];
        await this.addSlideToPresentation(pptx, slide, presentation.settings, i + 1);
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
    settings: PresentationSettings,
    slideNumber: number
  ): Promise<void> {
    // Add new slide
    const pptxSlide = pptx.addSlide();
    
    // Set slide background - handle gradients properly
    let backgroundConfig = this.getThemeBackground(settings.theme);
    
    // Override with slide-specific background if available
    if (slide.background?.color) {
      backgroundConfig = { color: this.formatColor(slide.background.color) };
    } else if (slide.background?.gradient) {
      backgroundConfig = this.parseGradient(slide.background.gradient);
    }
    
    // Apply background
    if (backgroundConfig.gradient) {
      // For gradients, use a shape that covers the entire slide
      pptxSlide.addShape(pptx.ShapeType.rect, {
        x: 0,
        y: 0,
        w: this.SLIDE_WIDTH,
        h: this.SLIDE_HEIGHT,
        fill: {
          type: 'gradient',
          angle: backgroundConfig.gradient.angle || 135,
          colors: backgroundConfig.gradient.colors.map((c: any) => ({
            color: c.color,
            position: c.position
          }))
        },
        line: { type: 'none' }
      });
    } else {
      pptxSlide.background = { color: backgroundConfig.color };
    }

    // Process each content element with normalized positioning
    for (const element of slide.content) {
      await this.addElementToSlide(pptxSlide, element, settings);
    }

    // Add speaker notes if they exist
    if (slide.notes && slide.notes.trim()) {
      pptxSlide.addNotes(slide.notes);
    }
  }

  private static async addElementToSlide(
    pptxSlide: any,
    element: any,
    settings: PresentationSettings
  ): Promise<void> {
    // Use normalized positioning
    const position = element.style.position || { x: 50, y: 50, width: 200, height: 50 };
    
    switch (element.type) {
      case 'text':
        await this.addTextElement(pptxSlide, element, position, settings);
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
    settings: PresentationSettings
  ): Promise<void> {
    // Convert pixel positions to inches with normalization
    const x = this.pixelsToInches(position.x, true);
    const y = this.pixelsToInches(position.y, false);
    const w = this.pixelsToInches(position.width, true);
    const h = this.pixelsToInches(position.height, false);

    // Determine default text color based on theme
    const isDarkTheme = ['black', 'league', 'night'].includes(settings.theme);
    const defaultTextColor = isDarkTheme ? 'FFFFFF' : '000000';

    // Prepare text options with pixel-perfect styling
    const textOptions: any = {
      x,
      y,
      w,
      h,
      fontSize: this.pxToPoints(element.style.fontSize || '16px'),
      fontFace: this.mapFontFamily(element.style.fontFamily || 'Arial'),
      color: this.formatColor(element.style.color || `#${defaultTextColor}`),
      align: this.mapTextAlign(element.style.textAlign || 'left'),
      valign: 'top',
      wrap: true,
      autoFit: false,
      shrinkText: false,
      margin: 0,
      paraSpaceAfter: 0,
      paraSpaceBefore: 0
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
      const x = this.pixelsToInches(position.x, true);
      const y = this.pixelsToInches(position.y, false);
      const w = this.pixelsToInches(position.width, true);
      const h = this.pixelsToInches(position.height, false);

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
      }, position, { theme: 'white' } as PresentationSettings);
    }
  }

  private static async addShapeElement(
    pptxSlide: any,
    element: any,
    position: { x: number; y: number; width: number; height: number }
  ): Promise<void> {
    const x = this.pixelsToInches(position.x, true);
    const y = this.pixelsToInches(position.y, false);
    const w = this.pixelsToInches(position.width, true);
    const h = this.pixelsToInches(position.height, false);

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