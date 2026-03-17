import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isProtectedPath = req.nextUrl.pathname.startsWith("/create") || req.nextUrl.pathname.startsWith("/dashboard");

  // Redirect to home if accessing protected path without being logged in
  if (isProtectedPath && !isLoggedIn) {
    const callbackUrl = req.nextUrl.pathname;
    return NextResponse.redirect(new URL(`/?callbackUrl=${callbackUrl}`, req.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
