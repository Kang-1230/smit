"use client";

import { usePostLikers } from "@/hooks/useLikePost";
import Image from "next/image";
import HeartFilled from "../../../../../public/icons/HeartFilled.svg";

const LikeCount = ({ postId }: { postId: string }) => {
  const { data } = usePostLikers(+postId);
  console.log(data);
  return (
    <div className="flex justify-end items-center border-b border-secondary-100 py-1 gap-x-0.5 text-[#A5A5A5]">
      <Image src={HeartFilled} alt="like image" width={20} height={20} />
      <span className="caption">{data?.length}</span>
    </div>
  );
};

export default LikeCount;
