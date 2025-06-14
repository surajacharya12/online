// EditCourse.jsx
"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CourseInfo } from "../../_components/courseinfo";
import { ChapterTopicList } from "../../_components/chapterTopicList";
import { Skeleton } from "../../../../components/ui/skeleton";

export function EditCourse({ courseId: propCourseId, viewcourse = false }) {
  const params = useParams();
  const courseId = propCourseId || params.courseId;

  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState({});

  useEffect(() => {
    if (!courseId) return;

    const GetCourseInfo = async () => {
      try {
        setLoading(true);
        const result = await axios.get(`/api/courses?courseId=${courseId}`);
        setCourse(result.data);
      } catch (error) {
        console.error("Error fetching course:", error);
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
          {/* Skeleton for CourseInfo */}
          <div className="space-y-4">
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-40 w-full rounded-lg" />
          </div>

          {/* Skeleton for ChapterTopicList */}
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

// Correct Next.js page export for dynamic route
export default function Page({ params }) {
  return <EditCourse courseId={params.courseId} viewcourse={false} />;
}
