"use client";

import { usePostByUser, useSession } from "../../../hooks/useUserProfile";
import MyPostCard from "./MyPostCard";

const MyPostList = () => {
  const { data: user = null } = useSession();
  const {
    data: posts,
    isLoading: postsLoading,
    isError: postsError,
  } = usePostByUser(user?.id);

  if (postsLoading) {
    return <div className="pl-8">로딩중</div>;
  }

  if (postsError || !posts || !user) {
    return <div className="pl-8">불러오는 중 오류 발생</div>;
  }
  return (
    <>
      {posts.length > 0 ? (
        <div className="text-center">
          {posts.map((post) => (
            <MyPostCard key={post.post_id} post={post} userId={user.id} />
          ))}
          <button className="text-gray-500 text-sm">더보기</button>
        </div>
      ) : (
        <div className="pl-8">작성한 모집글이 없습니다.</div>
      )}
    </>
  );
};

export default MyPostList;
