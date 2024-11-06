import Image from "next/image";
import React from "react";
import { Tables } from "../../../../database.types";

type Props = {
  study: Tables<"study">;
  rank: number;
  onClick: () => void;
};

const RankingCard = ({ study, rank, onClick }: Props) => {
  const { study_name, study_score, study_imgurl } = study;
  return (
    <div
      className="flex items-center justify-between px-2 py-[12px] h-[64px] border-b border-[##E6E6E6]"
      onClick={onClick}
    >
      <div className="rounded-full relative w-[40px] h-[40px] border">
        <Image
          priority
          className="w-full h-full object-cover rounded-full"
          src={study_imgurl || ""}
          alt="asdf"
          width={25}
          height={25}
        />
      </div>
      <div className="w-[22px] text-secondary-400 text-center">{rank}</div>
      <div className="w-[156px] text-[14px] font-[500] truncate">
        {study_name}
      </div>
      <div className="text-[16px] font-[500] w-[60px] text-right">
        {study_score.toLocaleString()}
        <span className="text-[14px] font-normal ml-[2px]">점</span>
      </div>
    </div>
  );
};

export default RankingCard;
