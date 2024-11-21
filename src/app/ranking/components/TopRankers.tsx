import { Study } from "@/types/studys";
import RankerAvatar from "./RankerAvatar";
import RankerAvatarBig from "@/app/ranking/components/RankerAvatarBig";

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
    <div className="absolute left-1/2 top-[125px] flex w-full -translate-x-1/2 justify-center gap-[31px] md:top-[245px] md:gap-[44px]">
      {sortedRanking.map((ranker) => (
        <div key={ranker.study.id}>
          <div className="cursor-pointer md:hidden">
            <RankerAvatar
              rank={ranker.rank}
              study={ranker.study}
              handleModalClick={() => handleModalClick(ranker.study.id)}
            />
          </div>
          <div className="hidden cursor-pointer md:block">
            <RankerAvatarBig
              rank={ranker.rank}
              study={ranker.study}
              handleModalClick={() => handleModalClick(ranker.study.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
