'use client';

import Link from 'next/link';
import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  BookMarked,
  Clock,
  ChartNoAxesCombined,
  LoaderPinwheel,
  PlayCircleIcon
} from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

export function CourseInfo({ course = {}, viewcourse }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const courseLayout = course.courseJson?.course;

  const bannerSrcRaw =
    courseLayout?.bannerImageBase64 ||
    course.bannerImageBase64 ||
    course.bannerImageURL ||
    null;

  const bannerSrc = useMemo(() => {
    if (!bannerSrcRaw || typeof bannerSrcRaw !== 'string') return null;
    if (bannerSrcRaw.startsWith('http') || bannerSrcRaw.startsWith('data:image')) {
      return bannerSrcRaw;
    }
    return `data:image/png;base64,${bannerSrcRaw}`;
  }, [bannerSrcRaw]);

  // Debug bannerSrc value
  console.log('bannerSrc:', bannerSrc);

  const GetCourseContent = async () => {
    try {
      setLoading(true);
      const result = await axios.post('/api/generate-course-content', {
        courseJson: courseLayout,
        courseTitle: course?.name,
        courseId: course?.cid,
      });

      console.log('Result:', result.data);

      toast.success('Course content generated successfully!');

      setTimeout(() => {
        router.push('/allinsight/dashboard/');
      }, 500);
    } catch (e) {
      console.error('Error:', e);
      const errorMessage =
        e.response?.data?.message || 'Failed to generate course content.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-10 px-6 md:px-10">
      <div className="bg-amber-100 rounded-2xl shadow-lg p-6 md:p-12 text-gray-900 max-w-7xl mx-auto mt-15">
        {/* Title, Description, Banner */}
        <div className="flex flex-col md:flex-row md:items-start md:gap-10 mt-10 md:mt-16">
          <div className="flex-1">
            <h2 className="text-4xl font-extrabold mb-4 tracking-tight text-indigo-700">
              {courseLayout?.name || course.name || 'No Course Name'}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {courseLayout?.description || course.description || 'No Description'}
            </p>
          </div>

          {bannerSrc ? (
            <div className="mt-6 md:mt-0 md:w-[400px] lg:w-[480px] xl:w-[600px] shrink-0 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
              <Image
                src={bannerSrc}
                alt="Course Banner"
                width={1200}
                height={480}
                className="object-cover w-full h-[240px] md:h-[280px] lg:h-[320px]"
                priority
                unoptimized={bannerSrc.startsWith('data:image')}
              />
            </div>
          ) : (
            <div className="mt-8 text-center text-gray-400 italic text-lg">
              No Banner Image
            </div>
          )}
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-12">
          <div className="flex items-center gap-5 p-6 rounded-2xl shadow-md hover:shadow-indigo-300 transition duration-300 bg-indigo-50">
            <Clock className="w-7 h-7 text-indigo-600" />
            <div>
              <h3 className="text-xs font-bold text-indigo-800 uppercase tracking-wider">
                Duration
              </h3>
              <p className="text-lg font-semibold">
                {courseLayout?.duration || course.duration || 'No Duration'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-6 rounded-2xl shadow-md hover:shadow-green-300 transition duration-300 bg-green-50">
            <BookMarked className="w-7 h-7 text-green-600" />
            <div>
              <h3 className="text-xs font-bold text-green-800 uppercase tracking-wider">
                Chapters
              </h3>
              <p className="text-lg font-semibold">
                {courseLayout?.noOfChapters || course.noOfChapters || 'No Chapters'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-6 rounded-2xl shadow-md hover:shadow-red-300 transition duration-300 bg-red-50">
            <ChartNoAxesCombined className="w-7 h-7 text-red-600" />
            <div>
              <h3 className="text-xs font-bold text-red-800 uppercase tracking-wider">
                Difficulty
              </h3>
              <p className="text-lg font-semibold">
                {courseLayout?.level || course.level || 'No Difficulty'}
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        {!viewcourse ? (
          <button
            onClick={GetCourseContent}
            disabled={loading}
            aria-busy={loading}
            className={`mt-10 px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-3 transition-colors duration-300
              ${
                loading
                  ? 'bg-green-500 cursor-not-allowed opacity-70'
                  : 'bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300'
              } text-white shadow-md`}
          >
            <LoaderPinwheel className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Generating...' : 'Generate Content'}
          </button>
        ) : (
          <Link
            href={`/course/${course?.cid}`}
            className="mt-10 inline-flex px-6 py-3 rounded-xl font-semibold items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 text-white shadow-md transition-colors duration-300"
          >
            <PlayCircleIcon className="w-5 h-5" />
            Continue Learning
          </Link>
        )}
      </div>
    </div>
  );
}
