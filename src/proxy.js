import { NextResponse } from "next/server";
import { getSession } from "./utils/getUserData";

export const proxy = async (req) => {
  const session = await getSession();

  const { pathname } = req.nextUrl;
  const isApiRoute = pathname.startsWith("/api");
  const isAuthRoute = pathname.includes("auth");
  const isDashboardRoute = pathname.includes("dashboard");

  const deny = (error, status) =>
    isApiRoute
      ? Response.json({ error }, { status })
      : NextResponse.redirect(new URL("/", req.url));

  if (!session && !isAuthRoute) {
    return deny("Token invalid", 401);
  }

  if (session && isAuthRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (session && session.user.role !== "admin" && isDashboardRoute) {
    return deny("user unauthorized", 403);
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/inventory",
    "/expenses",
    "/profile",
    "/auth/:path*",
    "/dashboard/:path*",
  ],
};
