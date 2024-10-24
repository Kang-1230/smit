"use client";

import { User } from "@supabase/supabase-js";
import MyLikePostCard from "./MyLikePostCard";
import { useLikedPostByUser } from "../../../hooks/useLikePost";

const MyLikePosts = ({ user }: { user: User | null }) => {
  const { data: likePosts } = useLikedPostByUser(user?.id);

  return (
    <div>
      <p className="text-xl font-semibold px-9 mb-5">찜 목록</p>
      <div className="w-full overflow-x-scroll scrollbar-hide">
        <div className="flex flex-row pl-8 w-fit gap-x-3 mr-8">
          {likePosts ? (
            likePosts.map((post) => (
              <MyLikePostCard key={post.post_id} post={post} />
            ))
          ) : (
            <div>찜한 글이 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyLikePosts;
