import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import NextTopLoader from "nextjs-toploader";
import ContextProvider from "@/components/provider/ContextProvider";
import GlobalStyleProvider from "@/components/provider/GlobalStyleProvider";

const noto = localFont({
  src: "./fonts/NotoSansDisplay.ttf",
  variable: "--font-noto-sans-display",
  weight: "100 900",
});

const inter = localFont({
  src: "./fonts/inter.ttf",
  variable: "--font-inter",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "To-do Click",
  description: "To-do Click, administrador de tareas hecho por Marcos Morua",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${inter.variable} ${noto.variable} antialiased bg-bg text-textColor`}
        >
          <NextTopLoader
            height={2}
            color="#6c63ff"
            easing="cubic-bezier(0.53 , 0.24, 0.1)"
          />
          <ContextProvider>
            <GlobalStyleProvider>{children}</GlobalStyleProvider>
          </ContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
