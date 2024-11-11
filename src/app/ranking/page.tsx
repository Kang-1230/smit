"use client";

import React, { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchRankingData } from "@/service/posts";
import Header from "./components/Header";
import AvatarList from "./components/AvatarList";
import RankingCardList from "./components/RankingCardList";
import RankingModal from "./components/RankingModal";
import RankingModalOverlay from "./components/RankingModalOverlay";
import QuestionModal from "./components/QuestionModal";
import FloatingButtons from "@/components/common/FloatingButtons";

const RankingPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isRankingModalOpen, setIsRankingModalOpen] = useState(false);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [selectedRankingId, setSelectedRankingId] = useState("");

  const {
    data: rankingData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["ranking", currentPage],
    queryFn: () => fetchRankingData(currentPage),
    placeholderData: (previousData) => previousData,
  });

  const handleRankingClick = (rankingId: string) => {
    setIsRankingModalOpen(true);
    setSelectedRankingId(rankingId);
  };

  const handleMoreClick = useCallback(() => {
    setCurrentPage((prevPage) => prevPage + 1);
    refetch();
  }, [refetch]);

  if (isLoading || !rankingData) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching data</div>;
  }

  return (
    <section className="relative h-screen bg-gradient-to-b from-[#FF8F32] to-[#FFC799]">
      <Header onQuestionClick={() => setIsQuestionModalOpen(true)} />
      <AvatarList ranking={rankingData} onRankingClick={handleRankingClick} />
      <RankingCardList
        ranking={rankingData.slice(3)}
        onRankingClick={handleRankingClick}
        handleMoreClick={handleMoreClick}
      />

      {isRankingModalOpen && (
        <RankingModalOverlay onClick={() => setIsRankingModalOpen(false)}>
          <RankingModal id={selectedRankingId} />
        </RankingModalOverlay>
      )}
      {isQuestionModalOpen && (
        <RankingModalOverlay
          isXButtonVisible={false}
          onClick={() => setIsQuestionModalOpen(false)}
        >
          <QuestionModal onClick={() => setIsQuestionModalOpen(false)} />
        </RankingModalOverlay>
      )}
      <FloatingButtons />
    </section>
  );
};

export default RankingPage;
