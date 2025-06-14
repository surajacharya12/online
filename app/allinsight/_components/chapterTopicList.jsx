"use client";

import React, { useEffect, useState } from "react";
import { Gift, CheckCircle } from "lucide-react";

export function ChapterTopicList({ course }) {
  const [courseLayout, setCourseLayout] = useState(null);

  useEffect(() => {
    setCourseLayout(course?.courseJson?.course);
  }, [course]);

  if (!courseLayout) {
    return <p className="text-center text-gray-500">Loading chapters...</p>;
  }

  return (
    <div className="min-h-screen py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-10 text-black">
        Chapters & Topics
      </h2>

      <div className="flex flex-col items-center justify-center m-10">
        {courseLayout?.chapters.map((chapter, chapterIndex) => (
          <div key={chapterIndex} className="flex flex-col items-center mb-12">
            <div className="p-4 border shadow rounded-xl bg-indigo-600 text-white w-full max-w-xl text-center">
              <h2 className="text-xl font-semibold">Chapter {chapterIndex + 1}</h2>
              <h3 className="text-lg font-bold">{chapter.chapterName}</h3>
              <p className="text-sm mt-2">
                Duration: {chapter?.duration} | Topics: {chapter?.topics?.length || 0}
              </p>
            </div>

            {chapter?.topics?.map((topic, topicIndex) => (
              <div key={topicIndex} className="flex flex-col items-center">
                <div className="h-10 bg-gray-300 w-1"></div>

                <div className="flex items-center gap-5 mb-2">
                  <span
                    className={`${
                      topicIndex % 2 === 0 ? "text-gray-800" : "text-transparent"
                    } max-w-xs`}
                  >
                    {topic}
                  </span>

                  <h2 className="text-center rounded-full bg-gray-500 px-6 text-white py-2">
                    {topicIndex + 1}
                  </h2>

                  <span
                    className={`${
                      topicIndex % 2 !== 0 ? "text-gray-800" : "text-transparent"
                    } max-w-xs`}
                  >
                    {topic}
                  </span>
                </div>

                {topicIndex !== chapter.topics.length - 1 && (
                  <div className="h-10 bg-gray-300 w-1"></div>
                )}

                {topicIndex === chapter.topics.length - 1 && (
                  <>
                    <div className="flex items-center justify-center my-4">
                      <Gift className="rounded-full bg-gray-300 h-14 w-14 text-gray-500 p-3" />
                    </div>
                    <div className="h-10 bg-gray-300 w-1"></div>
                  </>
                )}
              </div>
            ))}
          </div>
        ))}

        {/* Finish Section */}
        <div className="flex items-center gap-3 p-6 border shadow-lg rounded-xl bg-green-600 text-white mt-10 max-w-xl cursor-pointer hover:bg-green-700 transition-colors">
          <CheckCircle className="h-8 w-8" />
          <h2 className="text-2xl font-semibold">Finish</h2>
        </div>
      </div>
    </div>
  );
}
