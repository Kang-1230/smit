"use client";
import { useSession } from "@/hooks/useUserProfile";
import ChevronRight from "../../../../../public/icons/ChevronRight.svg";
import Image from "next/image";

const OpenStudyProfile = ({ userId }: { userId: string }) => {
  const { data } = useSession();

  return (
    data?.id === userId && (
      <Image src={ChevronRight} alt="right" width={20} height={20} />
    )
  );
};

export default OpenStudyProfile;
