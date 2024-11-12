"use client";

import PostCard from "@/components/home/PostCard";
import SearchFilter from "./SearchFilter";
import { useQuery } from "@tanstack/react-query";
import { SortCategory, fetchAllStudyKeywords } from "@/service/posts";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  slug: string;
};

export default function SearchResults({ slug }: Props) {
  const [category, setCategory] = useState<SortCategory>("최신순");

  const {
    data: posts,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchAllStudyKeywords(slug, category),
  });

  useEffect(() => {
    refetch();
  }, [category, setCategory, refetch]);

  if (isLoading) return <>Loading...</>;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="text-xs font-normal text-secondary-500">
          검색결과 {posts?.length}개
        </div>
        <SearchFilter category={category} setCategory={setCategory} />
      </div>
      <section className="mb-14 mt-4 flex w-full flex-col items-center justify-center gap-4">
        {!posts?.length && (
          <Image
            className="mt-20"
            src="/icons/SearchFailed.svg"
            alt="seach-fail"
            width={300}
            height={300}
          />
        )}
        <ul className="flex w-full flex-col gap-4">
          {posts?.map((item, i) => (
            <PostCard color="primary" post={item} key={i} />
          ))}
        </ul>
      </section>
    </div>
  );
}
