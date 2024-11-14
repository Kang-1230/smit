"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

const searchSchema = z.object({
  search: z.string(),
});

export default function SearchForm() {
  const [isFocused, setIsFocused] = useState(false);
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";
  //   const category = searchParams.get("category") || "ALL";
  const pathname = usePathname();
  const router = useRouter();

  const { register, handleSubmit, formState, setValue } = useForm({
    mode: "onChange",
    defaultValues: {
      search,
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
    setValue("search", "");
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(onSubmit)(e)}
      className={`absolute top-16 z-30 mx-6 flex w-full items-center border-b ${isText ? "border-secondary-600" : "border-secondary-200"}`}
      style={{ width: "calc(100% - 3rem)" }}
    >
      <Image src="/icons/Search.svg" alt="search-icon" width={24} height={24} />
      <input
        type="search"
        {...register("search")}
        placeholder="공부하고 싶은 분야를 검색해보세요"
        className="w-full bg-transparent p-2 font-pretendard text-base font-normal text-secondary-900 outline-none placeholder:text-secondary-400"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <button
        className="absolute right-0 rounded-full bg-secondary-800"
        type="button"
        onClick={handleClearSearch}
      >
        <Image src="/icons/XSmall.svg" alt="x-icon" width={24} height={24} />
      </button>
    </form>
  );
}
