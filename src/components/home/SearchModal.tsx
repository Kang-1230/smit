"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const SearchModal = ({
  onClick,
  isMobile,
}: {
  onClick: () => void;
  isMobile: boolean;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [slug, setSlug] = useState("");
  const [isFocused, setIsFocused] = useState(false);

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
      router.push(`/search?search=${encodeURIComponent(slug)}`);
      onClick();
    }
  };

  const isText = isFocused && slug.length > 0;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      <div
        className="fixed inset-0 z-30 flex h-screen w-screen cursor-pointer bg-gradient-to-t from-[rgba(255,255,255,0.1)] via-[rgba(255,255,255,0.85)] to-white"
        onClick={onClick}
      ></div>

      <div className={`fixed top-11 z-30 w-full md:top-[4.875rem]`}>
        <div
          className={`mx-6 w-[calc(100%-3rem)] max-w-[57rem] border-b md:mx-auto ${isText ? "border-secondary-600" : "border-secondary-200"} flex items-center`}
        >
          <Image
            src="/icons/Search.svg"
            alt="search-icon"
            width={isMobile ? 24 : 40}
            height={isMobile ? 24 : 40}
          />
          <input
            ref={inputRef}
            type="text"
            placeholder="공부하고 싶은 분야를 검색해보세요"
            className="w-full bg-transparent p-2 font-pretendard text-base font-light text-secondary-900 outline-none placeholder:text-secondary-400 md:p-5 md:text-[2.5rem]"
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            value={slug}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          {slug !== "" && (
            <button
              className="rounded-full bg-secondary-800"
              onClick={() => setSlug("")}
            >
              <Image
                src="/icons/XSmall.svg"
                alt="x-icon"
                width={isMobile ? 24 : 40}
                height={isMobile ? 24 : 40}
              />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchModal;
