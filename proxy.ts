import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define public routes (no authentication required)
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/sso-callback(.*)",
  "/api/webhook(.*)",
  "/about",
  "/contact",
  "/support",
  "/shop(.*)",
  "/collections(.*)",
  "/product(.*)",
  "/search",
  "/cart",
  "/wishlist",
  "/privacy",
  "/terms",
  "/returns",
  "/shipping-policy",
]);

// Define authentication pages specifically
const isAuthRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);

// Define admin routes (requires admin role)
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

// Define protected routes (requires authentication)
const isProtectedRoute = createRouteMatcher([
  "/account(.*)",
  "/checkout",
  "/orders(.*)",
]);

const proxy = clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims, redirectToSignIn } = await auth();
  const isApiRoute = req.nextUrl.pathname.startsWith("/api");
  //   console.log(sessionClaims);
  // Get user role from session claims
  const role = sessionClaims?.public_metadata?.role as string;
  const isAdmin = role === "admin";
  //   console.log(isAdmin);
  //   console.log(role);

  // Handle API routes differently
  if (isApiRoute) {
    // For API routes, return 401 instead of redirect
    if (!isPublicRoute(req) && !userId) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
    return NextResponse.next();
  }

  // 🛡️ REDIRECT LOGGED-IN USERS AWAY FROM SIGN-IN / SIGN-UP
  if (userId && isAuthRoute(req)) {
    // If they are admin, send them directly to the admin suite, otherwise home
    const destination = isAdmin ? "/admin" : "/";
    return NextResponse.redirect(new URL(destination, req.url));
  }

  // Redirect to sign-in if accessing protected route without authentication
  if (!isPublicRoute(req) && !userId) {
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("redirect_url", req.nextUrl.pathname);
    return redirectToSignIn();
  }

  // Protect admin routes - only admins can access
  if (isAdminRoute(req) && !isAdmin) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Protect user account routes - only authenticated users
  if (isProtectedRoute(req) && !userId) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next();
});

export default proxy;

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
