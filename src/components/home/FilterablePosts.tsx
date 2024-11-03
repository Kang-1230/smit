"use client";

import { usePostsCategoryQuery } from "@/hooks/usePostsQuery";
import Category from "./Category";
import PostCard from "./PostCard";
import { useEffect, useState } from "react";
import { SortCategory } from "@/service/posts";

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
    <section className="my-4 flex flex-col gap-4">
      <h2 className="text-2xl font-bold my-2">신규 스터디</h2>
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
