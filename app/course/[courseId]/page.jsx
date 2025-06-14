"use client";

import { AppHeader } from "../../allinsight/_components/AppHeader";
import React, { useEffect, useState } from "react";
import ChapterContent from "../_components/chaptercontent";
import ChapterListSidebar from "../_components/ChapterListSidebar";
import { useParams } from "next/navigation";
import axios from "axios";
import { Skeleton } from "../../../components/ui/skeleton";

export default function Course() {
  const params = useParams();
  const courseId = params.courseId;

  const [loading, setLoading] = useState(false);
  const [courseInfo, setCourseInfo] = useState(null);
  const [generatedContent, setGeneratedContent] = useState(null);

  useEffect(() => {
    if (!courseId) return;

    const fetchCourseInfo = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/courses?courseId=${courseId}`);
        setCourseInfo(res.data);
      } catch (error) {
        console.error("Error fetching course info:", error);
        setCourseInfo(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseInfo();
  }, [courseId]);

  useEffect(() => {
    if (!courseId) return;

    const fetchGeneratedContent = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/generate-course-content?courseId=${courseId}`);
        setGeneratedContent(res.data);
      } catch (error) {
        console.error("Error fetching generated content:", error);
        setGeneratedContent(null);
      } finally {
        setLoading(false);
      }
    };

    fetchGeneratedContent();
  }, [courseId]);

  const generateContent = async () => {
    if (!courseInfo) return;

    try {
      setLoading(true);
      const res = await axios.post("/api/generate-course-content", {
        courseId,
        courseTitle: courseInfo.name,
        courseJson: courseInfo.courseJson,
      });
      setGeneratedContent(res.data);
    } catch (error) {
      console.error("Error generating content:", error);
    } finally {
      setLoading(false);
    }
  };

  const course = {
    ...courseInfo,
    courseContent: generatedContent?.CourseContent || [],
    courseName: generatedContent?.courseName || courseInfo?.name || "",
  };

  if (loading) {
    return (
      <div className="p-4">
        <Skeleton className="h-8 w-1/3 mb-4" />
        <div className="flex flex-col md:flex-row gap-4">
          <Skeleton className="h-[600px] w-full md:w-1/4 rounded-md" />
          <Skeleton className="h-[600px] w-full md:w-3/4 rounded-md" />
        </div>
      </div>
    );
  }

  if (!courseInfo || !generatedContent) {
    return (
      <div className="p-4 text-red-500">
        Course not found or you're not enrolled.
      </div>
    );
  }

  return (
    <div className="mt-10">
      <AppHeader hideSidebar={true} />
      <div className="flex flex-col md:flex-row">
        <ChapterListSidebar course={course} />
        <ChapterContent course={course} />
      </div>
    </div>
  );
}
