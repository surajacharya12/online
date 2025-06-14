"use client";

import React, { useEffect, useState } from "react";
import { MonitorSmartphone } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { AddNewCourseDialog } from "./AddNewCourseDialog";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { CourseCard } from "./joursecard";
import { Skeleton } from "../../../components/ui/skeleton";

export default function CourseList() {
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, isLoaded } = useUser();

  const GetCourseList = async () => {
    try {
      setLoading(true);
      const result = await axios.get("/api/courses");
      console.log("Fetched course list:", result.data);
      setCourseList(result.data);
    } catch (error) {
      console.error("❌ Failed to fetch course list:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded && user) {
      GetCourseList();
    }
  }, [user, isLoaded]);

  if (loading) {
    // Render skeleton cards while loading
    return (
      <div className="text-center py-12 px-4 sm:px-8 bg-gray-50 min-h-[80vh]">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-8">Course List</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-48 w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="text-center py-12 px-4 sm:px-8 bg-gray-50 min-h-[80vh]">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-8">Course List</h2>
      {courseList?.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 sm:p-12 bg-white rounded-2xl shadow-xl transition-all duration-300 border-4 border-gray-200">
          <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white mb-6 shadow-md">
            <MonitorSmartphone className="w-12 h-12" />
          </div>
          <h2 className="text-xl sm:text-2xl font-medium text-gray-700 mb-4">
            Looks like you haven't created any courses yet.
          </h2>
          <AddNewCourseDialog>
            <Button className="mt-2 px-6 py-2 text-sm sm:text-base font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-md">
              + Create your first course
            </Button>
          </AddNewCourseDialog>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
          {courseList.map((course, index) => (
            <CourseCard course={course} key={index} />
          ))}
        </div>
      )}
    </div>
  );
}
