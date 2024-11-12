"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Tables } from "../../../../database.types";
import { deletePost } from "@/utils/supabase/supabase-client";
import MyButton from "@/components/common/Button";
import Link from "next/link";
import useModalOpen from "@/hooks/useModalOpen";
import ModalOverlay from "@/components/common/ModalOverlay";
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
        <ModalOverlay onClick={modalClose}>
          <div className="flex w-full flex-col items-center px-[20px] py-[32px]">
            <div className="relative mb-[16px] h-[161px] w-[178px]">
              <Image
                src={`/icons/Warning.svg`}
                alt="Warning icon"
                fill
                className="object-cover"
              />
            </div>
            <p className="title-20-s mb-[8px]">삭제하시겠습니까?</p>
            <p className="body-14-m">삭제 후 복구가 불가능합니다.</p>
            <div className="mt-[28px] flex w-full flex-row gap-x-1">
              <MyButton size="lg" style="black-line" onClick={modalClose}>
                취소
              </MyButton>
              <MyButton
                size="lg"
                style="black-fill"
                className={"w-full"}
                onClick={deletePostMutation}
              >
                삭제하기
              </MyButton>
            </div>
          </div>
        </ModalOverlay>
      )}
    </div>
  );
};

export default MyPostCard;
