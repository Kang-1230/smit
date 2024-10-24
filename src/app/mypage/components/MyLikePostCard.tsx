"use client";

import LikeButton from "@/components/common/LikeButton";
import { Tables } from "../../../../database.types";

// 카테고리 배열로 만들어서 가져올건지?
// 모집인원 불러오려면 스터디 테이블에서 max 가져오고
// applylist에서 해당 스터디 id, is_approved true인것만 가져와서 length / max 형태로 출력

const MyLikePostCard = ({ post }: { post: Tables<"post"> }) => {
  return (
    <div className="w-60 h-48 border border-gray-300 rounded-3xl p-5 flex flex-col justify-between">
      <div>
        <p className="font-semibold">{post.post_name}</p>
        <div className="flex flex-row flex-wrap my-3 gap-1">
          <span className="px-3 py-[2px] bg-gray-300 rounded-3xl text-xs font-medium">
            직업
          </span>
          <span className="px-3 py-[2px] bg-gray-300 rounded-3xl text-xs font-medium">
            그래픽 디자인
          </span>
          <span className="px-3 py-[2px] bg-gray-300 rounded-3xl text-xs font-medium">
            UXUI
          </span>
          <span className="px-3 py-[2px] bg-gray-300 rounded-3xl text-xs font-medium">
            Figma
          </span>
        </div>
      </div>
      <div className="flex flex-row justify-between items-center">
        <p className="text-xs">{}</p>
        <LikeButton postId={post.post_id} />
      </div>
    </div>
  );
};

export default MyLikePostCard;
