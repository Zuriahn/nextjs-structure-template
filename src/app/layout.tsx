import type { Metadata } from "next";

import { GlobalContextProvider } from "@/context/global.context";
import SessionContext from "@/context/session.provider.context";

import "./globals.css";
import HeaderApp from "@/components/headers/header.app";

export const metadata: Metadata = {
  title: "Next Template",
  description: "Next app template",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ height: "100vh", padding: 4, margin: 0 }}>
        <SessionContext>
          <GlobalContextProvider>
            <HeaderApp />
            <main>{children}</main>
          </GlobalContextProvider>
        </SessionContext>
      </body>
    </html>
  );
}
