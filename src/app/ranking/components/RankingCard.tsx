import Image from "next/image";
import React from "react";
import { Tables } from "../../../../database.types";

type Props = {
  rankingItem: Tables<"study">;
  rank: number;
  onClick: () => void;
};

const RankingCard = ({ rankingItem, rank, onClick }: Props) => {
  const { study_name, study_score, study_imgurl } = rankingItem;
  return (
    <div
      className="flex h-[64px] items-center justify-between border-b border-[##E6E6E6] px-2 py-[12px]"
      onClick={onClick}
    >
      <div className="relative h-[40px] w-[40px] rounded-full border">
        <Image
          priority
          className="h-full w-full rounded-full object-cover"
          src={study_imgurl || ""}
          alt="asdf"
          width={100}
          height={100}
        />
      </div>
      <div className="w-[22px] text-center text-secondary-400">{rank}</div>
      <div className="w-[156px] truncate text-[14px] font-[500]">
        {study_name}
      </div>
      <div className="w-[60px] text-right text-[16px] font-[500]">
        {study_score.toLocaleString()}
        <span className="ml-[2px] text-[14px] font-normal">점</span>
      </div>
    </div>
  );
};

export default RankingCard;
