"use client";

import Image from "next/image";
import { useStudyMemo } from "../[id]/hooks/usePersonalMemo";
import PersonalMemoItem from "./PersonalMemoItem";
import { useState } from "react";
import Loading from "@/components/common/Loading";

const PersonalMemos = ({ studyId }: { studyId: string }) => {
  const { data, isLoading, isError } = useStudyMemo(studyId);
  const [showItems, setShowItem] = useState(4);

  if (isLoading || !data) {
    return <Loading />;
  }

  if (isError) {
    return <div>회고록 목록을 불러오는데 실패했습니다.</div>;
  }

  // 더보기
  const handleLoadMore = () => {
    setShowItem((prev) => prev + 4);
  };

  const displayedMemos = data.slice(0, showItems);
  const hasMoreMemos = showItems < data.length;

  return (
    <div className="mb-[55px] flex w-full flex-col">
      <div className="mb-3 flex items-center p-1 pl-1">
        <Image src={"/icons/StudyMemo.svg"} alt="memo" width={16} height={16} />
        <h2 className="caption ml-1 text-white">스터디 회고록</h2>
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
