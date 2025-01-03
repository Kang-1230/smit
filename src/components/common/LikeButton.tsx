"use client";

import { usePostLikers, useToggleLikeButton } from "@/hooks/useLikePost";
import useModalOpen from "@/hooks/useModalOpen";
import { useSession } from "@/hooks/useUserProfile";
import { cn } from "@/lib/utils";
import Image from "next/image";
import LoginModal from "./LoginModal";
import Heart from "../ui/icons/Heart";

type Props = {
  postId: number;
  showLikesCount?: boolean;
  isBoundary?: boolean;
  className?: string;
  color?: string;
};

const LikeButton = ({
  postId,
  showLikesCount = false,
  isBoundary = true,
  className = "",
  color = "#FF9945",
}: Props) => {
  const { modalClose, modalOpen, isModalOpen } = useModalOpen();
  // 지금 로그인한 유저 정보
  const { data: user = null } = useSession();
  // 현재 포스트에 좋아요를 누른 유저
  const { data: likes } = usePostLikers(postId);
  // 좋아요 누른 유저 목록에 유저가 있으면 true 없으면 false
  const isLike = likes?.some((post) => post.like_user === user?.id) || false;
  // 좋아요 낙관적 업데이트 하는 뮤테이션 불러오기
  const likeButtonHandler = useToggleLikeButton(user, postId, isLike);

  // 실제로 클릭하면 실행되는 부분
  const handleClick = (e: React.MouseEvent) => {
    // 카드 눌렀을 때 모집글 페이지로 가면 이동 안되게 할라구
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      modalOpen();
      return;
    }
    // 뮤테이션 실행
    likeButtonHandler();
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={cn(
          `rounded-full ${isBoundary ? "bg-secondary-700" : ""} p-[8px]`,
          className,
        )}
        title="Like Button"
      >
        {isLike ? (
          <Image
            src={`/icons/HeartFill.svg`}
            alt="fill-heart"
            width={24}
            height={24}
          />
        ) : (
          <Heart color={color} />
        )}
      </button>
      {showLikesCount && <span>{likes?.length}</span>}
      {isModalOpen && <LoginModal onClose={modalClose}></LoginModal>}
    </>
  );
};

export default LikeButton;
