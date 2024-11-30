import { NextResponse } from "next/server";
import { updateTeacher } from "@/lib/admin/adminTeacher";
import { DecodeToken } from "@/lib/decode_token";

export async function PUT(req, { params }) {
  try {
    const { teacherId } = params;
    const payload = await DecodeToken();

    if (payload.error) {
      return NextResponse.json(payload, { status: 401 });
    }

    if (payload.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized to update teacher" },
        { status: 401 }
      );
    }

    const teacherData = await req.json();

    // Validate required fields
    if (
      !teacherData.teacher_name ||
      !teacherData.teacher_email ||
      !teacherData.department_id
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const result = await updateTeacher(teacherId, teacherData);

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Teacher updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in update teacher route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
