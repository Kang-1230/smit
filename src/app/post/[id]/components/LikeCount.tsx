"use client";

import { usePostLikers } from "@/hooks/useLikePost";

const LikeCount = ({ postId }: { postId: string }) => {
  const { data } = usePostLikers(+postId);
  console.log(data);
  return <span>♥ {data?.length}</span>;
};

export default LikeCount;
