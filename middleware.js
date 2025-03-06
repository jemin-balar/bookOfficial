import { NextResponse } from 'next/server';

export function middleware(request) {
    // Get the pathname of the request (e.g. /admin, /cpanel)
    const path = request.nextUrl.pathname;

    // Define public paths that don't require authentication
    const isPublicPath = path === '/cpanel';

    // For client-side auth, we'll let the page component handle the auth check
    return NextResponse.next();
}

// Configure the paths that middleware will run on
export const config = {
    matcher: [
        '/admin',
        '/admin/:path*',
        '/cpanel'
    ]
}; 