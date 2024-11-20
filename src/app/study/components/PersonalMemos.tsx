"use client";

import Image from "next/image";
import { useStudyMemo } from "../[id]/hooks/usePersonalMemo";
import PersonalMemoItem from "./PersonalMemoItem";
import { useState } from "react";
import Loading from "@/components/common/Loading";
import { useSession } from "@/hooks/useUserProfile";
import BookLined from "@/components/ui/icons/BookLined";
import MemoMemberList from "./MemoMemberList";
import { MemoWithUser } from "@/types/PersonalMemo";

const PersonalMemos = ({ studyId }: { studyId: string }) => {
  const { data, isLoading, isError } = useStudyMemo(studyId);
  const [showItems, setShowItem] = useState(4);
  const { data: userData } = useSession();
  const [filteredMemo, setFilteredMemo] = useState<MemoWithUser | null>(null);

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

  if (!filteredMemo && sortedMemos.length > 0 && !isLoading) {
    setFilteredMemo(sortedMemos[0]);
  }

  // 더보기
  const handleLoadMore = () => {
    setShowItem((prev) => prev + 4);
  };

  const findMemoForWeb = (userId: string) => {
    const filteredData = data.filter((item) => item.user_id === userId);
    setFilteredMemo(filteredData[0]);
    return;
  };

  const displayedMemos = sortedMemos.slice(0, showItems);
  const hasMoreMemos = showItems < data.length;

  return (
    <div className="mb-[55px] flex w-full flex-col">
      <div className="xl:absolute xl:bottom-[474px]">
        <header className="caption mb-3 flex h-4 w-full items-center p-1">
          <BookLined />
          <h2 className="ml-1 text-white xl:text-secondary-300">
            스터디 회고록
          </h2>
        </header>
        <nav className="flex gap-2 xl:mb-[18px]">
          {sortedMemos.map((item) => (
            <MemoMemberList
              key={item.user_id}
              memoData={item}
              findMemoForWeb={findMemoForWeb}
            />
          ))}
        </nav>
      </div>
      <div className="hidden xl:block">
        {filteredMemo && <PersonalMemoItem memoData={filteredMemo} />}
      </div>
      <div className="xl:hidden">
        {displayedMemos.map((item) => (
          <PersonalMemoItem key={item.memo_id} memoData={item} />
        ))}
      </div>
      {hasMoreMemos && (
        <button
          onClick={handleLoadMore}
          className="caption mt-5 flex items-center justify-center text-secondary-300 xl:hidden"
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
