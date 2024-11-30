import { NextResponse } from "next/server";
import { getStudents } from "@/lib/admin/adminStudent";
import { DecodeToken } from "@/lib/decode_token";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 20;

    const payload = await DecodeToken();
    if (payload.error) {
      return NextResponse.json(payload, { status: 401 });
    }

    if (payload.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      );
    }

    const result = await getStudents(page, limit);
    return NextResponse.json(
      {
        data: result.rows,
        totalCount: result.totalCount,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
