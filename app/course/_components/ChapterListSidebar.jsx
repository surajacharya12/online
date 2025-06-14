"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { BookMarked, Clock, ChartBar, ArrowLeft } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../components/ui/accordion";

import { Skeleton } from "../../../components/ui/skeleton";

export default function ChapterListSidebar({ course = {} }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const courseLayout = course.courseJson?.course;
  const chapters = courseLayout?.chapters || [];

  const bannerSrcRaw =
    courseLayout?.bannerImageBase64 ||
    course.bannerImageBase64 ||
    course.bannerImageURL ||
    null;

  const bannerSrc = useMemo(() => {
    if (!bannerSrcRaw) return null;
    if (
      bannerSrcRaw.startsWith("http") ||
      bannerSrcRaw.startsWith("data:image")
    ) {
      return bannerSrcRaw;
    }
    return `data:image/png;base64,${bannerSrcRaw}`;
  }, [bannerSrcRaw]);

  const GetCourseContent = async () => {
    try {
      setLoading(true);
      await axios.post("/api/generate-course-content", {
        courseJson: courseLayout,
        courseTitle: course?.name,
        courseId: course?.cid,
      });

      toast.success("Course content generated successfully!");
      setTimeout(() => router.push("/allinsight/dashboard/"), 500);
    } catch (e) {
      const errorMessage =
        e.response?.data?.message || "Failed to generate course content.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!courseLayout) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white py-12 px-6 sm:px-12">
        <Skeleton className="w-32 h-8 mb-8 rounded" />
        <div className="max-w-7xl mx-auto rounded-3xl shadow-xl p-8 sm:p-14 bg-white/90 backdrop-blur-md border border-indigo-200">
          <Skeleton className="h-12 w-64 mb-6 rounded-lg" />
          <Skeleton className="h-6 w-full max-w-xl mb-4 rounded-lg" />
          <Skeleton className="h-6 w-full max-w-xl mb-4 rounded-lg" />
          <Skeleton className="h-6 w-48 rounded-lg" />
        </div>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <Skeleton className="h-20 rounded-2xl" />
          <Skeleton className="h-20 rounded-2xl" />
          <Skeleton className="h-20 rounded-2xl" />
        </div>
        <section className="max-w-3xl mx-auto mt-20">
          <Skeleton className="h-10 w-48 mb-8 rounded-lg" />
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="mb-5 rounded-3xl border border-indigo-300 bg-white shadow-md p-6"
            >
              <Skeleton className="h-8 w-64 mb-4 rounded-lg" />
              <Skeleton className="h-6 w-40 mb-3 rounded-lg" />
              <Skeleton className="h-6 w-48 rounded-lg" />
            </div>
          ))}
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white py-12 px-6 sm:px-12">
      <button
        onClick={() => router.push("/allinsight/dashboard")}
        className="flex items-center gap-2 mb-8 text-indigo-700 hover:text-indigo-900 font-semibold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded"
        aria-label="Back to Dashboard"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Dashboard
      </button>

      <div className="max-w-7xl mx-auto rounded-3xl shadow-xl p-8 sm:p-14 bg-white/90 backdrop-blur-md border border-indigo-200 hover:shadow-indigo-400 transition-shadow duration-500">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-10">
          <div className="flex-1 space-y-5">
            <h2 className="text-5xl font-extrabold text-indigo-700 tracking-tight drop-shadow-md">
              {courseLayout?.name}
            </h2>
            <p className="text-gray-700 text-lg sm:text-xl max-w-xl leading-relaxed">
              {courseLayout?.description}
            </p>
            {/*
            <button
              onClick={GetCourseContent}
              disabled={loading}
              className="mt-6 px-6 py-3 rounded-full font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition-transform duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Generating..." : "Generate Course Content"}
            </button>
            */}
          </div>

          {bannerSrc && (
            <div className="relative w-full md:w-[500px] h-[260px] rounded-2xl overflow-hidden border border-gray-300 shadow-lg hover:scale-105 transition-transform duration-300">
              <Image
                src={bannerSrc}
                alt="Course Banner"
                fill
                style={{ objectFit: "cover" }}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
            </div>
          )}
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <StatCard
            icon={<Clock />}
            label="Duration"
            value={courseLayout?.duration || "N/A"}
            color="indigo"
          />
          <StatCard
            icon={<BookMarked />}
            label="Chapters"
            value={courseLayout?.noOfChapters || chapters.length}
            color="green"
          />
          <StatCard
            icon={<ChartBar />}
            label="Difficulty"
            value={courseLayout?.level || "Intermediate"}
            color="red"
          />
        </div>
      </div>

      <section className="max-w-3xl mx-auto mt-20">
        <h2 className="text-4xl font-bold text-indigo-900 mb-8 border-b-4 border-indigo-600 inline-block pb-2">
          Course Chapters
        </h2>

        <Accordion type="single" collapsible>
          {chapters.map((chapter, chapterIndex) => (
            <AccordionItem
              key={chapterIndex}
              value={`chapter-${chapterIndex}`}
              className="mb-5 rounded-3xl border border-indigo-300 bg-white shadow-md hover:shadow-indigo-400 transition-shadow duration-300"
            >
              <AccordionTrigger className="flex justify-between items-center px-8 py-5 text-indigo-900 font-semibold text-lg hover:bg-indigo-50 rounded-3xl transition-colors duration-300">
                <div>
                  <h3 className="text-2xl">{chapter.chapterName}</h3>
                  <p className="text-sm text-indigo-600 mt-1">
                    Duration: <span className="font-medium">{chapter.duration}</span>
                  </p>
                  <p className="text-sm text-indigo-500 mt-0.5 italic">
                    {chapter.topics?.length || 0}{" "}
                    {pluralize("topic", chapter.topics?.length || 0)}
                  </p>
                </div>
              </AccordionTrigger>

              <AccordionContent className="px-8 pb-8 pt-4">
                <Accordion type="single" collapsible>
                  {chapter.topics?.map((topic, topicIndex) => {
                    const topicTitle =
                      typeof topic === "string" ? topic : topic.title || "Untitled Topic";
                    const videoUrl =
                      typeof topic === "object" && topic.videoUrl
                        ? normalizeYoutubeUrl(topic.videoUrl)
                        : null;

                    return (
                      <AccordionItem
                        key={topicIndex}
                        value={`topic-${chapterIndex}-${topicIndex}`}
                        className="mb-4 border border-indigo-200 rounded-lg shadow-sm hover:shadow-indigo-300 transition-shadow duration-200"
                      >
                        <AccordionTrigger className="px-6 py-3 text-indigo-800 font-medium hover:bg-indigo-100 rounded-lg transition-colors duration-300">
                          {topicTitle}
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6 pt-3">
                          {videoUrl ? (
                            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
                              <iframe
                                className="w-full h-full"
                                src={videoUrl}
                                title={topicTitle}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                            </div>
                          ) : (
                            <p className="text-indigo-500 italic select-none">No video available</p>
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
}

// Helper: Normalize YouTube URLs
function normalizeYoutubeUrl(url) {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname.includes("youtube.com")) {
      const videoId = urlObj.searchParams.get("v");
      if (videoId) return `https://www.youtube.com/embed/${videoId}`;
    } else if (urlObj.hostname === "youtu.be") {
      return `https://www.youtube.com/embed${urlObj.pathname}`;
    }
    return url;
  } catch {
    return url;
  }
}

// Helper: Pluralize words
function pluralize(word, count) {
  return count === 1 ? word : `${word}s`;
}

// Stat Card Component
function StatCard({ icon, label, value, color }) {
  const colorClasses = {
    indigo: "text-indigo-600 bg-indigo-100",
    green: "text-green-600 bg-green-100",
    red: "text-red-600 bg-red-100",
  };

  return (
    <div
      className={`flex items-center gap-4 rounded-3xl p-6 shadow-md ${colorClasses[color]}`}
      role="region"
      aria-label={label}
    >
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-inner">
        {React.cloneElement(icon, { className: "w-6 h-6" })}
      </div>
      <div>
        <p className="text-2xl font-semibold">{value}</p>
        <p className="uppercase font-medium tracking-wide">{label}</p>
      </div>
    </div>
  );
}
