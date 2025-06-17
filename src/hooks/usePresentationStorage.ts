import { useEffect, useState } from "react";
import { Presentation } from "../types/presentation";
import { MockApiService } from "../utils/mockApi";

export const usePresentationStorage = (
  presentation: Presentation,
  onPresentationLoad?: (presentation: Presentation) => void
) => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Auto-save to mock API
  useEffect(() => {
    const saveToApi = async () => {
      try {
        setError(null);
        await MockApiService.savePresentation(presentation);
      } catch (error) {
        console.warn("Failed to save presentation to API:", error);
        setError("Failed to save presentation");
      }
    };

    const debounceTimer = setTimeout(saveToApi, 1000);
    return () => clearTimeout(debounceTimer);
  }, [presentation]);

  // Load from mock API on initial mount
  useEffect(() => {
    const loadFromApi = async () => {
      try {
        setError(null);
        const savedPresentation = await MockApiService.getPresentation();
        if (savedPresentation && onPresentationLoad) {
          onPresentationLoad(savedPresentation);
        }
      } catch (error) {
        console.warn("Failed to load presentation from API:", error);
        setError("Failed to load presentation");
      } finally {
        setIsInitialLoading(false);
      }
    };

    loadFromApi();
  }, [onPresentationLoad]);

  return {
    isLoading: isInitialLoading,
    error,
    clearError: () => setError(null)
  };
};
