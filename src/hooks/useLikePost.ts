import {
  fetchLikedPostsByUser,
  fetchPostLikers,
  toggleLike,
} from "@/utils/supabase/supabase-client";
import { User } from "@supabase/supabase-js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Tables } from "../../database.types";

// 사용자가 좋아요 누른 포스트
export const useLikedPostByUser = (userId: string | undefined) => {
  return useQuery({
    queryKey: ["like", userId],
    queryFn: () => fetchLikedPostsByUser(userId),
    enabled: !!userId,
  });
};

// 해당 포스트를 좋아요 누른 사람 목록
export const usePostLikers = (postId: number | undefined) => {
  return useQuery({
    queryKey: ["like", postId],
    queryFn: () => fetchPostLikers(postId),
    enabled: !!postId,
  });
};

// 좋아요 낙관적 업데이트
export const useToggleLikeButton = (
  user: User | null,
  postId: number,
  isLike: boolean,
) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => toggleLike(user, isLike, postId),

    onMutate: async () => {
      // 일단 행동 정지
      await queryClient.cancelQueries({ queryKey: ["like", user?.id] });

      // 이전 상태 저장
      const previousUserLikes = queryClient.getQueryData<Tables<"post">[]>([
        "like",
        user?.id,
      ]);

      // 유저의 좋아요 목록 업데이트
      if (user?.id) {
        queryClient.setQueryData<Tables<"post">[]>(
          ["like", user.id],
          (old = []) => {
            if (isLike) {
              return old.filter((post) => post.post_id !== postId);
            } else {
              return [...old];
            }
          },
        );
      }

      return { previousUserLikes };
    },

    onError: (err, variables, context) => {
      // 에러 시 유저의 좋아요 목록만 롤백
      if (user?.id) {
        queryClient.setQueryData(["like", user.id], context?.previousUserLikes);
      }
    },

    onSettled: () => {
      // 모든 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ["like", user?.id] });
      // 좋아요 개수 업데이트 해주기
      queryClient.invalidateQueries({ queryKey: ["like", postId] });
    },
  });

  return mutate;
};
