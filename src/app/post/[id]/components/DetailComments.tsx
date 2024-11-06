"use client";

import { useState } from "react";
import { useAddCommentMutation, useComments } from "../hooks/useComments";
import { usePublicUser } from "@/hooks/useUserProfile";
import Image from "next/image";
import browserClient from "@/utils/supabase/client";
import CommentListItem from "./CommentListItem";
import SendLined from "../../../../../public/icons/SendLined.svg";

const DetailComments = ({ id }: { id: string }) => {
  const [commentItem, setCommentItem] = useState("");
  const { data: user } = usePublicUser();

  // 댓글 입력 프로필 이미지
  const profileImg = browserClient.storage
    .from("profile_img")
    .getPublicUrl(user?.profile_img ?? "default").data.publicUrl;

  // 댓글 불러오기(+답글)
  const { data: commentList, isLoading, isError } = useComments(id);

  // 댓글 추가(+답글)
  const { mutate: addComment } = useAddCommentMutation();

  if (isLoading) {
    return <div>댓글을 불러오는 중...</div>;
  }

  if (isError) {
    return <div>댓글을 불러오는데 실패했습니다.</div>;
  }

  return (
    <div className="mt-4 w-full">
      <span className="body-16-s">댓글 {commentList?.length}</span>
      <div className="flex mt-3 mb-7">
        <Image
          src={profileImg}
          alt="프로필 이미지"
          width={40}
          height={40}
          className="rounded-full aspect-square object-cover shrink-0 mr-2"
        />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // 빈값 체크
            if (!commentItem.trim()) {
              alert("댓글 내용을 입력해주세요!");
              return;
            }
            addComment(
              { id, commentItem },
              {
                onSuccess: () => {
                  setCommentItem("");
                },
              },
            );
          }}
          className="flex flex-1 border-b border-secondary-200"
        >
          <input
            type="text"
            value={commentItem}
            onChange={(e) => setCommentItem(e.target.value)}
            placeholder="댓글 작성"
            className="w-full focus:outline-none body-16-m text-[#444]"
          />
          <button>
            <Image
              src={SendLined}
              alt="입력"
              width={24}
              height={24}
              className="flex-shrink-0"
            />
          </button>
        </form>
      </div>
      <div>
        {commentList && commentList.length > 0 ? (
          commentList.map((comment) => (
            <CommentListItem
              key={comment.comment_id}
              comment={comment}
              commentList={commentList}
            />
          ))
        ) : (
          <div>작성된 댓글이 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default DetailComments;
