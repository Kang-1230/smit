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
    <section className="mt-4 flex flex-col bg-[#F6F6F4] px-6 pb-36 pt-10">
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

      <ul className="flex flex-col gap-5">
        {!posts.length && (
          <div className="mt-6 text-center text-sm font-bold">
            관련된 POST가 없습니다..!
          </div>
        )}
        {posts?.map((post) => (
          <li key={post.post_id}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </section>
  );
}
