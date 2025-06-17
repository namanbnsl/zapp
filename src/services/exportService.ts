import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';
import { Slide, PresentationSettings, Presentation } from '../types/presentation';
import { PptxExportService } from './pptxExportService';

export class ExportService {
  static async exportToPDF(slides: Slide[], settings: PresentationSettings) {
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    for (let i = 0; i < slides.length; i++) {
      if (i > 0) {
        pdf.addPage();
      }

      // Create a temporary div to render the slide
      const slideElement = document.createElement('div');
      slideElement.style.width = '800px';
      slideElement.style.height = '600px';
      slideElement.style.backgroundColor = 'white';
      slideElement.style.position = 'absolute';
      slideElement.style.left = '-9999px';
      
      // Render slide content
      slides[i].content.forEach(element => {
        const contentDiv = document.createElement('div');
        contentDiv.textContent = element.content;
        contentDiv.style.position = 'absolute';
        
        if (element.style.position) {
          contentDiv.style.left = `${element.style.position.x}px`;
          contentDiv.style.top = `${element.style.position.y}px`;
          contentDiv.style.width = `${element.style.position.width}px`;
          contentDiv.style.height = `${element.style.position.height}px`;
        }
        
        contentDiv.style.fontSize = element.style.fontSize || '16px';
        contentDiv.style.fontFamily = element.style.fontFamily || 'Arial';
        contentDiv.style.color = element.style.color || '#000000';
        contentDiv.style.textAlign = element.style.textAlign || 'left';
        contentDiv.style.fontWeight = element.style.fontWeight || 'normal';
        contentDiv.style.fontStyle = element.style.fontStyle || 'normal';
        
        slideElement.appendChild(contentDiv);
      });

      document.body.appendChild(slideElement);

      try {
        const canvas = await html2canvas(slideElement, {
          width: 800,
          height: 600,
          scale: 2
        });

        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 10, 10, 277, 208);
      } catch (error) {
        console.error('Error capturing slide:', error);
      } finally {
        document.body.removeChild(slideElement);
      }
    }

    pdf.save(`${settings.title || 'presentation'}.pdf`);
  }

  static async exportToImages(slides: Slide[], settings: PresentationSettings) {
    for (let i = 0; i < slides.length; i++) {
      const slideElement = document.createElement('div');
      slideElement.style.width = '800px';
      slideElement.style.height = '600px';
      slideElement.style.backgroundColor = 'white';
      slideElement.style.position = 'absolute';
      slideElement.style.left = '-9999px';
      
      slides[i].content.forEach(element => {
        const contentDiv = document.createElement('div');
        contentDiv.textContent = element.content;
        contentDiv.style.position = 'absolute';
        
        if (element.style.position) {
          contentDiv.style.left = `${element.style.position.x}px`;
          contentDiv.style.top = `${element.style.position.y}px`;
          contentDiv.style.width = `${element.style.position.width}px`;
          contentDiv.style.height = `${element.style.position.height}px`;
        }
        
        contentDiv.style.fontSize = element.style.fontSize || '16px';
        contentDiv.style.fontFamily = element.style.fontFamily || 'Arial';
        contentDiv.style.color = element.style.color || '#000000';
        contentDiv.style.textAlign = element.style.textAlign || 'left';
        
        slideElement.appendChild(contentDiv);
      });

      document.body.appendChild(slideElement);

      try {
        const canvas = await html2canvas(slideElement, {
          width: 800,
          height: 600,
          scale: 2
        });

        canvas.toBlob((blob) => {
          if (blob) {
            saveAs(blob, `slide-${i + 1}.png`);
          }
        }, 'image/png');
      } catch (error) {
        console.error('Error capturing slide:', error);
      } finally {
        document.body.removeChild(slideElement);
      }
    }
  }

  static exportToHTML(slides: Slide[], settings: PresentationSettings) {
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${settings.title}</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/5.0.4/reveal.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/5.0.4/theme/${settings.theme}.min.css">
</head>
<body>
    <div class="reveal">
        <div class="slides">
            ${slides.map(slide => `
                <section>
                    ${slide.content.map(element => `
                        <div style="
                            position: absolute;
                            left: ${element.style.position?.x || 0}px;
                            top: ${element.style.position?.y || 0}px;
                            width: ${element.style.position?.width || 200}px;
                            height: ${element.style.position?.height || 50}px;
                            font-size: ${element.style.fontSize || '16px'};
                            font-family: ${element.style.fontFamily || 'Arial'};
                            color: ${element.style.color || '#000000'};
                            text-align: ${element.style.textAlign || 'left'};
                            font-weight: ${element.style.fontWeight || 'normal'};
                            font-style: ${element.style.fontStyle || 'normal'};
                        ">
                            ${element.content}
                        </div>
                    `).join('')}
                </section>
            `).join('')}
        </div>
    </div>
    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/5.0.4/reveal.min.js"></script>
    <script>
        Reveal.initialize({
            controls: ${settings.controls},
            progress: ${settings.progress},
            center: ${settings.center},
            touch: ${settings.touch},
            loop: ${settings.loop},
            rtl: ${settings.rtl},
            shuffle: ${settings.shuffle},
            fragments: ${settings.fragments},
            embedded: ${settings.embedded},
            help: ${settings.help},
            showNotes: ${settings.showNotes},
            autoSlide: ${settings.autoSlide},
            autoSlideStoppable: ${settings.autoSlideStoppable},
            mouseWheel: ${settings.mouseWheel},
            hideAddressBar: ${settings.hideAddressBar},
            previewLinks: ${settings.previewLinks},
            transition: '${settings.transition}',
            hash: ${settings.hash},
            respondToHashChanges: ${settings.respondToHashChanges},
            jumpToSlide: ${settings.jumpToSlide},
            history: ${settings.history}
        });
    </script>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    saveAs(blob, `${settings.title || 'presentation'}.html`);
  }

  // New PowerPoint export method
  static async exportToPowerPoint(
    presentation: Presentation,
    filename?: string
  ): Promise<void> {
    try {
      await PptxExportService.exportToPowerPoint(presentation, filename);
    } catch (error) {
      console.error('PowerPoint export failed:', error);
      throw error;
    }
  }

  // Export current slide only to PowerPoint
  static async exportCurrentSlideToPowerPoint(
    slide: Slide,
    settings: PresentationSettings,
    filename?: string
  ): Promise<void> {
    try {
      await PptxExportService.exportCurrentSlide(slide, settings, filename);
    } catch (error) {
      console.error('Current slide PowerPoint export failed:', error);
      throw error;
    }
  }

  // Export selected slides to PowerPoint
  static async exportSelectedSlidesToPowerPoint(
    slides: Slide[],
    settings: PresentationSettings,
    filename?: string
  ): Promise<void> {
    try {
      await PptxExportService.exportSelectedSlides(slides, settings, filename);
    } catch (error) {
      console.error('Selected slides PowerPoint export failed:', error);
      throw error;
    }
  }
}