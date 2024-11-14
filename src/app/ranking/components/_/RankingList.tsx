"use client";

import { getStudys } from "@/service/refac";
import { useInfiniteQuery } from "@tanstack/react-query";
import TopRankers from "./TopRankers";
import OtherRankers from "./OtherRankers";
import { useState } from "react";
import RankingModalOverlay from "./RankingModalOverlay";
import Loading from "@/components/common/Loading";
import RankingModal from "./RankingModal";

export default function RankingList() {
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
    <>
      <TopRankers
        rankers={data.pages[0].data.slice(0, 3)}
        handleModalClick={handleModalClick}
      />
      <OtherRankers
        rankers={otherRankers}
        loadMoreData={loadMoreData}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        handleModalClick={handleModalClick}
      />
      {isRankingModalOpen && (
        <RankingModalOverlay onClick={() => setIsRankingModalOpen(false)}>
          <RankingModal id={selectedRankingId} />
        </RankingModalOverlay>
      )}
    </>
  );
}
