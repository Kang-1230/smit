"use client";

import { Tables } from "../../../../../database.types";

// 그룹 내 개인의 시간 달성률
// 캘린더에 등록된 시간 (종료-시작) 초로 변환하여 퍼센트 계산
// 현재 타이머에 저장된 경과시간과 비교하여 (오늘 날짜) 퍼센트 계산

const UserRate = ({
  current,
  userTimer,
}: {
  current: Tables<"calendar"> | null;
  userTimer: Tables<"timer"> | null;
}) => {
  return (
    <div className="bg-gray-200 w-[172px] rounded-[20px] p-4">
      <p className="text-xs">공부시간 달성률</p>
      <p>{current && userTimer ? userTimer.time_rate : 0}%</p>
    </div>
  );
};

export default UserRate;
