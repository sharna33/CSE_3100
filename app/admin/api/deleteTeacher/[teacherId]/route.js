import { NextResponse } from "next/server";
import { deleteTeacherByID } from "@/lib/admin/adminTeacher";
import { DecodeToken } from "@/lib/decode_token";

export async function DELETE(req, { params }) {
  try {
    const { teacherId } = params;
    const payload = await DecodeToken();

    if (payload.error) {
      return NextResponse.json(payload, { status: 401 });
    }

    if (payload.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized to delete teacher" },
        { status: 401 }
      );
    }

    const result = await deleteTeacherByID(teacherId);

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    if (result === 0) {
      return NextResponse.json({ error: "Teacher not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Teacher deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in delete teacher route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
