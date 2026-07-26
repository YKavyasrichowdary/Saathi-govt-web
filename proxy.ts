import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Admin routes protection: only ADMIN allowed
  if (pathname.startsWith("/admin")) {
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = "/auth/signin";
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }

    if (token.role !== "ADMIN") {
      const url = req.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
  }

  // If ADMIN accesses student-facing pages, redirect to corresponding admin pages
  if (token && token.role === "ADMIN") {
    if (pathname.startsWith("/opportunities")) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/opportunities";
      return NextResponse.redirect(url);
    }

    if (pathname === "/dashboard") {
      const url = req.nextUrl.clone();
      url.pathname = "/admin";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/opportunities/:path*",
    "/dashboard",
  ],
};
