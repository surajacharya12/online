'use client';

import { Button } from "../../../components/ui/button";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { CourseCard } from "../_components/joursecard";
import { Skeleton } from "../../../components/ui/skeleton";
import { Toaster } from "../../../components/ui/sonner";

export default function ExploreCourses() {
  const [courseList, setCourseList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { user, isLoaded } = useUser();

  const GetCourseList = async (searchTerm = "") => {
    try {
      setIsLoading(true);
      let url = `${window.location.origin}/api/courses?courseId=0`;
      if (searchTerm) {
        url += `&search=${encodeURIComponent(searchTerm)}`;
      }
      const result = await axios.get(url);
      setCourseList(result.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded && user) {
      GetCourseList();
    }
  }, [isLoaded, user]);

  const handleSearch = (e) => {
    e.preventDefault();
    GetCourseList(search);
  };

  return (
    <>
      <Toaster position="top-center" richColors />
      <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 px-4 py-8">
        {/* Header & Search */}
        <div className="max-w-6xl mx-auto flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between mb-10">
          <div className="text-center sm:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-700 drop-shadow-md">
              Explore More Courses
            </h1>
            <p className="text-base md:text-lg text-gray-600 mt-2">
              Find courses that match your passion and learning goals.
            </p>
          </div>

          <div className="w-full sm:w-[350px] relative">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search courses..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-5 pr-12 py-3 rounded-full bg-white shadow-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
              />
              <Button
                size="sm"
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white shadow"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        {/* Course List */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
            Course List
          </h2>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="space-y-4">
                  <Skeleton className="h-48 w-full rounded-xl" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ))}
            </div>
          ) : courseList.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
              {courseList.map((course, index) => (
                <CourseCard course={course} key={index} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-12">
              {search ? `Course '${search}' not found.` : "No courses available."}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
