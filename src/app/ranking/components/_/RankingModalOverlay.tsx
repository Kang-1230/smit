"use client";

import { usePreventBodyScroll } from "@/hooks/usePreventBodyScroll";
import Image from "next/image";

type Props = {
  children: React.ReactNode;
  onClick: () => void;
  isXButtonVisible?: boolean;
};

const RankingModalOverlay = ({
  children,
  onClick,
  isXButtonVisible = true,
}: Props) => {
  usePreventBodyScroll();

  return (
    <div
      onClick={onClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
    >
      <div
        className="relative mx-[24px] w-full max-w-lg rounded-20 bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        {isXButtonVisible && (
          <button
            className="absolute right-5 top-5 text-xl"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            <Image
              src="/icons/XButton.svg"
              width={24}
              height={24}
              alt="Close"
              className="text-secondary-500"
            />
          </button>
        )}

        {children}
      </div>
    </div>
  );
};

export default RankingModalOverlay;
