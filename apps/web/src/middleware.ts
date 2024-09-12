import { NextRequest, NextResponse } from 'next/server';

export async function middleware(_req: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)'],
};
