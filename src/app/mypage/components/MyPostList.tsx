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
  } = usePostByUser(user?.id);

  if (postsLoading || !posts || !user) {
    return <div>로딩중</div>;
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
            <div className="flex flex-row justify-center mt-8">
              <button className="caption text-secondary-700">더보기</button>
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
        <div>작성한 모집글이 없습니다.</div>
      )}
    </>
  );
};

export default MyPostList;
