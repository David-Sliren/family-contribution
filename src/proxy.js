import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { SECRET } from "./constants/env";
import { TOKEN } from "./constants/config";

export const proxy = async (req) => {
  const token = req.cookies.get(TOKEN);
  const { pathname } = req.nextUrl;

  const isAuthRoute = pathname.includes("auth");

  try {
    if (!token) {
      const error = new Error("no token found");
      error.code = "No_token";
      throw error;
    }
    await jwtVerify(token.value, SECRET);

    if (isAuthRoute) return NextResponse.redirect(new URL("/", req.url));

    return NextResponse.next();
  } catch (e) {
    if (e.code === "No_token") console.error(e.message);
    if (e.name === `JWSInvalid`) console.error(`token error: ${e.message}`);
    if (!isAuthRoute) return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/medicine", "/additional-costs", "/profile", "/auth/:path*"],
};
