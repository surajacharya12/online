"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Progress } from "../../../components/ui/progress";
import { Button } from "../../../components/ui/button";
import { PlayIcon } from "lucide-react";


// EnrollCourseCard Component
export function EnrollCourseCard({ course, enrollCourse }) {
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const courseJson = course?.courseJson?.course;

  useEffect(() => {
    setMounted(true);
  }, []);

  const CalculateProgress = () => {
    const completed = enrollCourse?.completedChapters?.length ?? 0;
    const total = course?.courseContent?.length ?? 1;
    return Math.round((completed / total) * 100);
  };

  const progressValue = CalculateProgress();

  const Loader = () => (
    <svg
      className="animate-spin h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      ></path>
    </svg>
  );

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-500 overflow-hidden mx-auto">
      <div className="relative w-full h-52 sm:h-60 lg:h-64">
        <Image
          src={course?.bannerImageURL || "/placeholder.jpg"}
          alt={courseJson?.name || "Course Image"}
          fill
          style={{ objectFit: "cover" }}
          className="rounded-t-xl"
          priority
        />
        <div className="absolute top-3 left-3 bg-primary-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
          {courseJson?.category || "Category"}
        </div>
      </div>

      <div className="p-6 flex flex-col space-y-4">
        <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white truncate">
          {courseJson?.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
          {courseJson?.description}
        </p>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-primary-600 font-semibold text-sm">Progress</p>
            <p className="text-gray-800 dark:text-gray-200 font-medium text-lg">
              {progressValue}%
            </p>
          </div>

          <div className="flex-1 ml-6">
            {mounted ? (
              <Progress
                value={progressValue}
                className="h-3 rounded-full bg-gray-200 dark:bg-gray-700"
                style={{
                  "--progress-fill": "#2563eb",
                  transition: "width 0.5s ease",
                }}
              />
            ) : (
              <div className="h-3 rounded-full bg-gray-200 dark:bg-gray-700" />
            )}
          </div>
        </div>

        <Link href={`/allinsight/view-course/${course?.cid}`}>
          <Button
            onClick={handleClick}
            disabled={isLoading}
            className="bg-black hover:bg-gray-800 focus:ring-4 focus:ring-gray-600 text-white font-semibold rounded-lg px-5 py-2 text-sm transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? <Loader /> : <><PlayIcon className="w-4 h-4" /> Continue</>}
          </Button>
        </Link>
      </div>
    </div>
  );
}

