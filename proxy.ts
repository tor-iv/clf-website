import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'es', 'fr', 'sw'],
  defaultLocale: 'en',
});

export const config = { matcher: ['/((?!api|admin|_next|.*\\..*).*)'] };
