import React from "react";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

interface SlidePreviewProps {
  slide: any;
  index: number;
  isSelected: boolean;
  canDelete: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

/**
 * Slide Preview Component
 *
 * Displays a thumbnail preview of a slide in the left sidebar.
 * Includes selection state and delete functionality.
 */
export const SlidePreview: React.FC<SlidePreviewProps> = ({
  slide,
  index,
  isSelected,
  canDelete,
  onSelect,
  onDelete,
}) => {
  // Get preview styling based on slide index
  const getSlidePreview = (index: number) => {
    const colors = [
      "bg-orange-200",
      "bg-white",
      "bg-zinc-100",
      "bg-pink-200",
      "bg-zinc-50",
      "bg-zinc-100",
      "bg-teal-300",
      "bg-blue-900",
      "bg-yellow-200",
      "bg-pink-100",
    ];
    const borderColors = [
      "border-orange-400",
      "border-red-500",
      "border-blue-600",
      "border-zinc-600",
      "border-zinc-500",
      "border-zinc-500",
      "border-teal-600",
      "border-blue-800",
      "border-yellow-600",
      "border-zinc-500",
    ];

    return {
      thumbnail: colors[index % colors.length],
      borderColor: borderColors[index % borderColors.length],
    };
  };

  const preview = getSlidePreview(index);

  return (
    <div
      className={`flex items-center gap-2 p-1.5 mb-1 cursor-pointer rounded transition-all duration-200 hover:bg-zinc-800 group ${
        isSelected ? "bg-zinc-800 ring-1 ring-blue-500" : ""
      }`}
      onClick={onSelect}
    >
      {/* Slide Number */}
      <div className="flex-shrink-0 w-5 text-xs font-medium text-zinc-500 text-center">
        {index + 1}
      </div>

      {/* Slide Thumbnail */}
      <div className="flex-shrink-0">
        <div
          className={`w-12 h-8 rounded border ${preview.borderColor} ${preview.thumbnail} flex items-center justify-center relative overflow-hidden`}
        >
          {/* Simple placeholder content representation */}
          <div className="text-xs text-zinc-800 font-medium text-center p-1">
            <div className="w-6 h-0.5 bg-zinc-800 mx-auto mb-1"></div>
            <div className="w-4 h-0.5 bg-zinc-600 mx-auto"></div>
          </div>
        </div>
      </div>

      {/* Delete Button - Only show if more than one slide exists */}
      {canDelete && (
        <Button
          onClick={(e) => {
            e.stopPropagation(); // Prevent slide selection when deleting
            onDelete();
          }}
          variant="destructive"
          size="sm"
          className="opacity-0 group-hover:opacity-100 ml-auto text-zinc-400 hover:text-white"
          title="Delete slide"
        >
          <Trash2 className="w-3 h-3" />
        </Button>
      )}
    </div>
  );
};
