"use client";
import React from "react";
import { ImageIcon } from "lucide-react";

export default function ImageResult({ imageUrl, isLoading, error }) {
  return (
    <div className="min-h-[500px] w-full md:w-[600px] bg-white border border-gray-200 rounded-3xl shadow-xl p-6 sm:p-8 md:p-12 mx-auto mt-16 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <ImageIcon size={48} className="text-blue-600" />

        {!isLoading && !error && imageUrl && (
          <div className="flex flex-col items-center space-y-2 w-full">
            <img
              src={imageUrl}
              alt="Generated visual"
              className="max-w-full max-h-[350px] rounded-2xl shadow-lg object-contain mb-2"
            />
            <button
              onClick={() => {
                const a = document.createElement("a");
                a.href = imageUrl;
                a.download = "AIInsights-image.png";
                a.click();
              }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow transition mt-2"
              title="Download image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 5v14m0 0l-5-5m5 5l5-5M5 19h14"
                />
              </svg>
              Download
            </button>
          </div>
        )}

        {isLoading && (
          <div className="flex flex-col items-center space-y-2">
            <svg
              className="animate-spin h-8 w-8 text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            <p className="text-blue-600 font-semibold">Generating image...</p>
          </div>
        )}

        {error && (
          <p className="text-red-600 font-semibold text-center">
            Oops! Something went wrong. Please try again.
          </p>
        )}

        {!imageUrl && !isLoading && !error && (
          <p className="text-gray-500 italic">
            Your generated image will appear here.
          </p>
        )}
      </div>
    </div>
  );
}
