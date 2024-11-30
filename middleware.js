import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { parse } from "cookie"; // Correct import for the cookie module

const publicRoutes = ["/login", "/registration"];
const protectedRoutes = [
  "/dashboard",
  "/api/:path*",
  "/logout",
  "/result",
  "/classRoutine",
  "/syllabus",
  "/markInput",
];

const adminProtectedRoutes = [
  "/admin/dashboard",
  "/admin/api/:path*",
  "/admin/logout",
];

const adminPublicRoutes = ["/admin/login"];

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const cookies = parse(req.headers.get("cookie") || "");
  const token = cookies.token;

  let isAuthenticated = false;
  let isAdmin = false;

  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);
      isAuthenticated = true;
      isAdmin = payload.role === "admin";
    } catch (err) {
      console.error("Token verification failed:", err);
    }
  }

  const isPublicRoute = publicRoutes.includes(pathname);
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAdminPublicRoute = adminPublicRoutes.includes(pathname);
  const isAdminProtectedRoute = adminProtectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isAuthenticated) {
    if (isPublicRoute) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    if (isAdmin && isAdminPublicRoute) {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }
    if (isAdmin && isAdminProtectedRoute) {
      return NextResponse.next();
    } else if (!isAdmin && isProtectedRoute) {
      return NextResponse.next();
    } else if (!isAdmin && isAdminProtectedRoute) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    } else if (isAdmin && isProtectedRoute) {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }
  } else {
    if (isPublicRoute || isAdminPublicRoute) {
      return NextResponse.next();
    }
    if (isAdminProtectedRoute) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
    if (isProtectedRoute) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/:path*",
    "/login",
    "/registration",
    "/admin/:path*",
    "/:path*",
  ],
};
