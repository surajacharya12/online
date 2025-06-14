"use client";

import React, { useState, useEffect } from "react";
import CourseList from "../_components/CourseList";
import { EnrollCourseList } from "../_components/enrollcourselist";
import WelcomeBanner from "../_components/WelcomeBanner";
import { Skeleton } from "../../../components/ui/skeleton";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);

  // Simulate loading, replace with real data fetching if any
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500); // e.g. 1.5 sec delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-10 space-y-10">
      {loading ? (
        <>
          {/* Skeleton for WelcomeBanner */}
          <Skeleton className="h-24 w-full rounded-md" />

          {/* Skeleton for EnrollCourseList */}
          <div className="space-y-4">
            {[...Array(2)].map((_, i) => (
              <Skeleton key={i} className="h-20 w-full rounded-md" />
            ))}
          </div>

          {/* Skeleton for CourseList */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-40 w-full rounded-lg" />
            ))}
          </div>
        </>
      ) : (
        <>
          <WelcomeBanner />
          <EnrollCourseList />
          <CourseList />
        </>
      )}
    </div>
  );
}
