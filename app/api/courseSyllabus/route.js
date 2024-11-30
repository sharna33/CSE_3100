import { DecodeToken } from "@/lib/decode_token";
import getRollInfo from "@/lib/getRollInfo";
import { getStudentCourseSyllabus } from "@/lib/getCourseSyllabus";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    const payload = await DecodeToken();

    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const studentInfo = await getRollInfo(payload.roll);
    const courseSyllabus = await getStudentCourseSyllabus(studentInfo);

    return NextResponse.json(
      {
        data: courseSyllabus,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
