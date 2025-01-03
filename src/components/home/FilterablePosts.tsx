"use client";

import { usePostsCategoryQuery } from "@/hooks/usePostsQuery";
import Category from "./Category";
import PostCard from "./PostCard";
import { useEffect, useState } from "react";
import { SortCategory } from "@/service/posts";
import Image from "next/image";

export default function FilterablePosts() {
  const [selectedCategory, setSelectedCategory] =
    useState<SortCategory>("최신순");
  const [selectedJobs, setSelectedJobs] = useState<string[]>([""]);
  const { data: posts, refetch } = usePostsCategoryQuery(
    selectedJobs,
    selectedCategory,
  );

  useEffect(() => {
    refetch();
  }, [selectedJobs, selectedCategory, refetch]);

  if (!posts) return <>Posts가 없습니다</>;

  return (
    <section className="mt-4 flex flex-col bg-back px-6 pb-24 pt-10 md:pb-16">
      <h2 className="ml-1 flex gap-1 text-xl font-medium">
        <Image src={`/icons/Book.svg`} width={23} height={23} alt="user" />
        최근 스터디
      </h2>

      <Category
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        arr={selectedJobs}
        setArr={setSelectedJobs}
      />

      <ul className="grid w-full grid-cols-1 place-items-center gap-5 md:grid-cols-2 lg:grid-cols-3">
        {!posts.length && (
          <div className="col-span-full flex w-full items-center justify-center">
            <Image
              src="/icons/SearchFailed.svg"
              alt="seach-fail"
              width={300}
              height={300}
              className="mx-auto"
            />
          </div>
        )}
        {posts?.map((post) => (
          <li key={post.post_id} className="w-full">
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </section>
  );
}
