"use client";

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
import ReplyComment from "./ReplyComment";

// comment 테이블 구조에, replies(답글) 속성이 추가된 comment 타입"
interface CommentType extends Tables<"comment"> {
  replies?: CommentType[];
}

interface CommentListItemProps {
  comment: CommentType;
  isReply?: boolean; // 답글/댓글 여부
  onUpdateMention?: (name: string) => void; // 답글의 @멘션을 부모에게 전달하는 함수
}

const CommentListItem = ({
  comment,
  isReply = false,
  onUpdateMention,
}: CommentListItemProps) => {
  const [edited, setEdited] = useState<{ [key: string]: boolean }>({});
  const [updateCommentItem, setUpdateCommentItem] = useState("");
  const [showReplies, setShowReplies] = useState(false);
  const [replyToName, setReplyToName] = useState<string>(""); // 현재 @멘션할 사용자 이름

  const { data: user } = usePublicUser();
  const { data: commentUser } = useUserByCommentId(comment.user_id);

  const UserProfileImg = browserClient.storage
    .from("profile_img")
    .getPublicUrl(commentUser?.profile_img ?? "default").data.publicUrl;

  // 댓글 삭제 / 수정
  const { mutate: deleteComment } = useDeleteCommentMutation(
    `${comment.post_id}`,
  );
  const { mutate: updateComment } = useUpdateCommentMutation(
    `${comment.post_id}`,
  );

  // 답글 존재 여부 확인
  const hasReplies = comment.replies && comment.replies.length > 0;

  // 댓글 수정 토글
  const toggleEditMode = (commentId: string) => {
    setEdited((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));

    if (!edited[commentId]) {
      setUpdateCommentItem(comment.comment_contents);
    }
  };

  // 답글달기 클릭
  const handleReplyClick = () => {
    if (!isReply) {
      // 부모 댓글인 경우
      setShowReplies(!showReplies);
      setReplyToName(commentUser?.name || "");
    } else {
      // 답글인 경우
      onUpdateMention?.(commentUser?.name || "");
    }
  };

  // 답글 작성 완료
  const handleReplyComplete = () => {
    setReplyToName(commentUser?.name || ""); // @멘션 초기화
  };

  return (
    <div key={comment.comment_id}>
      {edited[comment.comment_id] ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!updateCommentItem.trim()) {
              return alert("댓글 내용을 입력해주세요!");
            }
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
            placeholder="댓글을 입력하세요"
          />
          <button>완료</button>
        </form>
      ) : (
        <div className="flex items-start my-1 border">
          <Image
            src={UserProfileImg}
            alt="유저 이미지"
            width={50}
            height={50}
            className="rounded-full border aspect-square object-cover"
          />
          <div>
            <span>{commentUser?.name}</span>
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
            ) : null}
            <p>{comment.comment_contents}</p>
            <button onClick={handleReplyClick}>
              {!isReply && hasReplies
                ? `답글 ${comment.replies?.length}개 ${showReplies ? "∧" : "∨"}`
                : "답글달기"}
            </button>
          </div>
        </div>
      )}
      {/* 부모댓글 && 답글목록 오픈 */}
      {!isReply && showReplies && (
        <div className="ml-12">
          {hasReplies &&
            comment.replies?.map((reply) => (
              <CommentListItem
                key={reply.comment_id}
                comment={reply}
                isReply={true}
                onUpdateMention={setReplyToName}
              />
            ))}

          {/* 답글 입력 폼 */}
          <ReplyComment
            parentId={comment.comment_id}
            postId={comment.post_id.toString()}
            replyToName={replyToName}
            onSuccess={handleReplyComplete}
          />
        </div>
      )}
    </div>
  );
};
export default CommentListItem;
