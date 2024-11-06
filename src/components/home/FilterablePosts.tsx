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
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const { data: posts, refetch } = usePostsCategoryQuery(
    selectedJobs,
    selectedCategory,
  );

  useEffect(() => {
    refetch();
  }, [selectedJobs, selectedCategory, refetch]);

  if (!posts) return <>Posts가 없습니다</>;

  return (
    <section className="my-4 flex flex-col gap-4 px-6">
      <h2 className="text-xl font-medium flex gap-1">
        <Image src={`/icons/Book.svg`} width={20} height={20} alt="user" />
        최근 스터디
      </h2>
      <p className="text-secondary-500 text-sm">
        최근 가장 많은 관심을 받았어요.
      </p>
      <Category
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedJobs={selectedJobs}
        setSelectedJobs={setSelectedJobs}
      />
      <ul className="flex flex-col gap-2">
        {posts?.map((post) => (
          <li key={post.post_id}>
            <PostCard
              post={post}
              variant="gray"
              showAuthor={true}
              showStudyName={true}
              showLikesCount={true}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
