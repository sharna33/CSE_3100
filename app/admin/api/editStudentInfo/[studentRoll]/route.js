import { NextResponse } from "next/server";
import { updateStudent } from "@/lib/admin/adminStudent";
import { DecodeToken } from "@/lib/decode_token";

export async function PUT(req, { params }) {
  try {
    const { studentRoll } = params;
    const payload = await DecodeToken();

    if (payload.error) {
      return NextResponse.json(payload, { status: 401 });
    }

    if (payload.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized to update student" },
        { status: 401 }
      );
    }

    const studentData = await req.json();

    // Validate required fields
    if (!studentData.student_name || !studentData.student_email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const result = await updateStudent(studentRoll, studentData);

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Student updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
