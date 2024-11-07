// components/Header.tsx
import React from "react";
import Image from "next/image";

interface HeaderProps {
  onQuestionClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onQuestionClick }) => {
  return (
    <>
      <Image
        className="absolute left-1/2 top-0 -translate-x-1/2"
        src="/images/rankingBackground.svg"
        alt="rankingbg"
        width={375}
        height={375}
      />
      <div className="flex justify-between px-[24px] py-[64px]">
        <h1 className="relative text-[20px] font-semibold leading-normal">
          주간 그룹 랭킹
        </h1>
        <button
          className="relative flex items-center justify-center"
          onClick={onQuestionClick}
        >
          <Image src="/icons/Info.svg" alt="info" width={24} height={24} />
        </button>
      </div>
    </>
  );
};

export default Header;
