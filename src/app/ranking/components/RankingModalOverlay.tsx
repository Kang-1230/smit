"use client";

import Image from "next/image";

const RankingModalOverlay = ({
  children,
  onClick,
  isXButtonVisible = true,
}: {
  children: React.ReactNode;
  onClick: () => void;
  isXButtonVisible?: boolean;
}) => {
  return (
    <div
      onClick={onClick}
      className="fixed inset-0 flex items-center justify-center w-full h-full bg-black/70 z-50"
    >
      <div
        className="h-auto bg-white rounded-20 flex items-center justify-center relative mx-[24px] w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {isXButtonVisible && (
          <button className="absolute top-5 right-5 text-xl" onClick={onClick}>
            <Image
              src={`/icons/XButton.svg`}
              width={24}
              height={24}
              alt="user"
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
