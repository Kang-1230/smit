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
      className="flex h-[64px] items-center justify-between border-b border-[##E6E6E6] px-2 py-[12px]"
      onClick={() => handleModalClick(study.id)}
    >
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
      <div className="w-[22px] text-center text-secondary-400">
        {study.rank}
      </div>
      <div className="w-[156px] truncate text-[14px] font-[500]">
        {study.name}
      </div>
      <div className="w-[60px] text-right text-[16px] font-[500]">
        {study.score.toLocaleString()}
        <span className="ml-[2px] text-[14px] font-normal">점</span>
      </div>
    </div>
  );
};

export default RankingCard;
