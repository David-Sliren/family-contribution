import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { SECRET } from "./constants/env";
import { TOKEN } from "./constants/config";
import { cookies } from "next/headers";

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
    // if (e.code === "No_token") console.log(e.message);
    if (e.code === `ERR_JWS_INVALID`) (await cookies()).delete(TOKEN);
    if (e.code === `ERR_JWT_EXPIRED`) (await cookies()).delete(TOKEN);

    if (!isAuthRoute)
      return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/medicine", "/additional-costs", "/profile", "/auth/:path*"],
};
