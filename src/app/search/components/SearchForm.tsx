"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

const searchSchema = z.object({
  search: z.string(),
});

export default function SearchForm() {
  const [isFocused, setIsFocused] = useState(false);
  const searchParams = useSearchParams();
  const [isMobile, setIsMobile] = useState(false);

  const search = searchParams.get("search") || "";
  //   const category = searchParams.get("category") || "ALL";
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };
      handleResize();

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const { register, handleSubmit, setFocus, resetField } = useForm({
    mode: "onChange",
    defaultValues: {
      search: "",
    },
    resolver: zodResolver(searchSchema),
  });

  const onSubmit = (data: FieldValues) => {
    const query = new URLSearchParams(data).toString();
    if (pathname === "/search") {
      router.replace(`/search?${query}`);
      return router.refresh();
    }
    router.push(`/search?${query}`);
  };

  const isText = isFocused || search;

  const handleClearSearch = () => {
    resetField("search");
    setFocus("search");
  };

  return (
    <div className="fixed top-11 z-30 w-full bg-white backdrop-blur-md md:top-[4.875rem]">
      <form
        onSubmit={(e) => handleSubmit(onSubmit)(e)}
        className={`mx-6 w-[calc(100%-3rem)] max-w-[57rem] border-b md:mx-auto ${isText ? "border-secondary-600" : "border-secondary-200"} relative flex items-center`}
      >
        <Image
          src="/icons/Search.svg"
          alt="search-icon"
          width={isMobile ? 24 : 40}
          height={isMobile ? 24 : 40}
        />
        <input
          type="search"
          {...register("search")}
          placeholder="공부하고 싶은 분야를 검색해보세요"
          className="w-full bg-transparent p-2 font-pretendard text-base font-light text-secondary-900 outline-none placeholder:text-secondary-400 md:p-5 md:text-[2.5rem]"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <button
          className="absolute right-0 rounded-full bg-secondary-800"
          type="button"
          onClick={handleClearSearch}
        >
          <Image
            src="/icons/XSmall.svg"
            alt="x-icon"
            width={isMobile ? 24 : 40}
            height={isMobile ? 24 : 40}
          />
        </button>
      </form>
    </div>
  );
}
