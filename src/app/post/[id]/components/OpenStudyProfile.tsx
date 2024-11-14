"use client";
import { useSession } from "@/hooks/useUserProfile";
import { useState } from "react";
import ChevronRight from "../../../../../public/icons/ChevronRight.svg";
import Image from "next/image";
import RankingModal from "@/app/ranking/components/_/RankingModal";
import RankingModalOverlay from "@/app/ranking/components/_/RankingModalOverlay";

const OpenStudyProfile = ({
  userId,
  studyId,
}: {
  userId: string;
  studyId: string;
}) => {
  const [isModal, setIsModal] = useState(false);
  const { data } = useSession();

  return (
    <>
      {data?.id === userId && (
        <Image
          src={ChevronRight}
          onClick={() => setIsModal(true)}
          alt="right"
          width={20}
          height={20}
        />
      )}
      {isModal && (
        <RankingModalOverlay onClick={() => setIsModal(false)}>
          <RankingModal id={studyId} />
        </RankingModalOverlay>
      )}
    </>
  );
};

export default OpenStudyProfile;
