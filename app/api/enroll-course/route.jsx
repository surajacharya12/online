import { db } from "../../../config/db";
import { coursesTable, enrollmentsTable } from "../../../config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { eq, and, desc } from "drizzle-orm";
import { Toaster } from "../../../components/ui/sonner";

// POST: Enroll in a course
export async function POST(req) {
  const { courseId } = await req.json();
  const user = await currentUser();

  if (!user?.primaryEmailAddress?.emailAddress) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userEmail = user.primaryEmailAddress.emailAddress;

  const enrolledCourses = await db
    .select()
    .from(enrollmentsTable)
    .where(
      and(
        eq(enrollmentsTable.userEmail, userEmail),
        eq(enrollmentsTable.courseId, courseId)
      )
    );

  if (enrolledCourses.length === 0) {
    const result = await db
      .insert(enrollmentsTable)
      .values({
        userEmail,
        courseId,
      })
      .returning();

    return NextResponse.json(result);
  }

  return NextResponse.json({ message: "Already enrolled in this course" });
}

// GET: Get all enrolled courses for the current user
export async function GET(req) {
  const user = await currentUser();

  if (!user?.primaryEmailAddress?.emailAddress) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userEmail = user.primaryEmailAddress.emailAddress;
  const { searchParams } = new URL(req.url);
  const courseId = searchParams?.get("courseId");

  if (courseId) {
    const result = await db
      .select()
      .from(coursesTable)
      .innerJoin(enrollmentsTable, eq(coursesTable.cid, enrollmentsTable.courseId))
      .where(
        and(
          eq(enrollmentsTable.userEmail, userEmail),
          eq(enrollmentsTable.courseId, courseId)
        )
      )
      .orderBy(desc(enrollmentsTable.id));
    return NextResponse.json(result);
  } else {
    const result = await db
      .select()
      .from(coursesTable)
      .innerJoin(enrollmentsTable, eq(coursesTable.cid, enrollmentsTable.courseId))
      .where(eq(enrollmentsTable.userEmail, userEmail))
      .orderBy(desc(enrollmentsTable.id));

    return NextResponse.json(result);
  }
}

// Add Toaster for toast notifications in API route (if used in a page, not here)
// If you want to show toast on enroll action in the UI, add <Toaster /> and toast logic in the relevant page/component.
