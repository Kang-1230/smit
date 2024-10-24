import {
  fetchLikedPostsByUser,
  fetchPostLikesCount,
} from "@/utils/supabase/supabase-client";
import { useQuery } from "@tanstack/react-query";

export const useLikedPostByUser = (userId: string | undefined) => {
  return useQuery({
    queryKey: ["like", userId],
    queryFn: () => fetchLikedPostsByUser(userId),
    enabled: !!userId,
  });
};

export const usePostLikesCount = (postId: number | undefined) => {
  return useQuery({
    queryKey: ["like", postId],
    queryFn: () => fetchPostLikesCount(postId),
    enabled: !!postId,
  });
};
