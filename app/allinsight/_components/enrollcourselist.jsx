"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { EnrollCourseCard } from "./enrollcoursecard";
import { Skeleton } from "../../../components/ui/skeleton";

export function EnrollCourseList() {
  const [enrollCourseList, setEnrollCourseList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetEnrolledCourse();
  }, []);

  const GetEnrolledCourse = async () => {
    try {
      setLoading(true);
      const result = await axios.get("/api/enroll-course");
      setEnrollCourseList(result.data || []);
    } catch (error) {
      console.error("Failed to fetch enrolled courses:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="mt-4">
        <h2 className="font-bold text-2xl mb-4 text-center">
          Continue Learning Your Courses
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-48 w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4">
      {enrollCourseList?.length > 0 ? (
        <>
          <h2 className="font-bold text-2xl mb-4 text-center">
            Continue Learning Your Courses
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {enrollCourseList.map((course, index) => (
              <EnrollCourseCard
                course={course?.courses}
                enrollCourse={course?.enrollCourse}
                key={index}
              />
            ))}
          </div>
        </>
      ) : (
        <p className="text-gray-500 text-center">
          You haven't enrolled in any courses yet.
        </p>
      )}
    </div>
  );
}
