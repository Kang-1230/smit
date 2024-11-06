"use client";

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
    <div className="relative w-1/2 h-full p-4 bg-secondary-900 rounded-20">
      <p className="body-16-m mb-[59px]">
        오픈 채팅방
        <br />
        바로가기
      </p>
      <div className="w-[122px] h-[40px] rounded-full bg-gradient-to-r from-transparent to-white/60 from-35% absolute bottom-[13px] right-[13px] flex justify-end">
        <div
          className="w-10 h-10 rounded-full bg-primary-50"
          onClick={openChatHandler}
        />
      </div>
    </div>
  );
};

export default StudyChat;
