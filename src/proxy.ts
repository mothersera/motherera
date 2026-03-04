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

    // Neurodiversity Community Protection
    if (req.nextUrl.pathname.startsWith("/community/neurodiversity")) {
      const plan = token?.subscriptionPlan as string | undefined;
      
      // Basic users -> Redirect to pricing
      if (!plan || plan === "basic") {
        const url = new URL("/pricing", req.url);
        url.searchParams.set("error", "premium_required");
        return NextResponse.redirect(url);
      }
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
  matcher: ["/dashboard/:path*", "/expert/:path*", "/community/neurodiversity/:path*"],
};
