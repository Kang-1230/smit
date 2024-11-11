// components/AvatarList.tsx
import React from "react";
import Avatar from "./Avatar";
import { RankingItem } from "@/service/posts";

interface AvatarListProps {
  ranking: RankingItem[];
  onRankingClick: (rankingId: string, rank: number) => void;
}

const AvatarList: React.FC<AvatarListProps> = ({ ranking, onRankingClick }) => {
  const sortedRanking = [ranking[1], ranking[0], ranking[2]];
  const ranks = [2, 1, 3];

  return (
    <div className="absolute top-[125px] flex w-full justify-center gap-[31px]">
      {sortedRanking
        ?.slice(0, 3)
        .map((rankingItem, index) => (
          <Avatar
            key={rankingItem.study_id}
            rank={ranks[index]}
            rankingItem={rankingItem}
            onClick={() => onRankingClick(rankingItem.study_id, index + 1)}
          />
        ))}
    </div>
  );
};

export default AvatarList;
