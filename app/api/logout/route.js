import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const response = NextResponse.redirect(new URL("/login", request.url));

    response.cookies.set("token", "", {
      maxAge: 0,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Error logging out:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
