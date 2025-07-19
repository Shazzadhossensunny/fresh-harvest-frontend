"use client";

import { AlertCircle, RefreshCw, Home, ArrowLeft } from "lucide-react";

const ErrorPage = ({
  error,
  reset,
  showBackButton = false,
  onBack,
}: {
  error: Error & { digest?: string };
  reset: () => void;
  showBackButton?: boolean;
  onBack?: () => void;
}) => {
  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center space-y-6">
        {/* Error Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-20"></div>
            <div className="relative bg-red-50 p-4 rounded-full">
              <AlertCircle className="h-12 w-12 text-red-500" />
            </div>
          </div>
        </div>

        {/* Error Content */}
        <div className="space-y-4">
          <h1 className="text-2xl font-heading font-medium text-black">
            Oops! Something went wrong
          </h1>

          <p className="text-sm text-gray-600 leading-relaxed">
            We encountered an unexpected error. Don't worry, it's not your
            fault.
          </p>

          {/* Error Details */}
          {error.message && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-left">
              <p className="text-xs font-medium text-red-700 mb-1">
                Error Details:
              </p>
              <p className="text-sm text-red-600 font-mono break-words">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-xs text-red-500 mt-2">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <button
            onClick={() => reset()}
            className="w-full bg-primary hover:bg-primary/90 text-white py-3 px-4 rounded-lg font-heading font-medium transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>

          <div className="flex gap-3">
            {showBackButton && onBack && (
              <button
                onClick={onBack}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 border border-gray-200"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </button>
            )}

            <button
              onClick={handleGoHome}
              className={`${
                showBackButton && onBack ? "flex-1" : "w-full"
              } bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 border border-gray-200`}
            >
              <Home className="w-4 h-4" />
              Go Home
            </button>
          </div>
        </div>

        {/* Help Text */}
        <div className="pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            If this problem persists, please contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
