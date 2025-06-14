import { db } from "../../../config/db";
import { coursesTable } from "../../../config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { GoogleGenAI, Modality } from "@google/genai";
import { NextResponse } from "next/server";
import { Toaster } from "../../../components/ui/sonner";

const PROMPT = `Generate Learning Course depends on following details. In which Make sure to add Course Name, Description, Course Banner Image Prompt (Create a modern, flat-style 2D digital illustration representing user Topic. Include UI/UX elements such as mockup screens, text blocks, icons, buttons, and creative workspace tools. Add symbolic elements related to user Course, like sticky notes, design components, and visual aids. Use a vibrant color palette (blues, purples, oranges) with a clean, professional look. The illustration should feel creative, tech-savvy, and educational, ideal for visualizing concepts in user Course) for Course Banner in 3d format Chapter Name, Topic under each chapters, Duration for each chapters etc, in JSON format only

Schema:
{
  "course": {
    "name": "string",
    "description": "string",
    "category": "string",
    "level": "string",
    "duration":"string",
    "includeVideo": "boolean",
    "noOfChapters": "number",
    "bannerImagePrompt": "string",
    "chapters": [
      {
        "chapterName": "string",
        "duration": "string",
        "topics": [
          "string"
        ]
      }
    ]
  }
}
`;

export async function POST(request) {
  try {
    const { courseId, ...formData } = await request.json();

    const user = await currentUser();
    const email = user?.emailAddresses?.[0]?.emailAddress;

    if (!email) {
      return NextResponse.json({ error: "Unauthorized: user not logged in" }, { status: 401 });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    // 1. Generate course structure using text generation
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `${PROMPT}\n${JSON.stringify(formData)}`
            }
          ]
        }
      ]
    });

    const generatedText = response.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!generatedText) {
      throw new Error("Failed to generate course layout");
    }

    // 2. Extract JSON from Gemini response
    const extractJSON = (text) => {
      const first = text.indexOf("{");
      const last = text.lastIndexOf("}");
      if (first === -1 || last === -1) throw new Error("Invalid JSON in AI output");
      return text.substring(first, last + 1);
    };

    const jsonString = extractJSON(generatedText);
    const parsedCourse = JSON.parse(jsonString);

    const noOfChapters = parsedCourse.course.noOfChapters;
    const imagePrompt = parsedCourse.course.bannerImagePrompt;

    // 3. Generate image using Gemini's multimodal capability
    const bannerImageBase64 = await GenerateImageWithGemini(imagePrompt);

    // 4. Save course to DB
    await db.insert(coursesTable).values({
      cid: courseId,
      userEmail: email,
      name: formData.name,
      description: formData.description,
      category: formData.category,
      level: formData.level,
      includeVideo: formData.includeVideo,
      noOfChapters,
      courseJson: jsonString,
      bannerImageURL: `data:image/png;base64,${bannerImageBase64}`, // inline base64 image
    });

    return NextResponse.json({ courseId });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}

// ✅ Gemini-powered image generator using prompt
async function GenerateImageWithGemini(prompt) {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-preview-image-generation",
    contents: prompt,
    config: {
      responseModalities: [Modality.IMAGE, Modality.TEXT],
      image: {
        width: 1024,
        height: 1024,
      },
    },
  });

  const imagePart = response.candidates?.[0]?.content?.parts.find(
    (part) => part.inlineData?.data
  );

  if (!imagePart) {
    throw new Error("No image data received from Gemini");
  }

  return imagePart.inlineData.data; // base64
}

// Note: Toaster is for UI, not API. If you want toast notifications for course layout generation, add <Toaster /> and toast logic in the page/component that calls this API, not here.
