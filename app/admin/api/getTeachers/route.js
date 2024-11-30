import { NextResponse } from "next/server";
import { getTeachers } from "@/lib/admin/adminTeacher";

export async function GET(req, res) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 20;

  try {
    const { rows, totalCount } = await getTeachers(page, limit);
    return NextResponse.json({ data: rows, totalCount }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
