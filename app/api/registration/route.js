import { setTeachers, setStudents } from "@/lib/setInfo";
import { encrypt } from "@/middlewares/crypto";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { role, name, roll, email, password, department } =
      await request.json();

    //  checking if all the required fields are provided
    if (
      !name ||
      !email ||
      !password ||
      !role ||
      (role === "teacher" && !department)
    ) {
      return NextResponse.json(
        {
          error: {
            message: "Please provide all the required fields",
            fields: {
              name: name ? name : "Not provided",
              email: email ? email : "Not provided",
              role: role ? role : "Not provided",
              department: department ? department : "Not provided",
            },
          },
        },
        { status: 400 }
      );
    }
    const encPassword = encrypt(password);

    if (role === "student") {
      await setStudents(roll, name, email, encPassword);
    } else {
      await setTeachers(name, department, email, encPassword);
    }

    return NextResponse.json(
      {
        message: "Data inserted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("An error occurred while inserting data: ", error);
    return NextResponse.json(
      {
        error: {
          message: "An error occurred while inserting data",
          errorDetails: error.message,
        },
      },
      { status: 500 }
    );
  }
}
