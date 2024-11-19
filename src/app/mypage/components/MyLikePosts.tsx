"use client";

import Image from "next/image";
import SquarePostCard from "../../../components/common/SquarePostCard";
import { useLikedPostByUser } from "../../../hooks/useLikePost";
import { useSession } from "@/hooks/useUserProfile";
import Heart from "@/components/ui/icons/Heart";
import useCarousel from "@/hooks/useCarousel";

const MyLikePosts = () => {
  const { data: user = null } = useSession();
  const { data: likePosts } = useLikedPostByUser(user?.id);
  const { handleNext, handlePrev, trackRef } = useCarousel(
    317,
    likePosts?.length,
  );

  return (
    <div>
      <div className="mb-[20px] flex items-end justify-between">
        <p className="title-20-s flex gap-x-[4px] px-[24px] md:px-0">
          <Heart color="black" />찜 목록
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
      <div className="scrollbar-hide w-full overflow-x-scroll">
        <div
          className="flex w-full flex-row gap-x-[12px] px-[24px] md:gap-x-[36px] md:px-0 md:duration-150 md:ease-in-out"
          ref={trackRef}
        >
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
