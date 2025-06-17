import React from "react";
import { Zap } from "lucide-react";

interface LoadingPageProps {
  progress?: number;
  message?: string;
}

export const LoadingPage: React.FC<LoadingPageProps> = ({}) => {
  return (
    <div className="h-screen bg-zinc-950 text-white font-sans flex flex-col items-center justify-center">
      <div className="flex flex-col items-center space-y-8 max-w-md w-full px-8">
        {/* App Logo/Title */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-4xl font-bold text-white">zapp</h1>
              <p className="text-zinc-400 text-lg -mt-1">Slideshows Fast</p>
            </div>
          </div>
        </div>

        {/* Loading Animation */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-zinc-700 border-t-purple-400 rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
};
