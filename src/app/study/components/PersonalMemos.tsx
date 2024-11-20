"use client";

import Image from "next/image";
import { useStudyMemo } from "../[id]/hooks/usePersonalMemo";
import PersonalMemoItem from "./PersonalMemoItem";
import { useState } from "react";
import { useSession } from "@/hooks/useUserProfile";
import BookLined from "@/components/ui/icons/BookLined";
import MemoMemberList from "./MemoMemberList";
import { MemoWithUser } from "@/types/PersonalMemo";
import useCarousel from "@/hooks/useCarousel";
import MemoSkeleton from "./MemoSkeleton";
import Loading from "@/components/common/Loading";

const PersonalMemos = ({ studyId }: { studyId: string }) => {
  const { data, isLoading, isError } = useStudyMemo(studyId);
  const [showItems, setShowItem] = useState(4);
  const { data: userData } = useSession();
  const [filteredMemo, setFilteredMemo] = useState<MemoWithUser | null>(null);
  const { handleNext, handlePrev, trackRef } = useCarousel(64, data?.length);

  if (isLoading || !data) {
    return (
      <>
        <div className="hidden xl:block">
          <MemoSkeleton />
        </div>
        <div className="xl:hidden">
          <Loading />
        </div>
      </>
    );
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
        <header className="caption mb-3 flex h-6 items-center p-1 xl:mb-2 xl:w-[388px] xl:justify-between">
          <div className="flex items-center gap-1">
            <BookLined />
            <h2 className="ml-1 text-white xl:text-secondary-300">
              스터디 회고록
            </h2>
          </div>
          <div
            className={`hidden gap-1 xl:flex ${data.length < 7 && "xl:hidden"} `}
          >
            <Image
              src={"/icons/ChevronLeftWhite.svg"}
              alt="left"
              width={24}
              height={24}
              className="cursor-pointer"
              onClick={handlePrev}
            />
            <Image
              src={"/icons/ChevronRightWhite.svg"}
              alt="Right"
              width={24}
              height={24}
              className="cursor-pointer"
              onClick={handleNext}
            />
          </div>
        </header>
        <div className="overflow-hidden">
          <nav
            className="mb-[18px] hidden w-[400px] gap-2 duration-150 xl:flex"
            ref={trackRef}
          >
            {sortedMemos
              .slice(0, Math.max(6, sortedMemos.length))
              .map((item) => (
                <MemoMemberList
                  key={item.user_id}
                  memoData={item}
                  findMemoForWeb={findMemoForWeb}
                  isSelected={filteredMemo?.user_id === item.user_id}
                />
              ))}
          </nav>
        </div>
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
