"use client";

import Image from "next/image";
import { Tables } from "../../../../../database.types";

const StudyChat = ({ study }: { study: Tables<"study"> | null }) => {
  const openChatHandler = () => {
    if (study?.study_chaturl) {
      window.open(study.study_chaturl, "_blink", "noopener,noreferrer");
    } else {
      alert("연결된 채팅방이 없어요.");
    }
  };
  return (
    <div className="relative h-full w-full rounded-20 bg-secondary-900 p-[12px] xl:w-full xl:px-[20px] xl:py-[24px]">
      <p className="body-16-m xl:body-18-m mb-[59px]">
        오픈 채팅방
        <br />
        바로가기
      </p>
      <div className="absolute bottom-[13px] right-[13px] flex h-[40px] w-[122px] justify-end rounded-full bg-gradient-to-r from-transparent from-30% to-white/60 xl:bottom-[38px] xl:right-[24px] xl:h-[60px] xl:w-[318px] xl:from-50% xl:to-white/40">
        <button
          className="relative h-[40px] w-[40px] rounded-full bg-primary-50 xl:h-[60px] xl:w-[60px]"
          onClick={openChatHandler}
          disabled={!study?.study_chaturl}
        >
          <div className="absolute-center h-[24px] w-[24px]">
            <Image src={`/icons/timer/ArrowLined.svg`} alt="book icon" fill />
          </div>
        </button>
      </div>
    </div>
  );
};

export default StudyChat;
