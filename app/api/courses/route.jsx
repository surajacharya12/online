import { coursesTable } from "../../../config/schema";
import { NextResponse } from "next/server";
import { db } from "../../../config/db";
import { desc, eq, and, ne, sql } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const courseId = searchParams?.get("courseId");
  const user = await currentUser();

  // Case 1: Get all generated courses (courseId == 0)
  if (courseId === "0") {
    const search = searchParams?.get("search")?.toLowerCase();
    let result = await db
      .select()
      .from(coursesTable)
      .where(
        and(
          ne(coursesTable.courseContent, "{}"),
          ne(coursesTable.courseContent, "[]"),
          ne(coursesTable.courseContent, ""),
          sql`${coursesTable.courseContent} IS NOT NULL`
        )
      );
    if (search) {
      result = result.filter(course =>
        (course.name?.toLowerCase() || "").includes(search)
      );
    }
    console.log("Fetched generated courses (filtered):", result);
    return NextResponse.json(result);
  }

  // Case 2: Get specific course by ID
  if (courseId) {
    const result = await db
      .select()
      .from(coursesTable)
      .where(eq(coursesTable.cid, courseId));

    console.log("Fetched course by ID:", result);
    return NextResponse.json(result[0]);
  }

  // Case 3: Get courses by current user
  const result = await db
    .select()
    .from(coursesTable)
    .where(eq(coursesTable.userEmail, user.primaryEmailAddress?.emailAddress))
    .orderBy(desc(coursesTable.id));

  console.log("Fetched user courses:", result);
  return NextResponse.json(result);
}
