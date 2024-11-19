"use client";

import Link from "next/link";
import Image from "next/image";
import Badge from "@/components/common/Badge";
import LikeButton from "@/components/common/LikeButton";
import { Post } from "@/types/posts";
import { usePostLikers } from "@/hooks/useLikePost";

export type Props = {
  post: Post;
  color?: "tertiary" | "primary";
};

export default function PostCard({ post, color = "tertiary" }: Props) {
  const { data } = usePostLikers(post.id);
  return (
    <Link href={`/post/${post.id}`}>
      <section
        className={`flex h-[18rem] w-full flex-col justify-between gap-4 rounded-20 p-5 ${color === "tertiary" ? "bg-white" : "bg-tertiary-50"} relative`}
      >
        <LikeButton
          className="absolute right-2 top-4"
          postId={post.id}
          isBoundary={false}
        />
        <div className="flex items-center justify-between">
          <div className="flex flex-1 gap-2">
            <div className="relative h-9 w-9 rounded-full border">
              <Image
                className="h-full w-full rounded-full object-cover"
                src={post.study.image || ""}
                alt={post.study.name}
                width={80}
                height={80}
              />
            </div>
            <div className="flex flex-col overflow-hidden text-secondary-700">
              <div className="text-xs font-normal">{post.leader.name}</div>
              <div className="w-48 truncate text-sm font-medium">
                {post.study.name}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <p className="line-clamp-3 w-full flex-wrap break-words font-semibold">
            {post.title}
          </p>
          <div className="flex flex-wrap gap-1">
            {post.study.tags.map((category, idx) => (
              <Badge
                category={category}
                key={`${post.study.id}-${category}`}
                idx={idx}
                color={color === "primary" ? "primary" : "tertiary"}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-between border-t border-secondary-200 pt-4 text-sm">
          <div>
            <span>
              모집 {post.study.currentParticipants + 1}/
              {post.study.totalParticipants}
            </span>
          </div>
          <div className="flex gap-2 text-sm font-normal text-secondary-400">
            <div className="flex gap-1">
              <Image
                className="h-full w-full"
                src="/icons/HeartGray.svg"
                alt="heart"
                width={15}
                height={15}
              />
              {data?.length}
            </div>
            <div className="flex gap-[0.1rem]">
              <Image
                className="h-full w-full"
                src="/icons/CommentGray.svg"
                alt="comment"
                width={15}
                height={15}
              />
              {post.comments}
            </div>
          </div>
        </div>
      </section>
    </Link>
  );
}
