import Image from "next/image";
import React from "react";
import { Study } from "@/types/studys";

type Props = {
  study: Study;
  handleModalClick: (id: string) => void;
};

const RankingCard = ({ study, handleModalClick }: Props) => {
  return (
    <div
      className="flex h-[64px] w-full cursor-pointer items-center justify-between border-b border-[##E6E6E6] px-2 py-4"
      onClick={() => handleModalClick(study.id)}
    >
      <div className="flex items-center gap-3 md:gap-5">
        <div className="w-[22px] text-center text-secondary-400">
          {study.rank}
        </div>
        <div className="relative h-[40px] w-[40px] rounded-full border">
          <Image
            priority
            className="h-full w-full rounded-full object-cover"
            src={study.image || ""}
            alt="asdf"
            width={100}
            height={100}
          />
        </div>
        <div className="w-[9.75rem] truncate text-[14px] font-[500] md:w-[20rem]">
          {study.name}
        </div>
      </div>

      <div className="w-[60px] text-right text-[16px] font-[500]">
        {study.score.toLocaleString()}
        <span className="ml-[2px] text-[14px] font-normal">점</span>
      </div>
    </div>
  );
};

export default RankingCard;
