"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Tables } from "../../../../database.types";
import { deletePost } from "@/utils/supabase/supabase-client";
import MyButton from "@/components/common/Button";
import Link from "next/link";


const MyPostCard = ({
  post,
  userId,
}: {
  post: Tables<"post">;
  userId: string | undefined;
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
      <div className="flex flex-row justify-between items-center h-10">
        <p className="body-16-m">{post.post_name}</p>
        <div className="flex flex-row gap-x-1">
          {/* 수정 페이지로 link 필요 */}
          <MyButton style="black-fill" size="sm">
            <Link href={`/write?post=${post.post_id}` } key={post.post_id}>수정</Link>
          </MyButton>
          <MyButton style="black-line" size="sm" onClick={deletePostMutation}>
            삭제
          </MyButton>
        </div>
      </div>
    </div>
  );
};

export default MyPostCard;
