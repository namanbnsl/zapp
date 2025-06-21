import React, { useState, useRef } from 'react';
import { Type, Image, Square } from 'lucide-react';
import { Slide, SlideContent } from '../types/presentation';

interface SlideEditorProps {
  slide: Slide;
  onSlideUpdate: (index: number, slide: Slide) => void;
  slideIndex: number;
}

export const SlideEditor: React.FC<SlideEditorProps> = ({
  slide,
  onSlideUpdate,
  slideIndex
}) => {
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  const layouts = {
    title: { name: 'Title Slide', icon: Type },
    content: { name: 'Content', icon: Square },
    'two-column': { name: 'Two Column', icon: Square },
    'image-text': { name: 'Image & Text', icon: Image },
    blank: { name: 'Blank', icon: Square }
  };

  const addTextElement = () => {
    const newElement: SlideContent = {
      id: `text-${Date.now()}`,
      type: 'text',
      content: 'Click to edit text',
      style: {
        fontSize: '24px',
        fontFamily: 'Arial',
        color: '#000000',
        textAlign: 'left',
        position: { x: 50, y: 50, width: 300, height: 100 }
      }
    };

    const updatedSlide = {
      ...slide,
      content: [...slide.content, newElement]
    };

    onSlideUpdate(slideIndex, updatedSlide);
    setSelectedElement(newElement.id);
  };

  const updateElement = (elementId: string, updates: Partial<SlideContent>) => {
    const updatedContent = slide.content.map(element =>
      element.id === elementId ? { ...element, ...updates } : element
    );

    const updatedSlide = {
      ...slide,
      content: updatedContent
    };

    onSlideUpdate(slideIndex, updatedSlide);
  };

  const deleteElement = (elementId: string) => {
    const updatedContent = slide.content.filter(element => element.id !== elementId);
    const updatedSlide = {
      ...slide,
      content: updatedContent
    };

    onSlideUpdate(slideIndex, updatedSlide);
    setSelectedElement(null);
  };

  const updateSlideLayout = (layout: Slide['layout']) => {
    const updatedSlide = { ...slide, layout };
    onSlideUpdate(slideIndex, updatedSlide);
  };

  const renderElement = (element: SlideContent) => {
    const isSelected = selectedElement === element.id;
    const position = element.style.position || { x: 0, y: 0, width: 200, height: 50 };

    return (
      <div
        key={element.id}
        className={`absolute cursor-pointer transition-all ${isSelected ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
          }`}
        style={{
          left: position.x,
          top: position.y,
          width: position.width,
          height: position.height
        }}
        onClick={() => setSelectedElement(element.id)}
      >
        {element.type === 'text' && (
          <div
            contentEditable={isEditing && isSelected}
            className="w-full h-full p-2 outline-none"
            style={{
              fontSize: element.style.fontSize,
              fontFamily: element.style.fontFamily,
              color: element.style.color,
              textAlign: element.style.textAlign,
              fontWeight: element.style.fontWeight,
              fontStyle: element.style.fontStyle,
              backgroundColor: element.style.backgroundColor || 'transparent'
            }}
            onBlur={(e) => {
              if (isEditing) {
                updateElement(element.id, { content: e.target.textContent || '' });
                setIsEditing(false);
              }
            }}
            onDoubleClick={() => setIsEditing(true)}
            suppressContentEditableWarning={true}
          >
            {element.content}
          </div>
        )}

        {isSelected && (
          <div className="absolute -top-8 left-0 bg-white border rounded shadow-lg p-1 flex space-x-1">
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <Type className="w-3 h-3" />
            </button>
            <button
              onClick={() => deleteElement(element.id)}
              className="p-1 hover:bg-red-100 text-red-600 rounded"
            >
              ×
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-100">
      {/* Editor Toolbar */}
      <div className="bg-white border-b border-gray-200 p-2">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Layout:</span>
            <select
              value={slide.layout}
              onChange={(e) => updateSlideLayout(e.target.value as Slide['layout'])}
              className="px-3 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.entries(layouts).map(([key, { name }]) => (
                <option key={key} value={key}>{name}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-1 border-l pl-4">
            <button
              onClick={addTextElement}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              title="Add Text"
            >
              <Type className="w-4 h-4" />
            </button>
            <button
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              title="Add Image"
            >
              <Image className="w-4 h-4" />
            </button>
            <button
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              title="Add Shape"
            >
              <Square className="w-4 h-4" />
            </button>
          </div>

          {selectedElement && (
            <div className="flex items-center space-x-2 border-l pl-4">
              <span className="text-sm text-gray-600">Selected element</span>
              <button
                onClick={() => setSelectedElement(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Slide Canvas */}
      <div className="flex-1 p-8 flex items-center justify-center">
        <div
          ref={editorRef}
          className="relative bg-white shadow-lg"
          style={{ width: '800px', height: '600px' }}
        >
          {slide.content.map(renderElement)}

          {slide.content.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <Square className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Click to add content</p>
                <p className="text-sm">Use the toolbar above to add text, images, or shapes</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Slide Properties Panel */}
      {selectedElement && (
        <div className="bg-white border-t border-gray-200 p-4">
          <h4 className="font-medium text-gray-700 mb-3">Element Properties</h4>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Font Size
              </label>
              <input
                type="number"
                className="w-full px-2 py-1 border rounded text-sm"
                defaultValue={24}
                onChange={(e) => {
                  const element = slide.content.find(el => el.id === selectedElement);
                  if (element) {
                    updateElement(selectedElement, {
                      style: { ...element.style, fontSize: `${e.target.value}px` }
                    });
                  }
                }}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Color
              </label>
              <input
                type="color"
                className="w-full h-8 border rounded"
                defaultValue="#000000"
                onChange={(e) => {
                  const element = slide.content.find(el => el.id === selectedElement);
                  if (element) {
                    updateElement(selectedElement, {
                      style: { ...element.style, color: e.target.value }
                    });
                  }
                }}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Background
              </label>
              <input
                type="color"
                className="w-full h-8 border rounded"
                defaultValue="#ffffff"
                onChange={(e) => {
                  const element = slide.content.find(el => el.id === selectedElement);
                  if (element) {
                    updateElement(selectedElement, {
                      style: { ...element.style, backgroundColor: e.target.value }
                    });
                  }
                }}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Alignment
              </label>
              <select
                className="w-full px-2 py-1 border rounded text-sm"
                onChange={(e) => {
                  const element = slide.content.find(el => el.id === selectedElement);
                  if (element) {
                    updateElement(selectedElement, {
                      style: { ...element.style, textAlign: e.target.value as any }
                    });
                  }
                }}
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
                <option value="justify">Justify</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};