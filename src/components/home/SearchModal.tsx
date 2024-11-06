"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const SearchModal = ({ onClick }: { onClick: () => void }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus the input element when the modal is mounted
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  return (
    <>
      <div
        className="fixed inset-0 z-10 flex h-full w-full bg-gradient-to-t from-[rgba(255,255,255,0.1)] to-white"
        onClick={onClick}
      ></div>
      <div
        className="absolute top-11 z-30 mx-6 flex w-full items-center border-b"
        style={{ width: "calc(100% - 3rem)" }}
      >
        <Image
          src="/icons/Search.svg"
          alt="search-icon"
          width={24}
          height={24}
        />
        <input
          ref={inputRef}
          type="text"
          placeholder="공부하고 싶은 분야를 검색해보세요"
          className="w-full bg-transparent p-2 font-pretendard text-base font-normal text-secondary-900 outline-none placeholder:text-secondary-400"
        />
        <button className="rounded-full bg-secondary-800" onClick={onClick}>
          <Image src="/icons/XSmall.svg" alt="x-icon" width={24} height={24} />
        </button>
      </div>
    </>
  );
};

export default SearchModal;
