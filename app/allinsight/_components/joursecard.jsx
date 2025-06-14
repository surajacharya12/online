"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Book, LoaderCircle, PlayCircle, Settings } from "lucide-react";
import { Button } from "../../../components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function CourseCard({ course }) {
  const [hasMounted, setHasMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!course) return null;

  const courseJson = course?.courseJson?.course;

  const onEnrollCourse = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/enroll-course", {
        courseId: course?.cid,
        userId: 1, // Optional if backend handles user via auth
      });

      if (response.data?.message === "Already enrolled in this course") {
        toast.info("You are already enrolled in this course");
      } else {
        toast.success("Successfully enrolled in course!");
      }
      // Redirect to dashboard after enrollment
      router.push("/allinsight/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Failed to enroll. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="course-card w-full sm:max-w-sm md:max-w-md lg:max-w-lg bg-white/30 backdrop-blur-lg rounded-2xl border border-gray-200 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden mx-auto">
      {/* Course Image */}
      <div className="relative w-full h-48 sm:h-56 md:h-60 lg:h-64">
        <Image
          src={course.bannerImageURL || "/placeholder.jpg"}
          alt={courseJson?.name || "Course Image"}
          layout="fill"
          objectFit="cover"
          className="rounded-t-2xl"
          priority
        />
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 md:p-6">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2">
          {courseJson?.name}
        </h3>

        <p className="text-sm sm:text-base text-gray-600 mb-3 line-clamp-3">
          {courseJson?.description}
        </p>

        {/* Bottom row: chapters + button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4">
          <span className="flex items-center gap-2 text-indigo-600 font-medium text-sm sm:text-base">
            <Book className="w-4 h-4 sm:w-5 sm:h-5" />
            {courseJson?.noOfChapters || 0} Chapters
          </span>

          {hasMounted && course?.courseContent?.length ? (
            <Button
              onClick={onEnrollCourse}
              disabled={loading}
              className="flex items-center gap-2 justify-center text-sm sm:text-base bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-200"
            >
              {loading ? (
                <LoaderCircle className="w-5 h-5 animate-spin" />
              ) : (
                <PlayCircle className="w-5 h-5" />
              )}
              Start Learning
            </Button>
          ) : (
            <Link href={`/allinsight/edit-course-layout/${course?.cid}`}>
              <Button
                size="sm"
                variant="outline"
                className="flex items-center gap-2 justify-center text-sm sm:text-base"
              >
                <Settings className="w-4 h-4" />
                Generate Course
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
