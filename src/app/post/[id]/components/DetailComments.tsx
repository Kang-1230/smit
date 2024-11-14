"use client";

import { useState } from "react";
import { useAddCommentMutation, useComments } from "../hooks/useComments";
import { usePublicUser } from "@/hooks/useUserProfile";
import Image from "next/image";
import CommentListItem from "./CommentListItem";
import SendLined from "../../../../../public/icons/SendLined.svg";
import useModalOpen from "@/hooks/useModalOpen";
import LoginModal from "@/components/common/LoginModal";

const DetailComments = ({ id }: { id: string }) => {
  const [commentItem, setCommentItem] = useState("");
  const { data: user } = usePublicUser();

  // 댓글 불러오기(+답글)
  const { data: commentList, isLoading, isError } = useComments(id);

  // 댓글 추가(+답글)
  const { mutate: addComment } = useAddCommentMutation();

  // 로그인 안 한 사용자 댓글 작성시 띄울 모달
  const { modalClose, modalOpen, isModalOpen } = useModalOpen();

  const handleAddComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 로그인 안한 사용자 댓글 입력 불가
    if (!user) {
      modalOpen();
      return;
    }
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
  };

  if (isLoading) {
    return <div>댓글을 불러오는 중...</div>;
  }

  if (isError) {
    return <div>댓글을 불러오는데 실패했습니다.</div>;
  }

  return (
    <div className="mt-4 w-full">
      <span className="body-16-s">댓글 {commentList?.length}</span>
      <div className="mb-[28px] mt-3 flex">
        {user?.profile_img ? (
          <Image
            src={user?.profile_img}
            alt="프로필 이미지"
            width={40}
            height={40}
            className="mr-2 aspect-square shrink-0 rounded-full border border-black/20 object-cover"
          />
        ) : (
          <Image
            src={"/images/DefaultProfile.jpeg"}
            alt="프로필 이미지"
            width={40}
            height={40}
            className="mr-2 aspect-square shrink-0 rounded-full border border-black/20 object-cover"
          />
        )}

        <form
          onSubmit={handleAddComment}
          className="relative flex flex-1 items-center border-b border-secondary-200 pr-6 focus-within:border-secondary-600"
        >
          <input
            type="text"
            value={commentItem}
            onChange={(e) => setCommentItem(e.target.value)}
            placeholder="댓글 작성"
            className="body-16-m w-full text-[#444] focus:outline-none"
          />
          <button className="absolute right-0 flex h-6 w-6">
            <Image src={SendLined} alt="입력" width={24} height={24} />
          </button>
        </form>
      </div>
      <div className="mb-9">
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
      {isModalOpen && <LoginModal onClose={modalClose} />}
    </div>
  );
};

export default DetailComments;
