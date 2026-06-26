// Root layout — all real routes go through app/[locale]/layout.tsx which provides
// html, body, fonts, and providers. This wrapper satisfies Next.js's requirement
// for a root layout file.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children as React.ReactElement;
}
