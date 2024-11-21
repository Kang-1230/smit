"use client";

import Background from "./Background";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getStudys } from "@/service/refac";
import Loading from "@/components/common/Loading";
import RankingModalOverlay from "@/app/ranking/components/RankingModalOverlay";
import RankingModal from "@/app/ranking/components/_/RankingModal";
import OtherRankersList from "./OtherRankerLists";
import TopRankers from "@/app/ranking/components/TopRankers";
import RankingStage from "./RankingStage";
import RankingGuideButton from "@/app/ranking/components/RankingGuideButton";

export default function A() {
  const [isRankingModalOpen, setIsRankingModalOpen] = useState(false);
  const [selectedRankingId, setSelectedRankingId] = useState("");

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["ranking"],
      queryFn: ({ pageParam }) => getStudys(pageParam),
      getNextPageParam: (lastPage) => {
        if (!lastPage.hasMore) return undefined;
        return lastPage.page + 1;
      },
      initialPageParam: 1,
    });

  if (status === "pending") return <Loading />;

  if (status === "error") return <>data 불러오는데 에러</>;

  const otherRankers = data.pages.flatMap((page) => page.data).slice(3);

  const loadMoreData = () => {
    fetchNextPage();
  };

  const handleModalClick = (rankingId: string) => {
    setIsRankingModalOpen(true);
    setSelectedRankingId(rankingId);
  };
  return (
    <div className="w-full">
      <Background />
      <div className="mx-auto max-w-[80rem]">
        <div className="relative h-[333px] px-[24px] py-[4rem] md:h-[608px] md:py-[9.5rem]">
          <div className="flex justify-between md:justify-start">
            <h1 className="relative text-xl font-semibold leading-normal md:mr-4 md:text-2xl">
              주간 그룹 랭킹
            </h1>
            <RankingGuideButton />
          </div>
          <RankingStage />
          <TopRankers
            rankers={data.pages[0].data.slice(0, 3)}
            handleModalClick={handleModalClick}
          />
        </div>
        <OtherRankersList
          rankers={otherRankers}
          fetchNextPage={fetchNextPage}
          loadMoreData={loadMoreData}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          handleModalClick={handleModalClick}
        />
      </div>

      {isRankingModalOpen && (
        <RankingModalOverlay
          onClick={() => setIsRankingModalOpen(false)}
          isXButtonVisible={false}
        >
          <RankingModal id={selectedRankingId} />
        </RankingModalOverlay>
      )}
    </div>
  );
}
