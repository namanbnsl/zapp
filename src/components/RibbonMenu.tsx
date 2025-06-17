import React, { useState } from "react";
import {
  FileText,
  Save,
  FolderOpen,
  Download,
  Play,
  Eye,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Type,
  Palette,
  Image,
  Video,
  Square,
  Circle,
  Triangle,
  Undo,
  Redo,
  Copy,
  Cast as Paste,
  Scissors,
  Home,
  Layout,
  AtSign as Design,
  MoreHorizontal,
  Maximize2,
  PanelRightOpen,
  PanelLeftOpen,
} from "lucide-react";
import { Slide, PresentationSettings } from "../types/presentation";

interface RibbonMenuProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onPreview: () => void;
  onExport: (format: string) => void;
  currentSlide: number;
  onSlideUpdate: (index: number, slide: Partial<Slide>) => void;
  onPresentationUpdate: (settings: Partial<PresentationSettings>) => void;
}

export const RibbonMenu: React.FC<RibbonMenuProps> = ({
  activeTab,
  onTabChange,
  onPreview,
  onExport,
  currentSlide,
  onSlideUpdate,
  onPresentationUpdate,
}) => {
  const [showExportMenu, setShowExportMenu] = useState(false);

  const tabs = [
    { id: "home", name: "Home", icon: Home },
    { id: "insert", name: "Insert", icon: Square },
    { id: "design", name: "Design", icon: Palette },
    { id: "transitions", name: "Transitions", icon: Play },
    { id: "slideshow", name: "Slideshow", icon: Eye },
  ];

  const renderHomeTab = () => (
    <div className="flex items-center space-x-4 p-2">
      <div className="flex items-center space-x-1 border-r pr-4">
        <button
          className="p-2 hover:bg-gray-100 rounded transition-colors"
          title="New presentation"
        >
          <FileText className="w-4 h-4" />
        </button>
        <button
          className="p-2 hover:bg-gray-100 rounded transition-colors"
          title="Save (Ctrl+S)"
        >
          <Save className="w-4 h-4" />
        </button>
        <button
          className="p-2 hover:bg-gray-100 rounded transition-colors"
          title="Open presentation"
        >
          <FolderOpen className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center space-x-1 border-r pr-4">
        <button
          className="p-2 hover:bg-gray-100 rounded transition-colors"
          title="Undo (Ctrl+Z)"
        >
          <Undo className="w-4 h-4" />
        </button>
        <button
          className="p-2 hover:bg-gray-100 rounded transition-colors"
          title="Redo (Ctrl+Y)"
        >
          <Redo className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center space-x-1 border-r pr-4">
        <button
          className="p-2 hover:bg-gray-100 rounded transition-colors"
          title="Cut (Ctrl+X)"
        >
          <Scissors className="w-4 h-4" />
        </button>
        <button
          className="p-2 hover:bg-gray-100 rounded transition-colors"
          title="Copy (Ctrl+C)"
        >
          <Copy className="w-4 h-4" />
        </button>
        <button
          className="p-2 hover:bg-gray-100 rounded transition-colors"
          title="Paste (Ctrl+V)"
        >
          <Paste className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center space-x-1 border-r pr-4">
        <button
          className="p-2 hover:bg-gray-100 rounded transition-colors font-bold"
          title="Bold (Ctrl+B)"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          className="p-2 hover:bg-gray-100 rounded transition-colors italic"
          title="Italic (Ctrl+I)"
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          className="p-2 hover:bg-gray-100 rounded transition-colors underline"
          title="Underline (Ctrl+U)"
        >
          <Underline className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center space-x-1 border-r pr-4">
        <button
          className="p-2 hover:bg-gray-100 rounded transition-colors"
          title="Align left"
        >
          <AlignLeft className="w-4 h-4" />
        </button>
        <button
          className="p-2 hover:bg-gray-100 rounded transition-colors"
          title="Align center"
        >
          <AlignCenter className="w-4 h-4" />
        </button>
        <button
          className="p-2 hover:bg-gray-100 rounded transition-colors"
          title="Align right"
        >
          <AlignRight className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center space-x-2">
        <select className="px-3 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Arial</option>
          <option>Helvetica</option>
          <option>Times New Roman</option>
          <option>Georgia</option>
        </select>
        <select className="px-3 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>12pt</option>
          <option>14pt</option>
          <option>16pt</option>
          <option>18pt</option>
          <option>24pt</option>
          <option>36pt</option>
        </select>
      </div>
    </div>
  );

  const renderInsertTab = () => (
    <div className="flex items-center space-x-4 p-2">
      <div className="flex items-center space-x-1 border-r pr-4">
        <button className="p-2 hover:bg-gray-100 rounded transition-colors">
          <Layout className="w-4 h-4" />
        </button>
        <span className="text-sm">New Slide</span>
      </div>

      <div className="flex items-center space-x-1 border-r pr-4">
        <button className="p-2 hover:bg-gray-100 rounded transition-colors">
          <Image className="w-4 h-4" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded transition-colors">
          <Video className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center space-x-1 border-r pr-4">
        <button className="p-2 hover:bg-gray-100 rounded transition-colors">
          <Square className="w-4 h-4" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded transition-colors">
          <Circle className="w-4 h-4" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded transition-colors">
          <Triangle className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center space-x-1">
        <button className="p-2 hover:bg-gray-100 rounded transition-colors">
          <Type className="w-4 h-4" />
        </button>
        <span className="text-sm">Text Box</span>
      </div>
    </div>
  );

  const renderDesignTab = () => (
    <div className="flex items-center space-x-4 p-2">
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium">Themes:</span>
        <div className="flex space-x-1">
          {[
            "white",
            "black",
            "league",
            "beige",
            "sky",
            "night",
            "serif",
            "simple",
          ].map((theme) => (
            <button
              key={theme}
              className={`w-8 h-8 rounded border-2 hover:border-blue-500 transition-colors ${theme === "white"
                ? "bg-white"
                : theme === "black"
                  ? "bg-black"
                  : theme === "league"
                    ? "bg-gray-800"
                    : theme === "beige"
                      ? "bg-yellow-100"
                      : theme === "sky"
                        ? "bg-blue-200"
                        : theme === "night"
                          ? "bg-purple-900"
                          : theme === "serif"
                            ? "bg-gray-100"
                            : "bg-gray-50"
                }`}
              onClick={() => onPresentationUpdate({ theme })}
            />
          ))}
        </div>
      </div>
    </div>
  );

  const renderSlideshowTab = () => (
    <div className="flex items-center space-x-4 p-2">
      <button
        onClick={onPreview}
        className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        title="Start slideshow (F5)"
      >
        <Play className="w-4 h-4" />
        <span>Start Slideshow</span>
      </button>

      <div className="relative">
        <button
          onClick={() => setShowExportMenu(!showExportMenu)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          title="Export presentation (Ctrl+E)"
        >
          <Download className="w-4 h-4" />
          <span>Export</span>
        </button>

        {showExportMenu && (
          <div className="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-lg z-50 min-w-48">
            <button
              onClick={() => {
                onExport("pdf");
                setShowExportMenu(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
            >
              Export as PDF
            </button>
            <button
              onClick={() => {
                onExport("html");
                setShowExportMenu(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
            >
              Export as HTML
            </button>
            <button
              onClick={() => {
                onExport("images");
                setShowExportMenu(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
            >
              Export as Images
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      {/* Tab Content */}
      <div className="min-h-16">
        {activeTab === "home" && renderHomeTab()}
        {activeTab === "insert" && renderInsertTab()}
        {activeTab === "design" && renderDesignTab()}
        {activeTab === "slideshow" && renderSlideshowTab()}
      </div>
    </div>
  );
};
