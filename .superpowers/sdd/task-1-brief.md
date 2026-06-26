## Task 1: Project Scaffold

**Files:**
- Create: `clf-website/` (entire repo root)
- Create: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `next.config.ts`
- Create: `middleware.ts`, `i18n.ts`

- [ ] **Step 1: Bootstrap Next.js project**
```bash
mkdir clf-website && cd clf-website
pnpm dlx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*"
```

- [ ] **Step 2: Install dependencies**
```bash
pnpm add next-intl better-sqlite3 react-markdown
pnpm add -D @types/better-sqlite3
```

- [ ] **Step 3: Configure next-intl middleware** — `middleware.ts`
```typescript
import createMiddleware from 'next-intl/middleware';
export default createMiddleware({
  locales: ['en', 'es', 'fr', 'sw'],
  defaultLocale: 'en',
});
export const config = { matcher: ['/((?!api|admin|_next|.*\\..*).*)'] };
```

- [ ] **Step 4: Configure i18n** — `i18n.ts`
```typescript
import { getRequestConfig } from 'next-intl/server';
export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./messages/${locale}.json`)).default,
}));
```

- [ ] **Step 5: Update `next.config.ts`**
```typescript
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();
export default withNextIntl({ output: 'standalone' });
```

- [ ] **Step 6: Update `tailwind.config.ts`** with CLF design system tokens
```typescript
import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-bricolage)', 'sans-serif'],
        sans: ['var(--font-dm-sans)', 'sans-serif'],
      },
      colors: {
        clf: {
          red:        '#B91C1C',
          black:      '#1C1917',
          'off-white':'#FAFAF9',
          'warm-gray':'#E7E5E4',
          amber:      '#FEF3C7',
          text:       '#44403C',
        },
      },
    },
  },
};
export default config;
```

- [ ] **Step 7: Create `.env.example`**
```
ADMIN_PASSWORD=changeme
SESSION_SECRET=
DB_PATH=./data/clf.db
DATA_DIR=./data/uploads
HTTPS=true
```

- [ ] **Step 8: Init git + create GitHub repo**
```bash
git init && git add . && git commit -m "init: project scaffold"
gh repo create clf-website --public --push --source=.
```

---

