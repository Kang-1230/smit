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
    <div className="w-60 h-48 border border-gray-300 rounded-3xl p-5 flex flex-col justify-between">
      <div>
        <p className="font-semibold">{post.post_name}</p>
        <div className="flex flex-row flex-wrap my-3 gap-1">
          {study.study_category.map((category) => (
            <Category
              category={category}
              key={`${study.study_id}-${category}`}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-row justify-between items-center">
        <p className="text-xs">
          모집 인원 {studyMember ? studyMember.length : 0}/
          {study.study_max_people}
        </p>
        <LikeButton postId={post.post_id} />
      </div>
    </div>
  );
};

export default SquarePostCard;
