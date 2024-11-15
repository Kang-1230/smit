import { Study } from "@/types/studys";
import RankingCard from "./RankingCard";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

type Props = {
  rankers: Study[];
  loadMoreData: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  handleModalClick: (id: string) => void;
  fetchNextPage: () => void;
};

export default function OtherRankers({
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
    <section className="absolute top-[333px] w-full rounded-t-20 bg-gradient-to-b from-[#FFFCF9] via-[#FFF] to-[#FFF] px-[24px] py-[12px] backdrop-blur-[15px]">
      {rankers.map((ranker, index) => (
        <RankingCard
          study={ranker}
          key={ranker.id + index}
          handleModalClick={handleModalClick}
        />
      ))}
      <div
        className="mb-24 mt-3 text-center text-[14px] text-secondary-300"
        ref={ref}
      >
        {isFetchingNextPage ? "로딩 중..." : "마지막 항목입니다"}
      </div>
    </section>
  );
}
