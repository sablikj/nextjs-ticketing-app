import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
// Used for protecting routes on the server side in one place instead doing it in every route

export default withAuth(
  function middleware(req) {
    console.log(req.nextUrl.pathname);
    console.log(req.nextauth.token.role);

    if (
      req.nextUrl.pathname.startsWith("/CreateUser") &&
      req.nextauth.token.role != "admin"
    ) {
      return NextResponse.rewrite(new URL("/Denied", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // If token is present, user is authorized
    },
  }
);

export const config = { matcher: ["/CreateUser"] };
