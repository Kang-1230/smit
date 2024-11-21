"use client";

import Image from "next/image";
import RankingModalOverlay from "./RankingModalOverlay";
import RankingGuideModal from "./RankingGuideModal";
import { useState } from "react";

export default function RankingGuideButton() {
  const [isRankingGuideModalOpen, setIsRankingGuideModalOpen] = useState(false);

  const handleModalClose = () => {
    setIsRankingGuideModalOpen(false);
  };

  return (
    <>
      <button
        className="relative flex items-center justify-center"
        onClick={() => setIsRankingGuideModalOpen(true)}
      >
        <Image src="/icons/Info.svg" alt="info" width={24} height={24} />
      </button>
      {isRankingGuideModalOpen && (
        <RankingModalOverlay
          isXButtonVisible={false}
          onClick={handleModalClose}
        >
          <RankingGuideModal onClose={handleModalClose} />
        </RankingModalOverlay>
      )}
    </>
  );
}
