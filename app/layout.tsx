import { Rubik } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import Providers from "@/shared/components/shared/providers";

const rubik = Rubik({
  subsets: ['latin'],
  variable: '--font-rubik',
  weight: ['400', '500', '600', '700', '800', '900'],
});


export default function RootLayout({
  children
}: {children: any}) {
  return (
    <html lang="en">
      <head>
      </head>
      <body className={clsx(rubik.className, 'dark')}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
