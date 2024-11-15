"use client";

import Image from "next/image";
import SquarePostCard from "../../../components/common/SquarePostCard";
import { useLikedPostByUser } from "../../../hooks/useLikePost";
import { useSession } from "@/hooks/useUserProfile";

const MyLikePosts = () => {
  const { data: user = null } = useSession();
  const { data: likePosts } = useLikedPostByUser(user?.id);

  return (
    <div>
      <div className="scrollbar-hide sm:scrollbar-show w-full overflow-x-scroll">
        <div className="flex w-full flex-row gap-x-3 px-6">
          {likePosts?.length ? (
            likePosts.map((post) => (
              <SquarePostCard key={post.post_id} post={post} />
            ))
          ) : (
            <div className="relative mx-auto mb-[12px] mt-[10px] h-[172px] w-[167px]">
              <Image
                src={`/images/NothingLikes.png`}
                alt="nothing likes"
                fill
                quality={100}
                loading="eager"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyLikePosts;
