"use client";

import Image from "next/image";

export default function TopArrow() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className="fixed bottom-[9.5rem] right-6 z-20 flex h-[3.75rem] w-[3.75rem] items-center justify-center rounded-full bg-white shadow-md"
      onClick={scrollToTop}
    >
      <Image
        src="/icons/ArrowTop.svg"
        alt="top-button"
        width={32}
        height={32}
      />
    </button>
  );
}
