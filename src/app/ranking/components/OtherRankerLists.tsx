import { Study } from "@/types/studys";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import RankingCard from "./RankingCard";

type Props = {
  rankers: Study[];
  loadMoreData: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  handleModalClick: (id: string) => void;
  fetchNextPage: () => void;
};

export default function OtherRankersList({
  rankers,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
  handleModalClick,
}: Props) {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <section className="relative mx-0 max-w-full rounded-t-[37px] bg-white px-6 py-3 shadow-2xl md:px-5 md:py-5 lg:mx-6 xl:mx-0">
      <div className="absolute left-0 top-0 z-0 h-56 w-full rounded-t-[37px] bg-gradient-to-b from-[#FFF3E7] to-[#FFF]"></div>
      <div className="relative z-0">
        {rankers.map((ranker, index) => (
          <RankingCard
            study={ranker}
            key={ranker.id + index}
            handleModalClick={handleModalClick}
          />
        ))}
      </div>
      <div
        className="mb-24 mt-3 text-center text-[14px] text-secondary-300"
        ref={ref}
      >
        {isFetchingNextPage ? "로딩 중..." : "마지막 항목입니다"}
      </div>
    </section>
  );
}
