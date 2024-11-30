import { getAllCourse } from "@/lib/getInfo";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";

    const courses = await getAllCourse();

    const filteredCourses = courses.filter(
      (courses) =>
        courses.course_code.toString().includes(search.toString()) ||
        courses.course_name.toLowerCase().includes(search.toLowerCase())
    );

    return NextResponse.json(
      {
        data: filteredCourses,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
