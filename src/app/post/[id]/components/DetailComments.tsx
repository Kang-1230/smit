"use client";

import { useAddCommentMutation, useComments } from "../hooks/useComments";
import { usePublicUser } from "@/hooks/useUserProfile";
import CommentListItem from "./CommentListItem";
import useModalOpen from "@/hooks/useModalOpen";
import LoginModal from "@/components/common/LoginModal";
import CommentForm from "./CommentForm";
import Loading from "@/components/common/Loading";

const DetailComments = ({ id }: { id: string }) => {
  const { data: user } = usePublicUser();
  const { data: commentList, isLoading, isError } = useComments(id); // 댓글 불러오기(+답글)
  const { mutate: addComment } = useAddCommentMutation(); // 댓글 추가(+답글)
  const { modalClose, modalOpen, isModalOpen } = useModalOpen(); // 미로그인 사용자 접근 시 모달

  const handleAddComment = (commentItem: string) => {
    addComment({ id, commentItem });
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>댓글을 불러오는데 실패했습니다.</div>;
  }

  return (
    <div className="mt-4 w-full">
      <span className="body-16-s">댓글 {commentList?.length}</span>
      <CommentForm
        user={user}
        onSubmit={handleAddComment}
        onLoginRequired={modalOpen}
      />
      <div className="mb-9">
        {commentList && commentList.length > 0
          ? commentList.map((comment) => (
              <CommentListItem
                key={comment.comment_id}
                comment={comment}
                commentList={commentList}
              />
            ))
          : null}
      </div>
      {isModalOpen && <LoginModal onClose={modalClose} />}
    </div>
  );
};

export default DetailComments;
