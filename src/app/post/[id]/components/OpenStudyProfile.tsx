"use client";
import { useState } from "react";
import ChevronRight from "../../../../../public/icons/ChevronRight.svg";
import Image from "next/image";
import RankingModal from "@/app/ranking/components/_/RankingModal";
import RankingModalOverlay from "@/app/ranking/components/_/RankingModalOverlay";

const OpenStudyProfile = ({ studyId }: { studyId: string }) => {
  const [isModal, setIsModal] = useState(false);

  return (
    <>
      <Image
        src={ChevronRight}
        onClick={() => setIsModal(true)}
        alt="right"
        width={20}
        height={20}
        className="cursor-pointer xl:hidden"
      />
      {isModal && (
        <RankingModalOverlay onClick={() => setIsModal(false)}>
          <RankingModal id={studyId} />
        </RankingModalOverlay>
      )}
    </>
  );
};

export default OpenStudyProfile;
