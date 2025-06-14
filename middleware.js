// middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Define public routes that do not require authentication
const isPublicRoute = createRouteMatcher([
  '/',             // Home page
  '/sign-in(.*)',  // Sign-in and its subroutes
  '/sign-up(.*)',  // Sign-up and its subroutes
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = auth();

  // If user is not signed in and tries to access a protected route, redirect to sign-in
  if (!isPublicRoute(req) && !userId) {
    const signInUrl = new URL('/sign-in', req.url);
    return NextResponse.redirect(signInUrl);
  }

  // Allow the request to continue otherwise
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Match all routes except Next.js static files and assets
    '/((?!_next/static|_next/image|favicon.ico).*)',

    // Also protect API and TRPC routes
    '/(api|trpc)(.*)',
  ],
};
