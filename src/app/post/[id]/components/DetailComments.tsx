"use client";

import { useState } from "react";
import {
  useAddCommentMutation,
  useComments,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from "../hooks/useComments";
import { usePublicUser } from "@/hooks/useUserProfile";
import Image from "next/image";
import browserClient from "@/utils/supabase/client";

const DetailComments = ({ id }: { id: string }) => {
  const [commentItem, setCommentItem] = useState("");
  const [updateCommentItem, setUpdateCommentItem] = useState("");
  const [edited, setEdited] = useState(false);
  const { data: user } = usePublicUser();

  // 댓글 프로필 이미지
  const profileImg = browserClient.storage
    .from("profile_img")
    .getPublicUrl(user?.profile_img ?? "default").data.publicUrl;

  // 댓글 불러오기
  const { data: commentList, isLoading, isError } = useComments(id);

  // 댓글 추가
  const { mutate: addComment } = useAddCommentMutation(id, commentItem);

  // 댓글 삭제
  const { mutate: deleteComment } = useDeleteCommentMutation();

  // 댓글 수정
  const { mutate: updateComment } = useUpdateCommentMutation();

  const handleNicknameEdit = () => {
    setEdited(!edited);
  };

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  if (isError) {
    return <div>댓글 가져오기 오류</div>;
  }

  return (
    <div className="mt-10">
      <span>댓글 {commentList?.length}</span>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addComment();
        }}
        className="flex"
      >
        <Image
          src={`${profileImg}?t=${Date.now()}`}
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
        {commentList?.map((comment) => (
          <div key={comment.comment_id}>
            {edited ? (
              <>
                (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    updateComment({
                      commentId: comment.comment_id,
                      content: updateCommentItem,
                    });
                    handleNicknameEdit();
                  }}
                >
                  <input
                    value={updateCommentItem}
                    onChange={(e) => setUpdateCommentItem(e.target.value)}
                    placeholder={comment.comment_contents}
                  />
                  <button>완료</button>
                </form>
                )
              </>
            ) : (
              <div>
                <span>{user?.name}</span>
                <span>{comment.comment_createtime.slice(0, 10)}</span>
                <button onClick={handleNicknameEdit}>수정</button>
                <button onClick={() => deleteComment(comment.comment_id)}>
                  삭제
                </button>
                <p>{comment.comment_contents}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailComments;
