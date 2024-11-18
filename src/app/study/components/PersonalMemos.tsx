"use client";

import Image from "next/image";
import { useStudyMemo } from "../[id]/hooks/usePersonalMemo";
import PersonalMemoItem from "./PersonalMemoItem";
import { useState } from "react";
import Loading from "@/components/common/Loading";
import { useSession } from "@/hooks/useUserProfile";

const PersonalMemos = ({ studyId }: { studyId: string }) => {
  const { data, isLoading, isError } = useStudyMemo(studyId);
  const [showItems, setShowItem] = useState(4);
  const { data: userData } = useSession();

  if (isLoading || !data) {
    return <Loading />;
  }

  if (isError) {
    return <div>회고록 목록을 불러오는데 실패했습니다.</div>;
  }

  const sortedMemos = [...data].sort((a, b) => {
    if (a.user_id === userData?.id) return -1;
    if (b.user_id === userData?.id) return 1;
    return 0;
  });

  // 더보기
  const handleLoadMore = () => {
    setShowItem((prev) => prev + 4);
  };

  const displayedMemos = sortedMemos.slice(0, showItems);
  const hasMoreMemos = showItems < data.length;

  return (
    <div className="mb-[55px] flex w-full flex-col">
      <div className="caption mb-3 flex h-4 w-full items-center p-1">
        <Image
          src={"/icons/StudyMemo.svg"}
          alt="memo"
          width={16}
          height={16}
          className="h-3 w-3"
        />
        <h2 className="ml-1 text-white">스터디 회고록</h2>
      </div>
      {displayedMemos.map((item) => (
        <PersonalMemoItem key={item.memo_id} memoData={item} />
      ))}
      {hasMoreMemos && (
        <button
          onClick={handleLoadMore}
          className="caption mt-5 flex items-center justify-center text-secondary-300"
        >
          <span>더보기</span>
          <Image
            src={"/icons/ChevronDownGray.svg"}
            alt="down"
            width={20}
            height={20}
          />
        </button>
      )}
    </div>
  );
};

export default PersonalMemos;
