import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { publicRoutes, protectedRoutes, DEFAULT_LOGIN_REDIRECT, authRoutes } from '@/lib/routes'
import { decrypt } from '@/lib/session'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if the requested path matches our defined routes
  const isPublicRoute = publicRoutes.includes(pathname);
  const isAuthRoute = authRoutes.includes(pathname);
  const isProtectedRoute = protectedRoutes.includes(pathname);

  try {
    // Get the session token from cookie
    const sessionToken = request.cookies.get("session")?.value;
    const session = sessionToken ? await decrypt(sessionToken) : null;

    // Redirect authenticated users trying to access auth routes
    if (session && isAuthRoute) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, request.url));
    }

    // Redirect unauthenticated users trying to access protected routes
    if (!session && isProtectedRoute) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    // On error, redirect to login for protected routes
    if (isProtectedRoute) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
  }
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}