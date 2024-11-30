import { DecodeToken } from "@/lib/decode_token";
import getRollInfo from "@/lib/getRollInfo";
import { getResultOfStudent } from "@/lib/getResult";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    const payload = await DecodeToken();
    const studentInfo = await getRollInfo(payload.roll);
    const resultInfo = await getResultOfStudent(studentInfo);
    return NextResponse.json(
      {
        data: resultInfo,
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
