import React, { useState } from "react";
import { Header } from "./components/layout/Header";
import { LeftSidebar } from "./components/layout/LeftSidebar";
import { MainSlideArea } from "./components/layout/MainSlideArea";
import { RightSidebar } from "./components/layout/RightSidebar";
import { Footer } from "./components/layout/Footer";
import { LoadingPage } from "./components/LoadingPage";
import { usePresentation } from "./hooks/usePresentation";
import { usePresentationStorage } from "./hooks/usePresentationStorage";
import { useAppState } from "./hooks/useAppState";
import { useKeyboardNavigation } from "./hooks/useKeyboardNavigation";
import { useResizing } from "./hooks/useResizing";
import { KeyboardShortcutsHelp } from "./components/KeyboardShortcutsHelp";

/**
 * Main Application Component
 * 
 * This is the root component that orchestrates the entire presentation application.
 * It manages the layout and coordinates between different sections of the app.
 */
export function App() {
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false);

  const {
    slides,
    currentSlide,
    presentation,
    addSlide,
    deleteSlide,
    selectSlide,
    // updateSlide,
    reorderSlides,
    // updatePresentationSettings,
    loadPresentation,
  } = usePresentation();

  const { isLoading, error, clearError } = usePresentationStorage(
    presentation,
    loadPresentation,
  );

  const {
    isPlaying,
    setIsPlaying,
    isFullscreen,
    setIsFullscreen,
    showLeftPanel,
    setShowLeftPanel,
    showRightPanel,
    setShowRightPanel,
    showFooter,
    setShowFooter,
  } = useAppState();

  const {
    leftPanelWidth,
    rightPanelWidth,
    isResizingLeft,
    isResizingRight,
    setIsResizingLeft,
    setIsResizingRight,
  } = useResizing();

  // Enhanced keyboard navigation with all handlers
  useKeyboardNavigation({
    selectSlide,
    currentSlide,
    slidesLength: slides.length,
    setIsFullscreen,
    isPlaying,
    setIsPlaying,
    onExport: () => console.log("Export"),
    onPreview: () => setIsFullscreen(true),
    onSave: () => console.log("Save"),
    onUndo: () => console.log("Undo"),
    onRedo: () => console.log("Redo"),
    onCopy: () => console.log("Copy"),
    onPaste: () => console.log("Paste"),
    onCut: () => console.log("Cut"),
    onToggleLeftPanel: () => setShowLeftPanel(!showLeftPanel),
    onToggleRightPanel: () => setShowRightPanel(!showRightPanel),
    onToggleFooter: () => setShowFooter(!showFooter),
  });

  // Handle keyboard shortcuts help toggle
  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "?" && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setShowKeyboardHelp(!showKeyboardHelp);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [showKeyboardHelp]);

  // Show loading page while app is initializing
  if (isLoading) {
    return <LoadingPage message="Loading your presentation..." />;
  }

  // Show error state if there's an error loading
  if (error) {
    return (
      <div className="h-screen bg-zinc-950 text-white font-sans flex flex-col items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-red-400">Error Loading Presentation</h2>
          <p className="text-zinc-300">{error}</p>
          <button
            onClick={clearError}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className={`h-screen bg-zinc-950 text-white font-sans flex flex-col ${isFullscreen ? "fixed inset-0 z-50" : ""
          }`}
      >
        {/* Application Header */}
        <Header
          currentSlide={currentSlide}
          slidesLength={slides.length}
          showLeftPanel={showLeftPanel}
          setShowLeftPanel={setShowLeftPanel}
          showRightPanel={showRightPanel}
          setShowRightPanel={setShowRightPanel}
          showFooter={showFooter}
          setShowFooter={setShowFooter}
        />

        {/* Main Content Area */}
        <div className="flex flex-1 min-h-0 overflow-hidden">
          {/* Left Sidebar - Slide Thumbnails */}
          {showLeftPanel && (
            <LeftSidebar
              slides={slides}
              currentSlide={currentSlide}
              leftPanelWidth={leftPanelWidth}
              isResizingLeft={isResizingLeft}
              setIsResizingLeft={setIsResizingLeft}
              addSlide={addSlide}
              deleteSlide={deleteSlide}
              selectSlide={selectSlide}
              reorderSlides={reorderSlides}
            />
          )}

          {/* Main Slide Display Area */}
          <MainSlideArea
            slides={slides}
            currentSlide={currentSlide}
            selectSlide={selectSlide}
          />

          {/* Right Sidebar - AI Assistant */}
          {showRightPanel && (
            <RightSidebar
              slides={slides}
              currentSlide={currentSlide}
              rightPanelWidth={rightPanelWidth}
              isResizingRight={isResizingRight}
              setIsResizingRight={setIsResizingRight}
            />
          )}
        </div>

        {/* Application Footer */}
        {showFooter && (
          <Footer
            slides={slides}
            currentSlide={currentSlide}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            selectSlide={selectSlide}
          />
        )}
      </div>

      {/* Keyboard Shortcuts Help Modal */}
      <KeyboardShortcutsHelp
        isOpen={showKeyboardHelp}
        onClose={() => setShowKeyboardHelp(false)}
      />
    </>
  );
}

export default App;