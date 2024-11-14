import { Study } from "@/types/studys";
import RankerAvatar from "./RankerAvatar";

type Props = {
  rankers: Study[];
  handleModalClick: (id: string) => void;
};

export default function TopRankers({ rankers, handleModalClick }: Props) {
  const sortedRanking = [
    { rank: 2, study: rankers[1] },
    { rank: 1, study: rankers[0] },
    { rank: 3, study: rankers[2] },
  ];

  return (
    <div className="absolute top-[125px] flex w-full justify-center gap-[31px]">
      {sortedRanking.map((ranker) => (
        <RankerAvatar
          key={ranker.study.id}
          rank={ranker.rank}
          study={ranker.study}
          handleModalClick={() => handleModalClick(ranker.study.id)}
        />
      ))}
    </div>
  );
}
