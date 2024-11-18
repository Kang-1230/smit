"use client";

import Badge from "@/components/common/Badge";
import LikeButton from "@/components/common/LikeButton";
import { Tables } from "../../../database.types";
import { useStudyByPost, useStudyMember } from "@/hooks/useStudy";
import Link from "next/link";
import { usePostLikers } from "@/hooks/useLikePost";

const SquarePostCard = ({ post }: { post: Tables<"post"> }) => {
  // 카테고리 등 스터디 정보 필요
  const {
    data: study = null,
    isLoading: studyLoading,
    isError: studyError,
  } = useStudyByPost(post.study_id);

  const {
    data: studyMember = null,
    isLoading: memberLoading,
    isError: memberError,
  } = useStudyMember(post.study_id);

  const { data: likers = null } = usePostLikers(post.post_id);

  if (studyLoading || !study || memberLoading || !studyMember) {
    return <div></div>;
  }

  if (studyError || memberError) {
    return <div>error...</div>;
  }

  return (
    <Link href={`/post/${post.post_id}`}>
      <div className="flex h-[216px] w-[260px] flex-col justify-between rounded-3xl bg-secondary-900 px-5 pb-6 pt-5 text-white xl:h-[292px] xl:w-[321px]">
        <div>
          <p className="body-16-s xl:title-18-s mb-3 line-clamp-2">
            {post.post_name}
          </p>
          <div className="flex flex-row flex-wrap gap-1">
            {study.study_category.map((category, idx) => (
              <Badge
                category={category}
                key={`${study.study_id}-${category}`}
                idx={idx}
                color="secondary"
              />
            ))}
          </div>
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="caption xl:body-14-r flex flex-col gap-y-2">
            <p>
              모집 {studyMember ? studyMember.length : 0}/
              {study.study_max_people}
            </p>
            <p className="text-secondary-400">
              관심 {likers ? likers.length : 0}
              <span className="mx-[5px]">·</span>댓글 {post.comment_count}
            </p>
          </div>
          <LikeButton postId={post.post_id} />
        </div>
      </div>
    </Link>
  );
};

export default SquarePostCard;
