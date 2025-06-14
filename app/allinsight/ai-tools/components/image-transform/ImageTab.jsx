"use client";
import React, { useState } from "react";
import { WandSparkles } from "lucide-react";

export default function ImageTab({ onSubmit, loading }) {
  const [prompt, setPrompt] = useState("");
  const [aspectRatio, setAspectRatio] = useState("1:1");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    onSubmit(prompt, aspectRatio);
  };
  return (
    <div className="min-h-[500px] bg-white border border-gray-200 rounded-3xl shadow-xl p-6 sm:p-8 md:p-12 text-gray-900 w-full md:w-[600px] mx-auto mt-16">
      <h1 className="text-2xl sm:text-3xl text-blue-600 font-extrabold mb-3 tracking-wide">
        Generate Amazing Images
      </h1>
      <h2 className="text-lg sm:text-2xl font-semibold mb-6">
        Transforming Ideas into Visual Reality
      </h2>
      <p className="text-sm sm:text-base mb-10 leading-relaxed text-gray-700">
        This section represents the visual tools powered by AI that bring creativity to life.
      </p>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="prompt" className="block text-sm font-medium text-gray-800 mb-2">
            Enter your prompt
          </label>
          <textarea
            id="prompt"
            rows={5}
            placeholder="Describe the image you want to generate..."
            className="w-full rounded-2xl border border-gray-300 p-3 shadow-sm resize-none focus:outline-none focus:ring-4 focus:ring-blue-400 transition"
            disabled={loading}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="aspectRatio" className="block text-sm font-medium text-gray-800 mb-2">
            Aspect Ratio
          </label>
          <select
            id="aspectRatio"
            className="w-full rounded-2xl border border-gray-300 p-3 shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-400 transition"
            disabled={loading}
            value={aspectRatio}
            onChange={(e) => setAspectRatio(e.target.value)}
          >
            <option value="1:1">1:1 (Square)</option>
            <option value="16:9">16:9 (Widescreen)</option>
            <option value="9:16">9:16 (Portrait)</option>
            <option value="4:3">4:3</option>
            <option value="3:2">3:2</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 
                    disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold 
                    py-3 px-6 rounded-2xl transition duration-300 ease-in-out
                    shadow-lg hover:shadow-blue-500/50"
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
          ) : (
            <WandSparkles size={20} />
          )}
          {loading ? "Generating..." : "Generate Image"}
        </button>
      </form>
    </div>
  );
}
