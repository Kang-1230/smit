"use client";

import Category from "@/components/common/Category";
import LikeButton from "@/components/common/LikeButton";
import { Tables } from "../../../database.types";
import { useStudyByPost, useStudyMember } from "@/hooks/useStudy";

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

  if (studyLoading || !study || memberLoading || !studyMember) {
    return <div>loading...</div>;
  }

  if (studyError || memberError) {
    return <div>error...</div>;
  }

  return (
    <div className="w-[260px] h-[216px] bg-secondary-900 text-white rounded-3xl px-5 pt-5 pb-6 flex flex-col justify-between">
      <div>
        <p className="body-16-s mb-3 line-clamp-2">{post.post_name}</p>
        <div className="flex flex-row flex-wrap gap-1">
          {study.study_category.map((category) => (
            <Category
              category={category}
              key={`${study.study_id}-${category}`}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col gap-y-2 caption">
          <p>
            모집 {studyMember ? studyMember.length : 0}/
            {study.study_max_people + 1}
          </p>
          <p className="text-secondary-400">
            관심 {post.like_count}
            <span className="mx-[5px]">·</span>댓글 {post.comment_count}
          </p>
        </div>
        <LikeButton postId={post.post_id} />
      </div>
    </div>
  );
};

export default SquarePostCard;
