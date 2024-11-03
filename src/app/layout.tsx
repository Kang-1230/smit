import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "../styles/globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Providers from "@/components/providers/QueryClientProvider";

const sans = Open_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Smit",
  description: "Our Study Meet Smit",
  icons: {
    icon: "/icons/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="font-Pretendard">
      <body className="flex flex-col w-full max-w-screen-xl mx-auto">
        <Providers>
          <Header />
          <main className="grow">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
