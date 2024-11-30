import { DecodeToken } from "@/lib/decode_token";
import getRollInfo from "@/lib/getRollInfo";
import { getCTInfo, getTeacherCTInfo } from "@/lib/getNoticeInfo";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    const payload = await DecodeToken();

    if (payload.role === "student") {
      const studentInfo = await getRollInfo(payload.roll);
      const ctInfo = await getCTInfo(studentInfo);
      return NextResponse.json(
        {
          data: ctInfo,
        },
        { status: 200 }
      );
    } else {
      const CTInfo = await getTeacherCTInfo(payload.id);
      return NextResponse.json(
        {
          data: CTInfo,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error fetching week update data:", error);
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
