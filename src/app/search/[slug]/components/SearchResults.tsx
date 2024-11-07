"use client";

import PostCard from "@/components/home/PostCard";
import SearchFilter from "./SearchFilter";
import { useQuery } from "@tanstack/react-query";
import { fetchAllStudyKeywords } from "@/service/posts";
import Image from "next/image";

type Props = {
  slug: string;
};

export default function SearchResults({ slug }: Props) {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchAllStudyKeywords(slug),
  });

  if (isLoading) return <>Loading...</>;

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="text-xs font-normal text-secondary-500">
          검색결과 {posts?.length}개
        </div>
        <SearchFilter />
      </div>
      <section className="mb-24 mt-4 flex flex-col items-center justify-center gap-4">
        {!posts?.length && (
          <Image
            className="mt-20"
            src="/icons/SearchFailed.svg"
            alt="seach-fail"
            width={300}
            height={300}
          />
        )}
        {posts?.map((item, i) => (
          <PostCard color="primary" post={item} key={i} />
        ))}
      </section>
    </>
  );
}
