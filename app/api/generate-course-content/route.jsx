import { NextResponse } from "next/server";
import { ai } from "../generate-course-layout/route";
import axios from "axios";
import { db } from "../../../config/db";
import { coursesTable } from "../../../config/schema";
import { eq } from "drizzle-orm";

const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3/search";

// Fetch exactly 4 YouTube videos based on the exact topic/chapterName query
const GetYoutubeVideo = async (query) => {
  if (!query) return [];
  try {
    const params = {
      part: "snippet",
      q: query,
      key: process.env.YOUTUBE_API_KEY,
      type: "video",
      maxResults: 4,
    };
    const resp = await axios.get(YOUTUBE_BASE_URL, { params });

    return resp.data.items.map((item) => ({
      videoId: item.id?.videoId,
      title: item.snippet?.title,
    }));
  } catch (error) {
    console.error("YouTube API error:", error.message);
    return [];
  }
};

// POST: Generate AI course content and save to DB
export async function POST(req) {
  const PROMPT = `You are an AI that generates strictly valid JSON educational content.

Given a chapter name and its topics, generate json-formatted content for each topic. Embed a JSON structure.

⚠️ RULES:
- Do NOT include triple backticks, markdown formatting, or explanations.
- Only output raw, valid JSON.
- Ensure it is valid and parseable JSON.
- Use this format:

{
  "chapterName": "Chapter Name",
  "topics": [
    {
      "topic": "Topic Name",
      "content": "json formatted content here"
    }
  ]
}

Now here is the chapter data:
`;

  try {
    const { courseJson, courseTitle, courseId } = await req.json();

    if (!courseId || !courseJson || !courseTitle) {
      return NextResponse.json(
        { error: "Missing courseId, courseJson, or courseTitle in request body" },
        { status: 400 }
      );
    }

    // For each chapter, generate AI content, parse, add YouTube videos
    const promises = courseJson?.chapters?.map(async (chapter) => {
      try {
        const model = "gemini-2.0-flash";

        const contents = [
          {
            role: "user",
            parts: [
              {
                text: PROMPT + JSON.stringify(chapter),
              },
            ],
          },
        ];

        const response = await ai.models.generateContent({
          model,
          config: {},
          contents,
        });

        let rawText =
          response?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";

        // Clean up triple backticks or markdown if any
        rawText = rawText.replace(/^```.*\n?/, "").replace(/```$/, "").trim();

        // Parse AI JSON response
        const jsonResp = JSON.parse(rawText);

        // If topic.content is a stringified JSON, parse it
        if (Array.isArray(jsonResp.topics)) {
          for (let topic of jsonResp.topics) {
            if (typeof topic.content === "string") {
              try {
                topic.content = JSON.parse(topic.content);
              } catch {
                // leave as string if JSON parsing fails
              }
            }
          }
        }

        // Fetch YouTube videos for the exact chapterName (from AI output)
        const chapterName = jsonResp.chapterName || chapter.chapterName || chapter.title || "";
        const youtubeData = await GetYoutubeVideo(chapterName);

        // Attach YouTube videos to the chapter content
        return {
          ...jsonResp,
          youtubeVideos: youtubeData,
        };
      } catch (error) {
        console.error(
          "❌ Error generating content for chapter:",
          chapter?.title || chapter?.chapterName || "unknown",
          error
        );
        return {
          error: true,
          chapter: chapter?.title || chapter?.chapterName || "unknown",
          message: error.message || "Unknown error",
        };
      }
    });

    const CourseContent = await Promise.all(promises);

    // Save full parsed CourseContent JSON to DB under courseContent column
    const dbResp = await db
      .update(coursesTable)
      .set({
        courseContent: CourseContent,
      })
      .where(eq(coursesTable.cid, courseId));

    return NextResponse.json({
      courseName: courseTitle,
      CourseContent,
      dbResp,
    });
  } catch (e) {
    console.error("❌ Fatal error in /generate-course-content:", e);
    return NextResponse.json(
      { error: "Failed to process request", details: e.message },
      { status: 500 }
    );
  }
}

// GET: Fetch generated content for a course by courseId
export async function GET(req) {
  try {
    const url = new URL(req.url);
    const courseId = url.searchParams.get("courseId");

    if (!courseId) {
      return NextResponse.json({ error: "Missing courseId" }, { status: 400 });
    }

    // Query course from DB
    const courseData = await db
      .select()
      .from(coursesTable)
      .where(eq(coursesTable.cid, courseId))
      .limit(1);

    if (!courseData || courseData.length === 0) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    const course = courseData[0];

    return NextResponse.json({
      courseName: course.courseName,
      CourseContent: course.courseContent,
    });
  } catch (error) {
    console.error("❌ Error in GET /generate-course-content:", error);
    return NextResponse.json(
      { error: "Failed to fetch course content", details: error.message },
      { status: 500 }
    );
  }
}
