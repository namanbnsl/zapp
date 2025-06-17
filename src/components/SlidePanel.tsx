import React from 'react';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { Slide } from '../types/presentation';

interface SlidePanelProps {
  slides: Slide[];
  currentSlideIndex: number;
  onSlideSelect: (index: number) => void;
  onSlideAdd: () => void;
  onSlideDelete: (index: number) => void;
  onSlideReorder: (fromIndex: number, toIndex: number) => void;
}

export const SlidePanel: React.FC<SlidePanelProps> = ({
  slides,
  currentSlideIndex,
  onSlideSelect,
  onSlideAdd,
  onSlideDelete,
  onSlideReorder
}) => {
  const [draggedIndex, setDraggedIndex] = React.useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== dropIndex) {
      onSlideReorder(draggedIndex, dropIndex);
    }
    setDraggedIndex(null);
  };

  const getSlidePreview = (slide: Slide) => {
    const titleContent = slide.content.find(c => c.type === 'text' && c.content);
    return titleContent?.content || `Slide ${slides.indexOf(slide) + 1}`;
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Panel Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-700">Slides</h3>
          <button
            onClick={onSlideAdd}
            className="p-1 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
            title="Add New Slide"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Slides List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            onClick={() => onSlideSelect(index)}
            className={`group relative bg-white border-2 rounded-lg p-3 cursor-pointer transition-all hover:shadow-md ${
              currentSlideIndex === index
                ? 'border-blue-500 shadow-lg'
                : 'border-gray-200 hover:border-gray-300'
            } ${draggedIndex === index ? 'opacity-50' : ''}`}
          >
            {/* Slide Number */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-500">
                {index + 1}
              </span>
              <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1 text-gray-400 hover:text-gray-600">
                  <GripVertical className="w-3 h-3" />
                </button>
                {slides.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSlideDelete(index);
                    }}
                    className="p-1 text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Slide Preview */}
            <div className="bg-gray-50 rounded aspect-video flex items-center justify-center mb-2">
              <div className="text-center p-2">
                <div className="text-xs font-medium text-gray-700 truncate">
                  {slide.title || 'Untitled Slide'}
                </div>
                <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                  {getSlidePreview(slide)}
                </div>
              </div>
            </div>

            {/* Layout Indicator */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 capitalize">
                {typeof slide.layout === 'string' ? slide.layout.replace('-', ' ') : 'default'}
              </span>
              {slide.notes && (
                <div className="w-2 h-2 bg-yellow-400 rounded-full" title="Has notes" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Slide Button */}
      <div className="p-2 border-t border-gray-200">
        <button
          onClick={onSlideAdd}
          className="w-full py-2 px-3 text-sm text-gray-600 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:text-blue-600 transition-colors"
        >
          <Plus className="w-4 h-4 inline mr-2" />
          New Slide
        </button>
      </div>
    </div>
  );
};