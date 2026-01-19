import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isExpertRoute = req.nextUrl.pathname.startsWith("/expert");
    const isDashboardRoute = req.nextUrl.pathname.startsWith("/dashboard");

    if (isExpertRoute && token?.role !== "expert") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if (isDashboardRoute && token?.role === "expert") {
       // Experts should go to expert dashboard, but maybe they want to see mother dashboard too?
       // Requirement says "Expert Dashboard (Basic) /expert/dashboard".
       // Let's assume experts should stick to expert dashboard or allow access.
       // For strict separation:
       // return NextResponse.redirect(new URL("/expert/dashboard", req.url));
       // For now, let's allow flexibility or just keep it simple.
    }
    
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/expert/:path*"],
};
