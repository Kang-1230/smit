"use client";

import Image from "next/image";
import { usePostByUser, useSession } from "../../../hooks/useUserProfile";
import MyPostCard from "./MyPostCard";
import { useState } from "react";

const MyPostList = () => {
  const { data: user = null } = useSession();
  const [showPost, setShowPost] = useState(false);
  const {
    data: posts,
    isLoading: postsLoading,
    isError: postsError,
    isPending: postsPending,
  } = usePostByUser(user?.id);

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
          <div className="flex flex-col gap-y-3">
            {posts.slice(0, showPost ? posts.length : 3).map((post) => (
              <MyPostCard key={post.post_id} post={post} userId={user.id} />
            ))}
          </div>

          {posts.length > 3 && (
            <div className="mt-8 flex flex-row justify-center">
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
