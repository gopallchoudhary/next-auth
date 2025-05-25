import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export function middleware(request: NextRequest) {
    // path
    const path = request.nextUrl.pathname
    const isPathPublic = path == '/login' || path == '/signup'

    // token
    const token = request.cookies.get("token")?.value || ""

    if (isPathPublic && token) {
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }

    if (!isPathPublic && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/',
        '/profile/:id*',
        '/login',
        '/signup'
    ]
}