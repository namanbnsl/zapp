import React, { useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Zap,
  Share,
  Download,
  PanelLeftOpen,
  PanelRightOpen,
  Maximize2,
  Settings,
  MoreHorizontal,
  PanelBottomOpen,
  FileText,
} from "lucide-react";

interface HeaderProps {
  currentSlide: number;
  slidesLength: number;
  showLeftPanel: boolean;
  setShowLeftPanel: (show: boolean) => void;
  showRightPanel: boolean;
  setShowRightPanel: (show: boolean) => void;
  showFooter: boolean;
  setShowFooter: (show: boolean) => void;
  onExport?: (format: string) => void;
}

/**
 * Application Header Component
 *
 * Contains:
 * - Brand logo and project information
 * - Quick action buttons (Share, Export)
 * - Panel toggle controls (left, right, footer)
 * - View controls and settings
 */
export const Header: React.FC<HeaderProps> = ({
  currentSlide,
  slidesLength,
  showLeftPanel,
  setShowLeftPanel,
  showRightPanel,
  setShowRightPanel,
  showFooter,
  setShowFooter,
  onExport,
}) => {
  const [showExportMenu, setShowExportMenu] = useState(false);

  const handleExport = (format: string) => {
    if (onExport) {
      onExport(format);
    }
    setShowExportMenu(false);
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-zinc-900 border-b border-zinc-800 backdrop-blur-sm">
      {/* Left Section - Brand and Project Info */}
      <div className="flex items-center gap-6">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold text-white">zapp</h1>
            <p className="text-xs text-zinc-400 -mt-1">Slideshows Fast</p>
          </div>
        </div>

        {/* Visual Divider */}
        <div className="w-px h-6 bg-zinc-700"></div>

        {/* Project Information */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <p className="text-sm font-medium text-zinc-200">
              Business Presentation
            </p>
            <p className="text-xs text-zinc-500">Last edited 2 minutes ago</p>
          </div>
        </div>
      </div>

      {/* Center Section - Empty for now */}
      <div className="hidden md:flex items-center gap-2">
        {/* This section can be used for other controls if needed */}
      </div>

      {/* Right Section - View Controls and Settings */}
      <div className="flex items-center gap-3">
        {/* Share and Export Actions */}
        <div className="hidden md:flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-zinc-400 hover:text-white hover:bg-zinc-800 gap-2"
            title="Share presentation"
          >
            <Share className="w-4 h-4" />
            Share
          </Button>
          
          {/* Export Dropdown */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="text-zinc-400 hover:text-white hover:bg-zinc-800 gap-2"
              title="Export presentation (Ctrl+E)"
            >
              <Download className="w-4 h-4" />
              Export
            </Button>

            {showExportMenu && (
              <div className="absolute top-full right-0 mt-1 bg-zinc-800 border border-zinc-700 rounded-lg shadow-xl z-50 min-w-48">
                <button
                  onClick={() => handleExport('pptx')}
                  className="w-full text-left px-4 py-3 hover:bg-zinc-700 transition-colors text-white flex items-center gap-3 rounded-t-lg"
                >
                  <FileText className="w-4 h-4 text-orange-400" />
                  <div>
                    <div className="font-medium">PowerPoint (.pptx)</div>
                    <div className="text-xs text-zinc-400">Pixel-perfect export</div>
                  </div>
                </button>
                <button
                  onClick={() => handleExport('pdf')}
                  className="w-full text-left px-4 py-3 hover:bg-zinc-700 transition-colors text-white flex items-center gap-3"
                >
                  <FileText className="w-4 h-4 text-red-400" />
                  <div>
                    <div className="font-medium">PDF Document</div>
                    <div className="text-xs text-zinc-400">Portable format</div>
                  </div>
                </button>
                <button
                  onClick={() => handleExport('html')}
                  className="w-full text-left px-4 py-3 hover:bg-zinc-700 transition-colors text-white flex items-center gap-3"
                >
                  <FileText className="w-4 h-4 text-blue-400" />
                  <div>
                    <div className="font-medium">HTML Slideshow</div>
                    <div className="text-xs text-zinc-400">Web presentation</div>
                  </div>
                </button>
                <button
                  onClick={() => handleExport('images')}
                  className="w-full text-left px-4 py-3 hover:bg-zinc-700 transition-colors text-white flex items-center gap-3 rounded-b-lg"
                >
                  <FileText className="w-4 h-4 text-green-400" />
                  <div>
                    <div className="font-medium">Image Files</div>
                    <div className="text-xs text-zinc-400">PNG format</div>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Visual Divider */}
        <div className="hidden md:block w-px h-6 bg-zinc-700"></div>

        {/* Panel Toggle Controls */}
        <div className="flex items-center gap-1 bg-zinc-800 rounded-lg p-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowLeftPanel(!showLeftPanel)}
            className={`text-zinc-400 hover:text-white hover:bg-zinc-700 h-8 w-8 p-0 ${showLeftPanel ? "bg-zinc-700 text-white" : ""
              }`}
            title="Toggle slide panel"
          >
            <PanelLeftOpen className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowRightPanel(!showRightPanel)}
            className={`text-zinc-400 hover:text-white hover:bg-zinc-700 h-8 w-8 p-0 ${showRightPanel ? "bg-zinc-700 text-white" : ""
              }`}
            title="Toggle AI assistant"
          >
            <PanelRightOpen className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowFooter(!showFooter)}
            className={`text-zinc-400 hover:text-white hover:bg-zinc-700 h-8 w-8 p-0 ${showFooter ? "bg-zinc-700 text-white" : ""
              }`}
            title="Toggle footer"
          >
            <PanelBottomOpen className="w-4 h-4" />
          </Button>
        </div>

        {/* Visual Divider */}
        <div className="w-px h-6 bg-zinc-700"></div>

        {/* View and Settings Controls */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="text-zinc-400 hover:text-white hover:bg-zinc-800 h-8 w-8 p-0"
            title="Fullscreen"
          >
            <Maximize2 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-zinc-400 hover:text-white hover:bg-zinc-800 h-8 w-8 p-0"
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-zinc-400 hover:text-white hover:bg-zinc-800 h-8 w-8 p-0 md:hidden"
            title="More options"
          >
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Click outside to close export menu */}
      {showExportMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowExportMenu(false)}
        />
      )}
    </header>
  );
};