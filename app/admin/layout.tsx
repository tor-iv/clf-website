import { Bricolage_Grotesque, DM_Sans } from 'next/font/google';
import '../globals.css';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  axes: ['opsz', 'wdth'],
});
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' });

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${dmSans.variable}`}>
      <body className="font-sans bg-clf-off-white text-clf-text">
        {children}
      </body>
    </html>
  );
}
