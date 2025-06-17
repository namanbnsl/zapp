import React, { useState } from "react";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { SlidePreview } from "../slides/SlidePreview";

interface LeftSidebarProps {
  slides: any[];
  currentSlide: number;
  leftPanelWidth: number;
  isResizingLeft: boolean;
  setIsResizingLeft: (resizing: boolean) => void;
  addSlide: () => void;
  deleteSlide: (index: number) => void;
  selectSlide: (index: number) => void;
  reorderSlides: (fromIndex: number, toIndex: number) => void;
}

/**
 * Left Sidebar Component
 * 
 * Contains:
 * - Slide thumbnails/previews
 * - Add new slide button
 * - Delete slide functionality
 * - Slide navigation
 * - Resizable panel
 * - Drag and drop reordering
 */
export const LeftSidebar: React.FC<LeftSidebarProps> = ({
  slides,
  currentSlide,
  leftPanelWidth,
  isResizingLeft,
  setIsResizingLeft,
  addSlide,
  deleteSlide,
  selectSlide,
  reorderSlides,
}) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

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
      reorderSlides(draggedIndex, dropIndex);
    }
    setDraggedIndex(null);
  };

  return (
    <>
      {/* Sidebar Panel */}
      <div
        className="bg-zinc-900 border-r border-zinc-800 flex flex-col"
        style={{ width: `${leftPanelWidth}px` }}
      >
        {/* Header with Add Button */}
        <div className="p-3 border-b border-zinc-800 flex items-center justify-between">
          <h3 className="text-sm font-medium text-zinc-300">Slides</h3>
          <Button
            onClick={addSlide}
            variant="ghost"
            size="sm"
            className="text-zinc-400 hover:text-white hover:bg-zinc-800"
            title="Add new slide"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {/* Scrollable Slide List */}
        <ScrollArea className="flex-1">
          <div className="p-2">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                className={`${draggedIndex === index ? 'opacity-50' : ''}`}
              >
                <SlidePreview
                  slide={slide}
                  index={index}
                  isSelected={index === currentSlide}
                  canDelete={slides.length > 1}
                  onSelect={() => selectSlide(index)}
                  onDelete={() => deleteSlide(index)}
                />
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Footer with Slide Counter */}
        <div className="p-2 border-t border-zinc-800">
          <div className="text-xs text-zinc-500 text-center">
            Slide {currentSlide + 1} of {slides.length}
          </div>
        </div>
      </div>

      {/* Resize Handle */}
      <div
        className={`w-1 cursor-col-resize hover:bg-blue-500 transition-colors ${isResizingLeft ? "bg-blue-500" : "bg-transparent"
          }`}
        onMouseDown={() => setIsResizingLeft(true)}
      />
    </>
  );
};
