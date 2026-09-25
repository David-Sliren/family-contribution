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
      const customError = new Error("not found token");
      customError.code = "NOT_TOKEN";
      throw customError;
    }
    const { payload } = await jwtVerify(token.value, SECRET);
    const user = payload;
    if (user.role === "user" && pathname.includes("dashboard")) {
      const customError = new Error("user unauthorized");
      customError.code = "USER_UNAUTHORIZED";
      throw customError;
    }

    if (isAuthRoute) return NextResponse.redirect(new URL("/", req.url));

    return NextResponse.next();
  } catch (e) {
    if (e.code === `ERR_JWS_INVALID`) (await cookies()).delete(TOKEN);
    if (e.code === `ERR_JWT_EXPIRED`) (await cookies()).delete(TOKEN);

    if (e.code === "USER_UNAUTHORIZED")
      return NextResponse.redirect(new URL("/", req.url));

    if (!isAuthRoute)
      return NextResponse.redirect(new URL("/auth/login", req.url));
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
