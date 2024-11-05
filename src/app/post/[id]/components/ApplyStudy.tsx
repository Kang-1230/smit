"use client";

import { useSession } from "@/hooks/useUserProfile";
import { applyNewStudy } from "@/utils/supabase/supabase-client";
import { useMutation } from "@tanstack/react-query";
import { Tables } from "../../../../../database.types";
import { useState } from "react";
import ModalOverlay from "@/components/common/ModalOverlay";
import Image from "next/image";
import Ractangle from "../../../../../public/icons/Rectangle33772.svg";
import Ellipse from "../../../../../public/icons/Ellipse661.svg";
import Ellipse2 from "../../../../../public/icons/Ellipse662.svg";

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
          className="flex-1 h-12 bg-secondary-900 text-white body-16-s rounded-full"
        >
          신청하기
        </button>
      ) : (
        <button className="flex-1 h-12 bg-secondary-50 text-secondary-200 body-16-s rounded-full cursor-default">
          신청하기
        </button>
      )}
      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 flex items-center justify-center w-full h-full bg-black/70 z-50"
        >
          <div
            className="min-w-[327px] h-auto bg-white rounded-2xl flex items-center justify-center px-5 py-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col w-full pt-[37px] pb-1 justify-end items-center relative">
              <Image
                src={Ractangle}
                alt="ractangle"
                width={104}
                height={92}
                className="shrink-0"
              />
              <div className="flex absolute gap-[10px] top-[68px]">
                {[0, 1, 2].map((el, idx) => (
                  <Image
                    key={idx}
                    src={Ellipse2}
                    alt="el"
                    width={9}
                    height={9}
                  />
                ))}
              </div>
              <Image
                src={Ellipse}
                alt="ellipse"
                width={83}
                height={6}
                className="shrink-0 mt-1"
              />
              <p className="title-20-s text-Secondary-900 leading-[1.2] tracking-[-0.4px] mt-[38px]">
                스터디에 신청하시겠습니까?
              </p>
              <p className="text-center text-[#484741] body-14-m tracking-[-0.28px] mt-3 mb-4">
                신청하기에 앞서 나의 각오를 작성해주세요!
              </p>
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex h-12 px-5 py-3 items-center mb-8 self-stretch rounded-3xl border border-neutral-600"
                placeholder="각오 한 마디"
                type="text"
                maxLength={12}
              />
              <div className="flex gap-1.5 w-full">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-[80px] h-12 max-w-[335px] px-5 py-3 rounded-3xl border border-secondary-900 body-16-s"
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
                  className="h-12 max-w-sm px-5 py-3 flex-1 rounded-3xl bg-secondary-900 text-white body-16-s"
                >
                  신청하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ApplyStudy;
