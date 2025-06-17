import React, { useEffect } from "react";
import { X, Keyboard } from "lucide-react";
import { Button } from "./ui/button";

interface KeyboardShortcutsHelpProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Keyboard Shortcuts Help Modal
 *
 * Displays all available keyboard shortcuts organized by category
 */
export const KeyboardShortcutsHelp: React.FC<KeyboardShortcutsHelpProps> = ({
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyPress);
      return () => document.removeEventListener("keydown", handleKeyPress);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const shortcuts = [
    {
      category: "Navigation",
      items: [
        { key: "← / →", description: "Navigate between slides" },
        { key: "Space", description: "Next slide" },
        { key: "Home", description: "Go to first slide" },
        { key: "End", description: "Go to last slide" },
        { key: "Esc", description: "Exit fullscreen" },
      ],
    },
    {
      category: "Presentation",
      items: [
        { key: "F5", description: "Start slideshow / Preview" },
        { key: "P", description: "Play / Pause slideshow" },
      ],
    },
    {
      category: "File Operations",
      items: [
        { key: "Ctrl + S", description: "Save presentation" },
        { key: "Ctrl + E", description: "Export presentation" },
      ],
    },
    {
      category: "Editing",
      items: [
        { key: "Ctrl + Z", description: "Undo" },
        { key: "Ctrl + Y", description: "Redo" },
        { key: "Ctrl + C", description: "Copy" },
        { key: "Ctrl + V", description: "Paste" },
        { key: "Ctrl + X", description: "Cut" },
      ],
    },
    {
      category: "Text Formatting",
      items: [
        { key: "Ctrl + B", description: "Bold" },
        { key: "Ctrl + I", description: "Italic" },
        { key: "Ctrl + U", description: "Underline" },
      ],
    },
    {
      category: "UI",
      items: [
        { key: "Ctrl + 1", description: "Toggle left sidebar" },
        { key: "Ctrl + 2", description: "Toggle right sidebar" },
        { key: "Ctrl + 3", description: "Toggle footer" },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-zinc-900 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto border border-zinc-700">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-700">
          <div className="flex items-center gap-3">
            <Keyboard className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl font-semibold text-white">
              Keyboard Shortcuts
            </h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 text-zinc-400 hover:text-white hover:bg-zinc-800"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            {shortcuts.map((section) => (
              <div key={section.category}>
                <h3 className="text-lg font-medium text-white mb-3">
                  {section.category}
                </h3>
                <div className="space-y-2">
                  {section.items.map((item) => (
                    <div
                      key={item.key}
                      className="flex items-center justify-between"
                    >
                      <span className="text-zinc-300">{item.description}</span>
                      <kbd className="px-2 py-1 bg-zinc-800 border border-zinc-600 rounded text-sm font-mono text-zinc-200">
                        {item.key}
                      </kbd>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-zinc-800 border-t border-zinc-700 rounded-b-lg">
          <p className="text-sm text-zinc-400 text-center">
            Press{" "}
            <kbd className="px-1 py-0.5 bg-zinc-700 border border-zinc-600 rounded text-xs font-mono text-zinc-300">
              ?
            </kbd>{" "}
            to toggle this help
          </p>
        </div>
      </div>
    </div>
  );
};
