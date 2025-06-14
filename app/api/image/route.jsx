import { GoogleGenAI, Modality } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

function parseAspectRatio(ratioStr) {
  const [w, h] = ratioStr.split(":").map(Number);
  if (!w || !h) return [1, 1]; // default fallback
  return [w, h];
}

export async function POST(req) {
  try {
    const { prompt, aspectRatio = "1:1" } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return new Response(
        JSON.stringify({ error: "Prompt must be a non-empty string" }),
        { status: 400 }
      );
    }

    // Parse aspect ratio and calculate image dimensions
    const [ratioW, ratioH] = parseAspectRatio(aspectRatio);

    // Clamp the max dimension to 1024 while preserving aspect ratio
    const maxDim = 1024;
    let width = Math.round((maxDim * ratioW) / Math.max(ratioW, ratioH));
    let height = Math.round((maxDim * ratioH) / Math.max(ratioW, ratioH));

    // Final clamping between 64 and 1024 (Gemini limits)
    const clamp = (val) => Math.min(Math.max(val, 64), 1024);
    width = clamp(width);
    height = clamp(height);

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-preview-image-generation",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
        image: {
          width,
          height,
        },
      },
    });

    const imagePart = response?.candidates?.[0]?.content?.parts?.find(
      (part) => part.inlineData?.data
    );

    if (!imagePart) {
      return new Response(
        JSON.stringify({ error: "No image data received from Gemini" }),
        { status: 500 }
      );
    }

    const base64Image = imagePart.inlineData.data;
    const dataUrl = `data:image/png;base64,${base64Image}`;

    return new Response(
      JSON.stringify({ image: dataUrl }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("❌ Gemini API error:", err);
    return new Response(
      JSON.stringify({ error: "Failed to generate image" }),
      { status: 500 }
    );
  }
}
