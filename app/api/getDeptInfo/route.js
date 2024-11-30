import { getDepartments } from "@/lib/getInfo";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";

    const allDepartments = await getDepartments();

    const filteredDepartments = allDepartments.filter(
      (department) =>
        department.dept_name.toLowerCase().includes(search.toLowerCase()) ||
        department.dept_short_name.toLowerCase().includes(search.toLowerCase())
    );

    return NextResponse.json(
      {
        data: filteredDepartments,
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
