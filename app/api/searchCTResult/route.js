import { CTMarksInputSearch } from "@/lib/ctMarks";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { department, course_id, section } = await req.json();
    console.log("department: ", department);
    console.log("course_id: ", course_id);
    console.log("section: ", section);
    console.log();

    if (!department || !course_id || !section) {
      return NextResponse.json(
        {
          error:
            "Missing required body parameters: department, course_id, section",
        },
        { status: 400 }
      );
    }

    const ctResults = await CTMarksInputSearch(department, course_id, section);

    return NextResponse.json(
      {
        data: ctResults,
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
