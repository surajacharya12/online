import { db } from "../../../config/db";
import { coursesTable } from "../../../config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import axios from "axios";

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
export const ai = new GoogleGenAI({
  apiKey:process.env.GEMINI_API_KEY
});
export async function POST(request) {
  try {
    const { courseId, ...formData } = await request.json();

    const user = await currentUser();
    const email = user?.emailAddresses?.[0]?.emailAddress;

    if (!email) {
      return NextResponse.json({ error: "Unauthorized: user not logged in" }, { status: 401 });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

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

    // ✅ Extract clean JSON from Gemini output
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

    const bannerImageURL = await GenerateImage(imagePrompt);

    // ✅ Save clean JSON string, not markdown-formatted one
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
      bannerImageURL,
    });

    return NextResponse.json({ courseId });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}

// Generate image 
async function GenerateImage(prompt) {
  const BASE_URL = "https://aigurulab.tech";

  const result = await axios.post(
    `${BASE_URL}/api/generate-image`,
    {
      width: 1024,
      height: 1024,
      input: prompt,
      model: "sdxl",
      aspectRatio: "16:9",
    },
    {
      headers: {
        "x-api-key": process.env.AI_GURU_LAB_API,
        "Content-Type": "application/json",
      },
    }
  );

  console.log("Generated banner image URL:", result.data.image);
  return result.data.image;
}
