"use client";

import Image from "next/image";
import { usePostByUser, useSession } from "../../../hooks/useUserProfile";
import MyPostCard from "./MyPostCard";
import { useState } from "react";
import useCarousel from "@/hooks/useCarousel";

const MyPostList = () => {
  const { data: user = null } = useSession();
  const [showPost, setShowPost] = useState(false);
  const {
    data: posts,
    isLoading: postsLoading,
    isError: postsError,
    isPending: postsPending,
  } = usePostByUser(user?.id);
  const { handleNext, handlePrev, trackRef } = useCarousel(422, posts?.length);

  if (postsLoading || !posts || !user || postsPending) {
    return <div className="flex flex-col gap-y-3"></div>;
  }

  if (postsError) {
    return <div>불러오는 중 오류 발생</div>;
  }
  return (
    <>
      {posts.length > 0 ? (
        <>
          <div className="mb-[20px] flex items-end justify-between">
            <p className="title-20-s flex gap-x-[4px]">
              <Image
                src={`/icons/Edit.svg`}
                alt="Edit"
                width={24}
                height={24}
              />
              내가 작성한 글
            </p>
            <div className="hidden gap-x-[20px] md:flex">
              <Image
                src={`/icons/pc/ChevronLeft.svg`}
                alt="prev"
                width={40}
                height={40}
                className="ml-auto mr-0"
                onClick={handlePrev}
              />
              <Image
                src={`/icons/pc/ChevronRight.svg`}
                alt="prev"
                width={40}
                height={40}
                className="ml-auto mr-0"
                onClick={handleNext}
              />
            </div>
          </div>
          <div className="w-full overflow-hidden">
            <div
              className="flex flex-col gap-y-3 md:h-[232px] md:flex-row md:gap-x-[34px] md:duration-150 md:ease-in-out"
              ref={trackRef}
            >
              {posts.slice(0, showPost ? posts.length : 3).map((post) => (
                <MyPostCard key={post.post_id} post={post} userId={user.id} />
              ))}
            </div>
          </div>
          {posts.length > 3 && (
            <div className="mt-8 flex flex-row justify-center md:hidden">
              <button
                className="caption text-secondary-700"
                onClick={() => setShowPost(true)}
              >
                더보기
              </button>
              <Image
                src={`/icons/ChevronDown.svg`}
                alt="dropdown"
                width={20}
                height={20}
              />
            </div>
          )}
        </>
      ) : (
        <div className="relative mx-auto mb-[18px] min-h-[178px] min-w-[167px]">
          <Image
            src={`/images/NothingPosts.png`}
            alt="nothing posts"
            fill
            quality={100}
            loading="eager"
          />
        </div>
      )}
    </>
  );
};

export default MyPostList;
