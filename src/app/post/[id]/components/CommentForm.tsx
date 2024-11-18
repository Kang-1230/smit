"use client";
import { useState } from "react";
import { Tables } from "../../../../../database.types";
import Image from "next/image";

interface CommentFormProps {
  user: Tables<"user"> | undefined;
  onSubmit: (commentItem: string) => void;
  onLoginRequired: () => void;
}

const CommentForm = ({ user, onSubmit, onLoginRequired }: CommentFormProps) => {
  const [commentItem, setCommentItem] = useState("");

  // 댓글 추가
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 로그인 안한 사용자 댓글 입력 불가
    if (!user) {
      onLoginRequired();
      return;
    }
    // 빈값 체크
    if (!commentItem.trim()) {
      alert("댓글 내용을 입력해주세요!");
      return;
    }
    onSubmit(commentItem);
    setCommentItem("");
  };

  return (
    <div>
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
          onSubmit={handleSubmit}
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
            <Image
              src={"/icons/SendLined.svg"}
              alt="입력"
              width={24}
              height={24}
            />
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentForm;
