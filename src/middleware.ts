import {
  type NextRequest,
  //  NextResponse
} from 'next/server';
// import { getToken } from 'next-auth/jwt';
import createMiddleware from 'next-intl/middleware';

import { AppConfig } from './utils/AppConfig';

const intlMiddleware = createMiddleware({
  locales: AppConfig.locales,
  localePrefix: AppConfig.localePrefix,
  defaultLocale: AppConfig.defaultLocale,
});

export default async function middleware(req: NextRequest) {
  // const token = await getToken({
  //   req,
  //   secret: process.env.NEXTAUTH_SECRET,
  // });

  // Nếu user chưa đăng nhập và không truy cập '/unauthorized', chuyển hướng
  // if (!req.nextUrl.pathname?.includes('unauthorized') && !token) {
  //   return NextResponse.redirect(new URL('/unauthorized', req.url));
  // }

  const response = intlMiddleware(req);
  return response;
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'], // Middleware áp dụng cho tất cả route trừ `_next` và file tĩnh
};
