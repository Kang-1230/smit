"use client";

import { useSession } from "@/hooks/useUserProfile";
import { applyNewStudy } from "@/utils/supabase/supabase-client";
import { useMutation } from "@tanstack/react-query";
import { Tables } from "../../../../../database.types";
import { useState } from "react";
import ModalOverlay from "@/components/common/ModalOverlay";

const ApplyStudy = ({ postData }: { postData: Tables<"post"> }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const { data } = useSession();

  // 스터디 신청
  const { mutate: applyStudy } = useMutation({
    mutationFn: () => applyNewStudy(postData.study_id, message),
  });

  return (
    <>
      {data?.id !== postData.user_id ? (
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex-1 h-[42px] bg-[#4F4F4F] text-white rounded-full my-5"
        >
          신청하기
        </button>
      ) : (
        <button className="flex-1 h-[42px] bg-[#DFDFDF] text-white rounded-full my-5 cursor-default">
          신청하기
        </button>
      )}
      {isModalOpen && (
        <ModalOverlay onClick={() => setIsModalOpen(false)}>
          <div className="flex flex-col w-full pt-[34px] pb-1 justify-end items-center">
            <p className="text-xl font-semibold">이 스터디에 신청하시겠어요?</p>
            <p className="text-center text-[#484741] text-sm font-medium my-4">
              신청하기에 앞서 나의 각오를 작성해주세요!
            </p>
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex h-12 px-5 py-3 items-center mb-8 self-stretch rounded-3xl border border-neutral-600"
              placeholder="각오 한 마디! (최대 12자)"
              type="text"
              maxLength={12}
            />
            <div className="flex gap-1.5 w-full">
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-[83px] h-12 max-w-[335px] px-5 py-3 rounded-3xl border border-[#656565]"
              >
                취소
              </button>
              <button
                onClick={() => {
                  applyStudy(undefined, {
                    onSuccess: () => {
                      setIsModalOpen(false);
                    },
                  });
                }}
                className="h-12 max-w-sm px-5 py-3 flex-1 rounded-3xl bg-[#777] text-white"
              >
                신청하기
              </button>
            </div>
          </div>
        </ModalOverlay>
      )}
    </>
  );
};

export default ApplyStudy;
