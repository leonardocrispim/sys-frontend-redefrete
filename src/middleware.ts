import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { getToken } from 'next-auth/jwt';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  if (!token) {
    return NextResponse.redirect(new URL('/?auth=danied', request.url));
  }
}

export const config = { matcher: ['/admin', '/admin/:path*'] };
