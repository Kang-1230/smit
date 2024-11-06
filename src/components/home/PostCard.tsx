"use client";

import Link from "next/link";
import LikeButton from "../common/LikeButton";
import { PostWithRelations } from "@/service/posts";
import OccupancyCounter from "./OccupancyCounter";
import Image from "next/image";
import Badge from "../common/Badge";

export type Props = {
  post: PostWithRelations;
};

export default function PostCard({ post }: Props) {
  const { post_id, study_id, study, user } = post;
  const {
    study_max_people,
    study_category,
    study_name,
    study_imgurl,
    study_description,
  } = study;

  return (
    <Link href={`/post/${post_id}`}>
      <section className="flex h-[18rem] w-full flex-col justify-between gap-4 rounded-20 bg-white p-5">
        <div className="flex items-center justify-between">
          <div className="flex flex-1 gap-2">
            <div className="relative h-9 w-9 rounded-full border">
              <Image
                className="h-full w-full rounded-full object-cover"
                src={study_imgurl || ""}
                alt={study_name}
                width={25}
                height={25}
              />
            </div>
            <div className="flex flex-col overflow-hidden font-normal text-secondary-700">
              <div className="text-xs">{user.name}</div>
              <div className="w-48 truncate text-sm font-normal">
                {study_name}
              </div>
            </div>
          </div>
          <LikeButton postId={post_id} isBoundary={false} />
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <p className="line-clamp-3 w-full flex-wrap break-words font-semibold">
            {study_description}
          </p>
          <div className="flex flex-wrap gap-1">
            {study_category.map((category, idx) => (
              <Badge
                category={category}
                key={`${study.study_id}-${category}`}
                idx={idx}
                color="tertiary"
              />
            ))}
          </div>
        </div>

        <div className="flex justify-between border-t border-secondary-200 pt-4 text-sm">
          <div>
            <OccupancyCounter
              studyId={study_id}
              maxParticipants={study_max_people}
            />
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
              14
            </div>
            <div className="flex gap-[0.1rem]">
              <Image
                className="h-full w-full"
                src="/icons/CommentGray.svg"
                alt="comment"
                width={15}
                height={15}
              />
              8
            </div>
          </div>
        </div>
      </section>
    </Link>
  );
}
