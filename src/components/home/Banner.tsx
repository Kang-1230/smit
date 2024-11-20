"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  title: string;
  url: string;
  num: number;
  isEventPage: boolean;
  link?: string;
};

const splitTitle = (title: string) => {
  return title.split("\n").map((str, index) => (
    <span key={index}>
      {str}
      <br />
    </span>
  ));
};

const isExternalUrl = (url: string) => {
  return url.startsWith("https://") || url.startsWith("http://");
};

export default function Banner({ title, url, isEventPage, num = 1 }: Props) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const WrapperComponent = isExternalUrl(url)
    ? ({ children }: { children: React.ReactNode }) => (
        <a href={url} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      )
    : ({ children }: { children: React.ReactNode }) => (
        <Link href={url}>{children}</Link>
      );

  return (
    <section
      className={`flex h-[29.5rem] flex-col justify-end bg-cover bg-center px-6 py-8 text-white md:h-[50rem]`}
      style={{
        backgroundImage: `url('/images/${isMobile ? "" : "Desktop"}BannerImage${num}.png')`,
      }}
    >
      <WrapperComponent>
        {isMobile ? (
          <div className="absolute inset-0 bg-opacity-35 bg-gradient-to-t from-[rgba(0,0,0,0.6)] via-transparent"></div>
        ) : (
          <>
            <div className="absolute inset-0 bg-opacity-35 bg-gradient-to-t from-[rgba(0,0,0,0.1)] via-transparent"></div>
            <div className="absolute inset-0 bg-opacity-35 bg-gradient-to-r from-[rgba(0,0,0,0.25)] via-transparent"></div>
          </>
        )}

        <div className="relative z-10 mx-auto max-w-[80rem] lg:px-5">
          <div className="mb-4 px-2 md:mb-[4.5rem]">
            {isEventPage && (
              <h2 className="text-xs font-medium md:text-xl">EVENT</h2>
            )}
            <h1 className="text-2xl font-semibold md:text-[3.5rem] md:leading-[76px]">
              {splitTitle(title)}
            </h1>
          </div>

          <button className="mb-3 flex items-center gap-3 rounded-[26px] bg-white bg-opacity-35 py-1 pl-5 pr-1 text-base font-light text-white backdrop-blur-md md:mb-[5.5rem]">
            <div className="w-[4.75rem] text-left">바로가기</div>
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary-900">
              <Image
                src={`/icons/ArrowTopRight.svg`}
                width={24}
                height={24}
                alt="user"
                className="text-secondary-500"
              />
            </div>
          </button>
        </div>
      </WrapperComponent>
    </section>
  );
}
