import {
  addPostComment,
  deleteMyPost,
  deletePostComment,
  fetchDetailComments,
  updatePostComment,
} from "@/utils/supabase/supabase-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// 댓글 가져오기
export const useComments = (id: string) => {
  return useQuery({
    queryKey: ["comment", "public"],
    queryFn: () => fetchDetailComments(id),
  });
};

// 댓글 추가
export const useAddCommentMutation = (id: string, commentItem: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => addPostComment(id, commentItem),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comment", "public"],
      });
    },
  });
};

// 댓글 삭제
export const useDeleteCommentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePostComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comment", "public"],
      });
    },
  });
};

// 댓글 수정
export const useUpdateCommentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, { commentId: string; content: string }>({
    mutationFn: ({ commentId, content }) =>
      updatePostComment(commentId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comment", "public"],
      });
    },
  });
};

// 모집글 삭제
export const useDeleteMyPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteMyPost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["post", "public"],
      });
    },
  });
};
