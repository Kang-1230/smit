"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function SearchInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [slug, setSlug] = useState("");

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlug(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && slug.trim() !== "") {
      router.push(`/search/${encodeURIComponent(slug)}`);
    }
  };

  return (
    <div
      className="absolute top-16 z-30 mx-6 flex w-full items-center border-b"
      style={{ width: "calc(100% - 3rem)" }}
    >
      <Image src="/icons/Search.svg" alt="search-icon" width={24} height={24} />
      <input
        ref={inputRef}
        type="text"
        placeholder="공부하고 싶은 분야를 검색해보세요"
        className="w-full bg-transparent p-2 font-pretendard text-base font-normal text-secondary-900 outline-none placeholder:text-secondary-400"
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        value={slug}
      />
      <button
        className="rounded-full bg-secondary-800"
        onClick={() => setSlug("")}
      >
        <Image src="/icons/XSmall.svg" alt="x-icon" width={24} height={24} />
      </button>
    </div>
  );
}
