import React, { useState } from 'react';
import { StickyNote, ChevronUp, ChevronDown, X } from 'lucide-react';

interface NotesPanelProps {
  notes: string;
  onNotesUpdate: (notes: string) => void;
  onToggle: () => void;
}

export const NotesPanel: React.FC<NotesPanelProps> = ({
  notes,
  onNotesUpdate,
  onToggle
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className={`bg-white border-t border-gray-200 transition-all duration-300 ${
      isExpanded ? 'h-40' : 'h-12'
    }`}>
      {/* Panel Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
        <div className="flex items-center space-x-2">
          <StickyNote className="w-4 h-4 text-yellow-600" />
          <h3 className="text-sm font-medium text-gray-700">Speaker Notes</h3>
        </div>
        
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            title={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            )}
          </button>
          <button
            onClick={onToggle}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            title="Close Notes"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Notes Content */}
      {isExpanded && (
        <div className="flex-1 p-4">
          <textarea
            value={notes}
            onChange={(e) => onNotesUpdate(e.target.value)}
            placeholder="Add speaker notes for this slide..."
            className="w-full h-full resize-none border-none outline-none text-sm text-gray-700 placeholder-gray-400"
            style={{ minHeight: '100px' }}
          />
        </div>
      )}

      {/* Collapsed View */}
      {!isExpanded && (
        <div className="px-4 py-2">
          <p className="text-sm text-gray-500 truncate">
            {notes || 'Click to add speaker notes...'}
          </p>
        </div>
      )}
    </div>
  );
};