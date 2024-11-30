import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { VerifyLogin } from "@/lib/admin/admin";
import { decrypt, encrypt } from "@/middlewares/crypto";

export async function POST(req, res) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        {
          error: {
            message: "Please provide all the required fields",
            fields: {
              email: email ? email : "Not provided",
              password: password ? password : "Not provided",
            },
          },
        },
        { status: 400 }
      );
    }
    // console.log("Pass: ", password);
    // console.log("EncPass: ", encrypt(password));
    const user = await VerifyLogin(email, password);
    const errorPhrase = ["Admin not found", "Invalid password"];

    if (errorPhrase.includes(user)) {
      return NextResponse.json({
        status: 401,
        error: {
          message: "Invalid credentials!",
          details: user,
        },
      });
    } else {
      const payload = {
        id: user[0].admin_id,
        name: "Admin",
        email: user[0].admin_email,
        role: "admin",
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      const response = NextResponse.json({
        status: 200,
        body: {
          message: "Successfully Admin logged in",
        },
      });

      response.cookies.set("token", token, {
        httpOnly: !process.env.IS_DEV,
        path: "/",
        maxAge: 1 * 60 * 60,
      });
      return response;
    }
  } catch (error) {
    console.error("An error occurred while logging in: ", error);
    return NextResponse.json(
      {
        error: {
          message: "An error occurred while logging in",
          details: error,
        },
      },
      { status: 500 }
    );
  }
}
