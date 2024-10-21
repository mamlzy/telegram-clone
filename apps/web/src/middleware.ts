import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import type { User } from 'better-auth';

import { env } from './env';

export async function middleware(req: NextRequest) {
  let response = NextResponse.next();
  const { pathname } = req.nextUrl;
  const isAuthRoutes = ['/login', '/register'].includes(pathname);

  if (!isAuthRoutes) {
    const authRes = await fetch(`${env.NEXT_PUBLIC_API_URL}/me`, {
      method: 'GET',
      headers: {
        Cookie: cookies().toString(),
      },
      credentials: 'include',
    });

    if (!authRes.ok) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    const authUser = (await authRes.json()) as User;

    console.log('isAuthRoutes =>', { pathname, isAuthRoutes, authUser });
  }

  return response;
}

export const config = {
  matcher: ['/', '/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)'],
};
