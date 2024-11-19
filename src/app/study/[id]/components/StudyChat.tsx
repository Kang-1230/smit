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
    <div className="relative h-full w-1/2 rounded-20 bg-secondary-900 p-[12px] xl:w-full xl:px-[20px] xl:py-[24px]">
      <p className="body-16-m mb-[59px]">
        오픈 채팅방
        <br />
        바로가기
      </p>
      <div className="absolute bottom-[13px] right-[13px] flex h-[40px] w-[122px] justify-end rounded-full bg-gradient-to-r from-transparent from-30% to-white/60">
        <button
          className="relative h-10 w-10 rounded-full bg-primary-50"
          onClick={openChatHandler}
          disabled={!study?.study_chaturl}
        >
          <Image
            src={`/icons/timer/ArrowLined.svg`}
            alt="book icon"
            width={20}
            height={20}
            className="absolute-center"
          />
        </button>
      </div>
    </div>
  );
};

export default StudyChat;
