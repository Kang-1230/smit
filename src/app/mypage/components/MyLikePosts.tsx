"use client";

import SquarePostCard from "../../../components/common/SquarePostCard";
import { useLikedPostByUser } from "../../../hooks/useLikePost";
import { useSession } from "@/hooks/useUserProfile";

const MyLikePosts = () => {
  const { data: user = null } = useSession();
  const { data: likePosts } = useLikedPostByUser(user?.id);

  return (
    <div>
      <div className="w-full overflow-x-scroll scrollbar-hide">
        <div className="flex flex-row pl-8 w-fit gap-x-3 mr-8">
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
