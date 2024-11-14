import { Study } from "@/types/studys";
import RankingCard from "./RankingCard";

type Props = {
  rankers: Study[];
  loadMoreData: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  handleModalClick: (id: string) => void;
};

export default function OtherRankers({
  rankers,
  loadMoreData,
  hasNextPage,
  isFetchingNextPage,
  handleModalClick,
}: Props) {
  return (
    <section className="absolute top-[333px] w-full rounded-t-20 bg-gradient-to-b from-[#FFFCF9] via-[#FFF] to-[#FFF] px-[24px] py-[12px] backdrop-blur-[15px]">
      {rankers.map((ranker, index) => (
        <RankingCard
          study={ranker}
          key={ranker.id + index}
          handleModalClick={handleModalClick}
        />
      ))}
      <div className="mb-24 mt-3 min-h-64 text-center text-[14px] text-secondary-300">
        <button
          onClick={loadMoreData}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "로딩 중..."
            : hasNextPage
              ? "더보기"
              : "마지막 항목입니다"}
        </button>
      </div>
    </section>
  );
}
