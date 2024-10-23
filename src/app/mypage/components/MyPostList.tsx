"use client";

import { User } from "@supabase/supabase-js";
import { usePostByUser } from "../hooks/useUserProfile";
import MyPostCard from "./MyPostCard";

const MyPostList = ({ user }: { user: User }) => {
  const { data: posts, isLoading, isError } = usePostByUser(user.id);

  if (!posts || isLoading) {
    return <div className="pl-8">로딩중</div>;
  }
  return (
    <div>
      <div className="flex flex-col">
        <p className="text-xl font-semibold mb-8 px-8">내가 작성한 글</p>
        {posts.length > 0 ? (
          <div>
            {posts.map((post) => (
              <MyPostCard key={post.post_id} post={post} userId={user.id} />
            ))}
            <button className="text-gray-500 text-sm">더보기</button>
          </div>
        ) : (
          <div className="pl-8">작성한 모집글이 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default MyPostList;
