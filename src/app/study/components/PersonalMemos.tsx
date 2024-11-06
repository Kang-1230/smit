"use client";

import Image from "next/image";
import { useStudyMemo } from "../[id]/hooks/usePersonalMemo";
import PersonalMemoItem from "./PersonalMemoItem";
import StudyMemo from "../../../../public/icons/StudyMemo.svg";

const PersonalMemos = ({ studyId }: { studyId: string }) => {
  const { data, isLoading, isError } = useStudyMemo(studyId);

  if (isLoading) {
    return <div>회고록 목록을 불러오는 중...</div>;
  }

  if (isError) {
    return <div>회고록 목록을 불러오는데 실패했습니다.</div>;
  }

  return (
    <div className="flex flex-col w-full mb-[110px]">
      <div className="flex items-center p-1 mb-3 pl-1">
        <Image src={StudyMemo} alt="memo" width={16} height={16} />
        <h2 className="caption text-white ml-1">스터디 회고록</h2>
      </div>
      {data?.map((item) => (
        <PersonalMemoItem key={item.memo_id} memoData={item} />
      ))}
    </div>
  );
};

export default PersonalMemos;
