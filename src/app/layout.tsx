import type { Metadata } from "next";
import "../styles/globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Providers from "@/components/providers/QueryClientProvider";
import localFont from "next/font/local";

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "Smit",
  description: "Our Study Meet Smit",
  icons: {
    icon: "/icons/SmitFavicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable} font-pretendard`}>
      <body className="mx-auto flex w-full flex-col xl:max-w-[1232px]">
        <Providers>
          <Header />
          <meta property="og:title" content="Smit" />
          <meta property="og:type" content="website" />
          <meta
            property="og:description"
            content="나만의 스터디 그룹을 온라인에서 만들어보세요!"
          />
          <meta property="og:url" content="https://smit-8y5a.vercel.app" />
          <meta
            property="og:image"
            content="https://smit-8y5a.vercel.app/images/og.png"
          />
          <main className="grow">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
