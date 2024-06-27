import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Password Generator",
  description: "A modern and minimalistic password generator.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-neutral-light dark:bg-neutral-dark text-gray-900 dark:text-gray-100`}
      >
        {children}
      </body>
    </html>
  );
}
