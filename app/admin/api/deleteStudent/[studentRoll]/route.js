import { NextResponse } from "next/server";
import { deleteStudent } from "@/lib/admin/adminStudent";
import { DecodeToken } from "@/lib/decode_token";

export async function DELETE(req, { params }) {
  try {
    const { studentRoll } = params;
    const payload = await DecodeToken();

    if (payload.error) {
      return NextResponse.json(payload, { status: 401 });
    }

    if (payload.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized to delete student" },
        { status: 401 }
      );
    }

    const result = await deleteStudent(studentRoll);

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Student deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
