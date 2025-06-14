export async function POST(req) {
  try {
    // Parse JSON from request body
    const { prompt, aspectRatio = "1:1" } = await req.json();
    const apiKey=process.env.NEXT_PUBLIC_AI_GURU_LAB_API
    // Your API key (make sure to store this securely in env vars for production)
    //const apiKey = "82b2cd49-183b-4928-82a1-8b91f3a91205";

    if (!apiKey) {
      console.error("❌ Missing API key");
      return new Response(
        JSON.stringify({ error: "API key is missing" }),
        { status: 500 }
      );
    }

    // Build request payload for external API
    const payload = {
      width: 1024,
      height: 1024,
      input: prompt,
      model: "sdxl",
      aspectRatio,
    };

    console.log("➡️ Sending request to external API with payload:", payload);

    // Call external image generation API
    const response = await fetch("https://aigurulab.tech/api/generate-image", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // Log status and headers for debugging
    console.log("⬅️ External API status:", response.status);
    console.log("⬅️ External API headers:", [...response.headers.entries()]);

    // Check Content-Type header to confirm JSON response
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      const text = await response.text();
      console.error("❌ Unexpected content-type from external API:", contentType);
      console.error("❌ Raw response:", text);
      return new Response(
        JSON.stringify({ error: "Unexpected API response format", details: text }),
        { status: 502 }
      );
    }

    // Parse JSON response body
    const data = await response.json();
    console.log("✅ External API JSON response:", data);

    // Check for errors or missing image data in API response
    if (!response.ok || !data.image) {
      console.error("❌ Image generation failed:", data);
      return new Response(
        JSON.stringify({ error: data.message || "Failed to generate image" }),
        { status: response.status || 500 }
      );
    }

    // Success: return the image URL or base64 data to the client
    return new Response(JSON.stringify({ image: data.image }), { status: 200 });

  } catch (err) {
    // Catch any unexpected server errors
    console.error("❌ Server error during image generation:", err);
    return new Response(
      JSON.stringify({ error: "Server error" }),
      { status: 500 }
    );
  }
}
