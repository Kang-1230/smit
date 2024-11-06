"use client";

import Image from "next/image";
import {
  useDeleteCommentMutation,
  useUpdateCommentMutation,
  useUpdateStateToDelete,
  useUserByCommentId,
} from "../hooks/useComments";
import { useState } from "react";
import browserClient from "@/utils/supabase/client";
import { usePublicUser } from "@/hooks/useUserProfile";
import { convertUTCToKST } from "@/utils/convertDate";
import { Tables } from "../../../../../database.types";
import ReplyComment from "./ReplyComment";
import CommentLined from "../../../../../public/icons/CommentLined.svg";
import ChevronDown from "../../../../../public/icons/ChevronDown.svg";
import ChevronUp from "../../../../../public/icons/ChevronUp.svg";
import SendLined from "../../../../../public/icons/SendLined.svg";
import EditButton from "./EditButton";

// comment 테이블 구조에, replies(답글) 속성이 추가된 comment 타입
interface CommentType extends Tables<"comment"> {
  replies?: CommentType[];
}

interface CommentListItemProps {
  comment: CommentType;
  isReply?: boolean; // 답글/댓글 여부
  onUpdateMention?: (name: string) => void; // 답글의 @멘션을 부모에게 전달하는 함수
  commentList: CommentType[];
}

const CommentListItem = ({
  comment,
  isReply = false,
  onUpdateMention,
  commentList,
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

  // 댓글 삭제 / 부모댓글 상태(삭제)변경 / 수정
  const { mutate: deleteComment } = useDeleteCommentMutation(
    `${comment.post_id}`,
  );
  const { mutate: updateParentState } = useUpdateStateToDelete(
    `${comment.post_id}`,
  );
  const { mutate: updateComment } = useUpdateCommentMutation(
    `${comment.post_id}`,
  );
  const findParentComment = (parentId: string) => {
    return commentList.find((c) => c.comment_id === parentId);
  };

  const handleDeleteClick = () => {
    const isConfirmed = window.confirm("댓글을 삭제하시겠습니까?");
    if (!isConfirmed) return;
    // 부모댓글
    if (!isReply) {
      if (!hasReplies) {
        // 답글X -> 바로삭제
        deleteComment(comment.comment_id);
        return;
      } else {
        // 답글O -> is_deleted: true 로 상태변경
        updateParentState(comment.comment_id);
        return;
      }
    }

    // 답글인 경우
    const parentComment = comment.parent_id
      ? findParentComment(comment.parent_id)
      : null;

    if (parentComment?.is_deleted && parentComment.replies?.length === 1) {
      // 부모가 삭제 상태이고 마지막 답글인 경우 -> 부모댓글도 함께 삭제
      deleteComment(comment.comment_id, {
        onSuccess: () => {
          deleteComment(parentComment.comment_id);
        },
      });
      return;
    } else {
      // 그 외의 경우 -> 해당 답글만 삭제
      deleteComment(comment.comment_id);
      return;
    }
  };

  // 답글 존재 여부 확인
  const hasReplies = !!comment.replies?.length;

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
    <div>
      {edited[comment.comment_id] ? (
        <div className="flex items-start my-2">
          <Image
            src={UserProfileImg}
            alt="유저 이미지"
            width={40}
            height={40}
            className="rounded-full aspect-square object-cover shrink-0 h-[40px]"
          />
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
            className="flex ml-2 relative w-full border-b border-secondary-200"
          >
            <div className="flex flex-col flex-1">
              <span className="text-secondary-700 text-xs font-medium leading-none">
                {commentUser?.name}
              </span>
              <div className="flex justify-between items-center w-full">
                <input
                  value={updateCommentItem}
                  onChange={(e) => setUpdateCommentItem(e.target.value)}
                  placeholder="댓글을 입력하세요"
                  className="w-full focus:outline-none body-16-m my-2 text-[#444]"
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
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex items-start my-2 relative">
          <Image
            src={UserProfileImg}
            alt="유저 이미지"
            width={40}
            height={40}
            className="rounded-full aspect-square object-cover flex-shrink-0"
          />
          <div className="flex-1 ml-2">
            <div className="flex items-center mb-1">
              <span className="text-secondary-700 text-xs font-medium leading-none">
                {commentUser?.name}
              </span>
              <span className="text-[#B0B0B0] text-xs ml-1">
                {convertUTCToKST(comment.comment_updatetime).fullDateTime}
              </span>
            </div>
            {/* 삭제된 댓글 표시 */}
            <div className="relative">
              {comment.is_deleted ? (
                <p className="text-gray-400">삭제된 댓글입니다.</p>
              ) : (
                <p className="body-16-m my-2 text-[#444]">
                  {comment.comment_contents}
                </p>
              )}
              {!comment.is_deleted && user?.id === comment.user_id && (
                <EditButton
                  userId={comment.user_id}
                  handleEdit={() => toggleEditMode(comment.comment_id)}
                  handleDelete={handleDeleteClick}
                />
              )}
            </div>
            <button
              onClick={handleReplyClick}
              className="text-secondary-400 body-14-m"
            >
              {!isReply && hasReplies ? (
                <div className="flex items-center">
                  <Image
                    src={CommentLined}
                    alt="reply"
                    width={24}
                    height={24}
                  />
                  {comment.replies?.length}개
                  {showReplies ? (
                    <Image src={ChevronUp} alt="up" width={20} height={20} />
                  ) : (
                    <Image
                      src={ChevronDown}
                      alt="down"
                      width={20}
                      height={20}
                    />
                  )}
                  <span className="ml-1">답글달기</span>
                </div>
              ) : (
                "답글달기"
              )}
            </button>
          </div>
        </div>
      )}
      {/* 부모댓글 && 답글목록 오픈 */}
      {!isReply && showReplies && (
        <div className="mt-2 ml-10">
          {hasReplies &&
            comment.replies?.map((reply) => (
              <CommentListItem
                key={reply.comment_id}
                comment={reply}
                isReply={true}
                onUpdateMention={setReplyToName}
                commentList={commentList}
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
