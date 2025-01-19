import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/sfp2025/form') {

    return NextResponse.redirect(new URL('/', request.url));
  }


  return NextResponse.next();
}


export const config = {
  matcher: '/sfp2025/form',
};
