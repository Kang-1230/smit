"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Tables } from "../../../../database.types";
import { deletePost } from "@/utils/supabase/client-actions";

const MyPostCard = ({
  post,
  userId,
}: {
  post: Tables<"post">;
  userId: string;
}) => {
  const queryClient = useQueryClient();

  const { mutate: deletePostMutation } = useMutation({
    mutationFn: () => deletePost(post.post_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["post", userId],
      });
    },
  });

  return (
    <div>
      <div className="flex flex-row justify-between items-center px-8">
        <p className="font-medium">{post.post_name}</p>
        <div className="text-white text-sm">
          <button className="p-2 bg-gray-500 rounded-xl">수정</button>
          <button
            className="p-2 bg-gray-500 rounded-xl ml-1"
            onClick={() => deletePostMutation()}
          >
            삭제
          </button>
        </div>
      </div>
      <hr className="my-3" />
    </div>
  );
};

export default MyPostCard;
