"use client";
import React, { useState } from "react";
import ImageTab from "./ImageTab";
import ImageResult from "./ImageResult";

export default function ImageGeneratorPage() {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null);

  const handleGenerate = async (prompt, aspectRatio) => {
    setLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const res = await fetch("/api/image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, aspectRatio }),
      });

      const data = await res.json();
      // Debug log Gemini API error details
      if (!res.ok) {
        console.error("Image generation error (API):", data);
        throw new Error(data.error || "Unknown error");
      }

      setImageUrl(data.image);
    } catch (err) {
      console.error("Image generation error:", err.message);
      setError("Failed to generate image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start justify-start px-2 md:px-4 -mt-5">
      <div className="w-full md:w-[600px]">
        <ImageTab onSubmit={handleGenerate} loading={loading} />
      </div>
      <div className="w-full md:w-[600px]">
        <ImageResult imageUrl={imageUrl} isLoading={loading} error={error} />
      </div>
    </div>
  );
}

// Next.js API route handler inside app/api/image/route.jsx or route.js
