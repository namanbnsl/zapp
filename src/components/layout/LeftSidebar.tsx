import React, { useState } from "react";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Plus } from "lucide-react";
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
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    // Set a custom drag image
    const dragImage = e.currentTarget.cloneNode(true) as HTMLElement;
    dragImage.style.position = 'absolute';
    dragImage.style.top = '-1000px';
    document.body.appendChild(dragImage);
    e.dataTransfer.setDragImage(dragImage, 0, 0);
    // Remove the drag image after a short delay
    setTimeout(() => {
      document.body.removeChild(dragImage);
    }, 0);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== dropIndex) {
      reorderSlides(draggedIndex, dropIndex);
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
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
                onDragOver={(e) => handleDragOver(e, index)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, index)}
                className="relative"
              >
                <SlidePreview
                  slide={slide}
                  index={index}
                  isSelected={index === currentSlide}
                  canDelete={slides.length > 1}
                  onSelect={() => selectSlide(index)}
                  onDelete={() => deleteSlide(index)}
                  isDragging={draggedIndex === index}
                  isDragOver={dragOverIndex === index}
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
        className={`w-1 bg-zinc-800 hover:bg-blue-500 cursor-col-resize transition-colors ${isResizingLeft ? "bg-blue-500" : ""
          }`}
        onMouseDown={() => setIsResizingLeft(true)}
      />
    </>
  );
};
