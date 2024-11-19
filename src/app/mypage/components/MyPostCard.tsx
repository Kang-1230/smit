"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Tables } from "../../../../database.types";
import { deletePost } from "@/utils/supabase/supabase-client";
import MyButton from "@/components/common/Button";
import Link from "next/link";
import useModalOpen from "@/hooks/useModalOpen";
import DeleteModal from "@/components/common/DeleteModal";
import Image from "next/image";

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
    <>
      <Link href={`/post/${post.post_id}`}>
        <div className="flex h-[40px] flex-row items-center justify-between xl:h-full xl:w-[388px] xl:flex-col xl:items-start xl:rounded-20 xl:border-[1px] xl:border-secondary-100 xl:p-[20px]">
          <div className="hidden rounded-full bg-c-background p-[8px] xl:mb-[8px] xl:block">
            <Image
              src={`/icons/pc/Pencil.svg`}
              alt="pencil"
              width={32}
              height={32}
            />
          </div>
          <p className="body-16-m xl:title-18-m min-w-0 max-w-full flex-1 overflow-hidden text-ellipsis text-nowrap pr-[3px]">
            {post.post_name}
          </p>
          <div className="flex flex-row gap-x-[4px] xl:w-full">
            {/* 수정 페이지로 link 필요 */}
            <Link
              href={`/write?post=${post.post_id}`}
              key={post.post_id}
              className="w-full"
            >
              <MyButton
                style="black-fill"
                size="sm"
                responsiveSize="lg"
                className="xl:beige xl:w-full xl:bg-c-background"
              >
                수정
              </MyButton>
            </Link>
            <MyButton
              style="black-line"
              size="sm"
              onClick={modalOpen}
              responsiveSize="lg"
              className="xl:beige xl:w-full xl:bg-tertiary-50"
            >
              삭제
            </MyButton>
          </div>
        </div>
      </Link>
      {isModalOpen && (
        <DeleteModal onClose={modalClose} onDelete={deletePostMutation} />
      )}
    </>
  );
};

export default MyPostCard;
