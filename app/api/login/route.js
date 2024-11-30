import { getStudent, getTeacher } from "@/lib/getInfo";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req, res) {
  try {
    const { role, roll, email, password } = await req.json();
    // console.log("role: ", role);

    if (!(roll || email) || !password || !role) {
      return NextResponse.json(
        {
          error: {
            message: "Please provide all the required fields",
            fields: {
              roll: roll ? roll : "Not provided",
              email: email ? email : "Not provided",
              role: role ? role : "Not provided",
            },
          },
        },
        { status: 400 }
      );
    }

    let user;
    if (role === "student") {
      user = await getStudent(roll, password);
    } else {
      user = await getTeacher(email, password);
    }
    const errorPhrase = [
      "Student not found",
      "Teacher not found",
      "Invalid password",
    ];

    if (errorPhrase.includes(user)) {
      return NextResponse.json({
        status: 401,
        error: {
          message: "Invalid credentials!",
          details: user,
        },
      });
    } else {
      let payload;
      if (role === "student") {
        payload = {
          roll: user[0].student_roll,
          name: user[0].student_name,
          email: user[0].student_email,
          role: "student",
        };
      } else {
        payload = {
          id: user[0].teacher_id,
          name: user[0].teacher_name,
          email: user[0].teacher_email,
          role: "teacher",
        };
      }
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      // Set the cookie using NextResponse
      const response = NextResponse.json({
        status: 200,
        body: {
          message: "Successfully logged in",
        },
      });
      response.cookies.set("token", token, {
        httpOnly: !process.env.IS_DEV,
        path: "/",
        maxAge: 24 * 60 * 60,
      });
      return response;
    }
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          message: "An error occurred while logging in. Please try again.",
          errorDetails: error,
        },
      },
      { status: 500 }
    );
  }
}
