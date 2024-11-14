"use client";

import { usePostLikers } from "@/hooks/useLikePost";
import Image from "next/image";
import HeartFilled from "../../../../../public/icons/HeartFilled.svg";

const LikeCount = ({ postId }: { postId: string }) => {
  const { data } = usePostLikers(+postId);
  return (
    <div className="flex items-center justify-end gap-x-0.5 border-b border-secondary-100 py-1 text-[#A5A5A5]">
      <Image src={HeartFilled} alt="like image" width={20} height={20} />
      <span className="caption">{data?.length}</span>
    </div>
  );
};

export default LikeCount;
