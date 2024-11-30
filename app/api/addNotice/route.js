import { NextResponse } from "next/server";
import { CTNotice, StudentNotice, TeacherNotice } from "@/lib/addNotice";

export async function POST(request) {
  const { type, data } = await request.json();

  try {
    switch (type) {
      case "ctNotice":
        await CTNotice(
          data.course_id,
          data.section,
          data.department,
          data.time,
          data.note
        );
        return NextResponse.json({ message: "CT Notice saved successfully" });
      case "studentNotice":
        await StudentNotice(
          data.notice_creator,
          data.notice_title,
          data.notice,
          data.time,
          data.series,
          data.section,
          data.department
        );
        return NextResponse.json({
          message: "Student Notice saved successfully",
        });
      case "teacherNotice":
        await TeacherNotice(
          data.notice_creator,
          data.notice_title,
          data.notice,
          data.time,
          data.department
        );
        return NextResponse.json({
          message: "Teacher Notice saved successfully",
        });
      default:
        return NextResponse.json(
          { message: "Invalid notice type" },
          { status: 400 }
        );
    }
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
