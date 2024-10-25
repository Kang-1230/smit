"use client";

import { useState } from "react";
import { useAddCommentMutation, useComments } from "../hooks/useComments";
import { usePublicUser } from "@/hooks/useUserProfile";
import Image from "next/image";
import browserClient from "@/utils/supabase/client";
import CommentListItem from "./CommentListItem";

const DetailComments = ({ id }: { id: string }) => {
  const [commentItem, setCommentItem] = useState("");
  const { data: user } = usePublicUser();

  // 댓글 입력 프로필 이미지
  const profileImg = browserClient.storage
    .from("profile_img")
    .getPublicUrl(user?.profile_img ?? "default").data.publicUrl;

  // 댓글 불러오기
  const { data: commentList, isLoading, isError } = useComments(id);

  // 댓글 추가
  const { mutate: addComment } = useAddCommentMutation();

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  if (isError) {
    return <div>댓글 가져오기 오류</div>;
  }

  // 댓글 최신순 정렬
  const sortedComments = commentList
    ? [...commentList].sort(
        (a, b) =>
          new Date(b.comment_createtime).getTime() -
          new Date(a.comment_createtime).getTime(),
      )
    : [];

  return (
    <div className="mt-10">
      <span>댓글 {commentList?.length}</span>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // 빈값 체크
          if (commentItem.trim() === "") {
            alert("댓글 내용을 입력해주세요!");
            return;
          }
          addComment({ id, commentItem });
          setCommentItem("");
        }}
        className="flex"
      >
        <Image
          src={profileImg}
          alt="유저 이미지"
          width={50}
          height={50}
          className="rounded-full border aspect-square object-cover"
        />
        <input
          type="text"
          value={commentItem}
          onChange={(e) => setCommentItem(e.target.value)}
          placeholder="댓글 작성"
          className="border-b-2 border-gray-500 focus:outline-none"
        />
        <button>입력</button>
      </form>
      <div>
        {sortedComments?.map((comment) => (
          <CommentListItem key={comment.comment_id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default DetailComments;
