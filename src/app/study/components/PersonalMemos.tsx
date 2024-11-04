"use client";

import { useStudyMemo } from "../[id]/hooks/usePersonalMemo";
import PersonalMemoItem from "./PersonalMemoItem";

const PersonalMemos = ({ studyId }: { studyId: string }) => {
  const { data, isLoading, isError } = useStudyMemo(studyId);

  if (isLoading) {
    return <div>회고록 목록을 불러오는 중...</div>;
  }

  if (isError) {
    return <div>회고록 목록을 불러오는데 실패했습니다.</div>;
  }

  return (
    <div className="mb-[60px]">
      <h2 className="ml-6 mb-3">스터디 회고록</h2>
      {data?.map((item) => (
        <PersonalMemoItem key={item.memo_id} memoData={item} />
      ))}
    </div>
  );
};

export default PersonalMemos;
