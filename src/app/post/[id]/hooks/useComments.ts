import {
  addPostComment,
  deleteMyPost,
  deletePostComment,
  fetchDetailComments,
  getUserByCommentId,
  updatePostComment,
} from "@/utils/supabase/supabase-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Tables } from "../../../../../database.types";

// comment 테이블 구조에, replies(답글) 속성을 추가
interface CommentType extends Tables<"comment"> {
  replies?: CommentType[];
}

// 댓글 가져오기(+답글)
export const useComments = (postId: string) => {
  return useQuery<CommentType[], Error>({
    queryKey: ["comment", postId],
    queryFn: async () => {
      try {
        // 모집글의 모든 댓글 가져오기
        const commentData = await fetchDetailComments(postId);
        // 부모 댓글 (parent_id 없음)
        const parentComments = commentData.filter(
          (comment) => !comment.parent_id,
        ) as CommentType[];
        // 답글 (parent_id 있음)
        const replyComments = commentData.filter(
          (comment) => comment.parent_id,
        ) as CommentType[];

        // 답글 생성순 정렬
        const sortedReplyComments = replyComments.sort(
          (a, b) =>
            new Date(a.comment_createtime).getTime() -
            new Date(b.comment_createtime).getTime(),
        );

        // 각 부모 댓글에 해당하는 답글 연결
        const commentsWithReplies = parentComments.map((parent) => {
          const commentReplies = sortedReplyComments.filter(
            (reply) => reply.parent_id === parent.comment_id,
          );
          return {
            ...parent,
            replies: commentReplies.length > 0 ? commentReplies : undefined,
          };
        });
        return commentsWithReplies;
      } catch (error) {
        console.error("댓글 불러오기 실패:", error);
        throw error;
      }
    },
  });
};

// 댓글 추가 (+답글)
export const useAddCommentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      id: string;
      commentItem: string;
      parentId?: string;
    }) => {
      try {
        await addPostComment(data);
      } catch (error) {
        console.error("댓글 추가 실패:", error);
        throw error;
      }
    },
    onSuccess: (_, { id: postId }) => {
      queryClient.invalidateQueries({ queryKey: ["comment", postId] });
    },
  });
};

// 댓글 삭제
export const useDeleteCommentMutation = (postId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePostComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comment", postId],
      });
    },
  });
};

// 댓글 수정
export const useUpdateCommentMutation = (postId: string) => {
  const queryClient = useQueryClient();
  return useMutation<
    void,
    Error,
    { commentId: string; content: string; updatedAt: string }
  >({
    mutationFn: ({ commentId, content, updatedAt }) =>
      updatePostComment(commentId, content, updatedAt),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comment", postId],
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

// 댓글 유저 정보 가져오기
export const useUserByCommentId = (id: string) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserByCommentId(id),
  });
};
