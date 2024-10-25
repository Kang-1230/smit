"use clinet";

import Image from "next/image";
import {
  useDeleteCommentMutation,
  useUpdateCommentMutation,
  useUserByCommentId,
} from "../hooks/useComments";
import { useState } from "react";
import browserClient from "@/utils/supabase/client";
import { usePublicUser } from "@/hooks/useUserProfile";
import { convertUTCToKST } from "@/utils/convertDate";
import { Tables } from "../../../../../database.types";

const CommentListItem = ({ comment }: { comment: Tables<"comment"> }) => {
  const [edited, setEdited] = useState<{ [key: string]: boolean }>({});
  const [updateCommentItem, setUpdateCommentItem] = useState("");
  const { data: user } = usePublicUser();

  // 댓글 작성한 유저의 정보 불러오기
  const { data: commentUser } = useUserByCommentId(comment.user_id);

  // 댓글 작성한 유저의 프로필 이미지
  const UserProfileImg = browserClient.storage
    .from("profile_img")
    .getPublicUrl(commentUser?.profile_img ?? "default").data.publicUrl;

  // 댓글 삭제
  const { mutate: deleteComment } = useDeleteCommentMutation();

  // 댓글 수정
  const { mutate: updateComment } = useUpdateCommentMutation();

  // 댓글 수정 토글
  const toggleEditMode = (commentId: string) => {
    setEdited((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  return (
    <div key={comment.comment_id}>
      {edited[comment.comment_id] ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateComment({
              commentId: comment.comment_id,
              content: updateCommentItem,
              updatedAt: new Date().toISOString(),
            });
            toggleEditMode(comment.comment_id);
          }}
        >
          <input
            value={updateCommentItem}
            onChange={(e) => setUpdateCommentItem(e.target.value)}
            placeholder={comment.comment_contents}
          />
          <button>완료</button>
        </form>
      ) : (
        <div className="flex">
          <Image
            src={UserProfileImg}
            alt="유저 이미지"
            width={50}
            height={50}
            className="rounded-full border aspect-square object-cover"
          />
          <div>
            <span>{user?.name}</span>
            <span>{convertUTCToKST(comment.comment_createtime)}</span>
            {user?.id === comment.user_id ? (
              <>
                <button onClick={() => toggleEditMode(comment.comment_id)}>
                  수정
                </button>
                <button onClick={() => deleteComment(comment.comment_id)}>
                  삭제
                </button>
              </>
            ) : (
              <></>
            )}
            <p>{comment.comment_contents}</p>
          </div>
        </div>
      )}
    </div>
  );
};
export default CommentListItem;
