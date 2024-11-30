import { DecodeToken } from "@/lib/decode_token";
import getRollInfo from "@/lib/getRollInfo";
import { getClassRoutine } from "@/lib/getClassRoutine";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    const payload = await DecodeToken();
    const studentInfo = await getRollInfo(payload.roll);
    const { classTimes, classRoutine, weekdays, error } = await getClassRoutine(
      studentInfo
    );

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(
      {
        data: { classTimes, classRoutine, weekdays },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
