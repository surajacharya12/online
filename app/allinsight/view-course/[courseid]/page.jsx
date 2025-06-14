// ViewCourse.jsx
"use client";

import { useParams } from "next/navigation";
import EditCourse from "../../edit-course-layout/[courseId]/page";

export default function ViewCourse() {
  const params = useParams();
  const courseId = params.courseid || params.courseId; // Make sure casing matches route param

  return (
    <div>
      <EditCourse courseId={courseId} viewcourse={true} />
    </div>
  );
}
