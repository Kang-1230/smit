"use client";

import Image from "next/image";
import {
  useDeleteCommentMutation,
  useUpdateCommentMutation,
  useUpdateStateToDelete,
  useUserByCommentId,
} from "../hooks/useComments";
import { useState } from "react";
import { usePublicUser } from "@/hooks/useUserProfile";
import { convertUTCToKST } from "@/utils/convertDate";
import { Tables } from "../../../../../database.types";
import ReplyComment from "./ReplyComment";
import CommentLined from "../../../../../public/icons/CommentLined.svg";
import ChevronDownGray from "../../../../../public/icons/ChevronDownGray.svg";
import ChevronUp from "../../../../../public/icons/ChevronUp.svg";
import EditButton from "./EditButton";
import MyButton from "@/components/common/Button";

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
  const [writeReply, setWriteReply] = useState<{ [key: string]: boolean }>({});
  const [replyToName, setReplyToName] = useState<string>(""); // 현재 @멘션할 사용자 이름

  const { data: user } = usePublicUser();
  const { data: commentUser } = useUserByCommentId(comment.user_id);

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

  // 답글 목록 보기 핸들러
  const handleShowReplies = () => {
    setShowReplies(!showReplies);
  };

  // 답글달기 핸들러
  const handleWriteReply = () => {
    if (!user) {
      return alert("로그인 후 이용가능한 서비스입니다.");
    }
    // 현재 댓글의 상태 업데이트
    setWriteReply((prev) => ({
      ...prev,
      [comment.comment_id]: true,
      // 답글인 경우 부모 댓글의 상태도 업데이트
      ...(isReply && comment.parent_id ? { [comment.parent_id]: true } : {}),
    }));

    setReplyToName(commentUser?.name || "");
    onUpdateMention?.(commentUser?.name || "0");
  };

  // 답글 작성 완료
  const handleReplyComplete = () => {
    setReplyToName(commentUser?.name || ""); // @멘션 초기화
    setWriteReply((prev) => ({
      ...prev,
      [comment.comment_id]: false,
      ...(isReply && comment.parent_id ? { [comment.parent_id]: false } : {}),
    }));

    // 현재 답글이 없는 상태(첫 답글)라면 답글 목록을 보여줌
    if (!hasReplies) {
      setShowReplies(true);
    }
  };

  // 댓글 수정
  const handleUpdateComment = (e: React.FormEvent<HTMLFormElement>) => {
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
  };

  return (
    <div>
      {edited[comment.comment_id] ? (
        <div className="my-4 mb-[49px] flex items-start">
          {commentUser?.profile_img && (
            <Image
              src={commentUser.profile_img}
              alt="image"
              width={40}
              height={40}
              className="aspect-square h-[40px] shrink-0 rounded-full border border-black/20 object-cover"
              priority={true}
            />
          )}
          <form
            onSubmit={handleUpdateComment}
            className="relative ml-2 flex w-full border-b border-secondary-200 focus-within:border-secondary-600"
          >
            <div className="flex flex-1 flex-col">
              <div className="flex w-full items-center justify-between">
                <input
                  value={updateCommentItem}
                  onChange={(e) => setUpdateCommentItem(e.target.value)}
                  placeholder="댓글을 입력하세요"
                  className="body-16-m my-2 w-full text-[#444] focus:outline-none"
                />
                <div className="absolute right-0 top-[46px] z-50 mb-3 flex gap-1">
                  <MyButton
                    onClick={() => setEdited({ [comment.comment_id]: false })}
                    size="sm"
                    style="gray"
                  >
                    취소
                  </MyButton>
                  <MyButton size="sm" style="darkgray" type="submit">
                    완료
                  </MyButton>
                </div>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div className="relative my-4 flex items-start">
          {commentUser?.profile_img && (
            <Image
              src={commentUser.profile_img}
              alt="image"
              width={40}
              height={40}
              className="aspect-square flex-shrink-0 rounded-full border border-black/20 object-cover"
            />
          )}
          <div className="ml-2 flex-1">
            <div className="mb-1 flex items-center">
              <span className="text-xs font-medium leading-none text-secondary-700">
                {commentUser?.name}
              </span>
              <span className="ml-1 text-xs text-[#B0B0B0]">
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
            {!isReply && hasReplies ? (
              <div className="body-14-m flex items-center text-secondary-400">
                <button
                  onClick={handleShowReplies}
                  className="flex items-center"
                >
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
                      src={ChevronDownGray}
                      alt="down"
                      width={20}
                      height={20}
                    />
                  )}
                </button>
                <span
                  onClick={handleWriteReply}
                  className="ml-1 cursor-pointer"
                >
                  답글달기
                </span>
              </div>
            ) : (
              <span
                onClick={handleWriteReply}
                className="body-14-m cursor-pointer text-secondary-400"
              >
                답글달기
              </span>
            )}
          </div>
        </div>
      )}
      {/* 부모댓글 && 답글목록 오픈 */}
      {!isReply && showReplies && (
        <div className="pl-10">
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
        </div>
      )}

      {/* 답글 입력 폼 */}
      {writeReply[comment.comment_id] && (
        <ReplyComment
          parentId={isReply ? comment.parent_id! : comment.comment_id}
          postId={comment.post_id.toString()}
          replyToName={replyToName}
          onSuccess={handleReplyComplete}
          setWriteReply={(value: boolean) =>
            setWriteReply((prev) => ({
              ...prev,
              [comment.comment_id]: value,
              ...(isReply && comment.parent_id
                ? { [comment.parent_id]: value }
                : {}),
            }))
          }
        />
      )}
    </div>
  );
};
export default CommentListItem;
