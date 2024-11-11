"use client";

import SquarePostCard from "../../../components/common/SquarePostCard";
import { useLikedPostByUser } from "../../../hooks/useLikePost";
import { useSession } from "@/hooks/useUserProfile";

const MyLikePosts = () => {
  const { data: user = null } = useSession();
  const { data: likePosts } = useLikedPostByUser(user?.id);

  return (
    <div>
      <div className="scrollbar-hide sm:scrollbar-show w-full overflow-x-scroll">
        <div className="flex w-fit flex-row gap-x-3 px-6">
          {likePosts?.length ? (
            likePosts.map((post) => (
              <SquarePostCard key={post.post_id} post={post} />
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
