// components/RankingCardList.tsx
import React from "react";
import RankingCard from "./RankingCard";
import { RankingItem } from "@/service/posts";

interface RankingCardListProps {
  ranking: RankingItem[];
  onRankingClick: (rankingId: string, rank: number) => void;
  handleMoreClick: () => void;
}

const RankingCardList: React.FC<RankingCardListProps> = ({
  ranking,
  onRankingClick,
  handleMoreClick,
}) => {
  return (
    <section className="absolute top-[333px] w-full rounded-t-20 bg-gradient-to-b from-[#FFFCF9] via-[#FFF] to-[#FFF] px-[24px] py-[12px] backdrop-blur-[15px]">
      {ranking.map((rankingItem, index) => (
        <RankingCard
          key={rankingItem.study_id}
          rankingItem={rankingItem}
          rank={index + 4}
          onClick={() => onRankingClick(rankingItem.study_id, index + 4)}
        />
      ))}
      <div className="mb-24 mt-3 text-center text-[14px] text-secondary-300">
        <button onClick={handleMoreClick}>더보기</button>
      </div>
    </section>
  );
};

export default RankingCardList;
