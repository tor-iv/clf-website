import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Bricolage_Grotesque, DM_Sans } from 'next/font/google';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import '../globals.css';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  axes: ['opsz', 'wdth'],
});
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' });

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();
  return (
    <html lang={locale} className={`${bricolage.variable} ${dmSans.variable}`}>
      <body className="font-sans bg-clf-off-white text-clf-text">
        <NextIntlClientProvider messages={messages}>
          <Nav />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
