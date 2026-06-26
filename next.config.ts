import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

export default withNextIntl({
  output: 'standalone',
  // next-intl v3.26.x only sets webpack aliases, not Turbopack aliases.
  // Next.js 16 uses Turbopack for production, so we add the alias manually.
  turbopack: {
    resolveAlias: {
      'next-intl/config': './i18n/request.ts',
    },
  },
});
