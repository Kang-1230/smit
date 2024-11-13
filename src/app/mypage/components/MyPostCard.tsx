"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Tables } from "../../../../database.types";
import { deletePost } from "@/utils/supabase/supabase-client";
import MyButton from "@/components/common/Button";
import Link from "next/link";
import useModalOpen from "@/hooks/useModalOpen";
import DeleteModal from "@/components/common/DeleteModal";

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

  const { modalClose, modalOpen, isModalOpen } = useModalOpen();

  return (
    <div>
      <div className="flex h-10 flex-row items-center justify-between">
        <p className="body-16-m">{post.post_name}</p>
        <div className="flex flex-row gap-x-1">
          {/* 수정 페이지로 link 필요 */}
          <Link href={`/write?post=${post.post_id}`} key={post.post_id}>
            <MyButton style="black-fill" size="sm">
              수정
            </MyButton>
          </Link>
          <MyButton style="black-line" size="sm" onClick={modalOpen}>
            삭제
          </MyButton>
        </div>
      </div>
      {isModalOpen && (
        <DeleteModal onClose={modalClose} onDelete={deletePostMutation} />
      )}
    </div>
  );
};

export default MyPostCard;
