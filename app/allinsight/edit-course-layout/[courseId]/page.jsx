"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { CourseInfo } from "../../_components/courseinfo";
import { ChapterTopicList } from "../../_components/chapterTopicList";
import { Skeleton } from "../../../../components/ui/skeleton";
import { toast, Toaster } from "sonner";
import { useParams } from "next/navigation";

function EditCourse({ courseId, viewcourse = false }) {
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState({});

  useEffect(() => {
    if (!courseId) return;

    const GetCourseInfo = async () => {
      try {
        setLoading(true);
        console.log("Fetching course with ID:", courseId); // Debug log
        const result = await axios.get(`/api/courses?courseId=${courseId}`);
        setCourse(result.data);
        toast.success("Course layout generated successfully!");
      } catch (error) {
        console.error("Error fetching course:", error);
        toast.error(
          `Failed to fetch course info: ${
            error?.response?.data?.message || error.message
          }`
        );
        setCourse({});
      } finally {
        setLoading(false);
      }
    };

    GetCourseInfo();
  }, [courseId]);

  if (!courseId) return <p>No course selected.</p>;

  return (
    <div className="p-4 space-y-6">
      {loading ? (
        <div className="space-y-6">
          <div className="space-y-4">
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-40 w-full rounded-lg" />
          </div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <CourseInfo course={course} viewcourse={viewcourse} />
          <ChapterTopicList course={course} />
        </>
      )}
    </div>
  );
}

// ✅ Default export: gets route param via useParams
export default function Page() {
  const params = useParams();
  const { courseId } = params;

  return (
    <>
      <Toaster position="top-center" richColors />
      <EditCourse courseId={courseId} viewcourse={false} />
    </>
  );
}
