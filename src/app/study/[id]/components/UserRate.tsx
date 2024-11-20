"use client";

import Image from "next/image";
import { Tables } from "../../../../../database.types";

// 그룹 내 개인의 시간 달성률
// 캘린더에 등록된 시간 (종료-시작) 초로 변환하여 퍼센트 계산
// 현재 타이머에 저장된 경과시간과 비교하여 (오늘 날짜) 퍼센트 계산

// userTimer?.time_rate ? userTimer.time_rate / 100 : 0;

const UserRate = ({
  userTimer,
  endPoint,
  strokeDashoffset,
  circumference,
  currentSchedule,
}: {
  userTimer: Tables<"timer"> | null;
  endPoint: { x: number; y: number };
  strokeDashoffset: number;
  circumference: number;
  currentSchedule: Tables<"calendar"> | null;
}) => {
  return (
    <div className="relative mr-3 h-full w-full min-w-[187px] overflow-hidden rounded-20 bg-secondary-900 p-[16px] text-white xl:m-0 xl:h-[151px] xl:px-[20px] xl:py-[24px]">
      {/* 배경 그라데이션 */}
      <div className="absolute left-1/2 top-48 h-full w-5/6 -translate-x-1/2 rounded-full bg-white/50 blur-2xl xl:top-28 xl:h-[200%]"></div>
      <div className="caption xl:body-14-r flex flex-row items-center xl:items-end">
        <div className="relative mr-[4px] h-[16px] w-[16px] xl:h-[20px] xl:w-[20px]">
          <Image src={`/icons/timer/BookLined.svg`} alt="book icon" fill />
        </div>
        공부시간 달성률
      </div>
      <div className="relative h-full w-full">
        <div className="absolute-center xl:bottom-[3px] xl:right-[31px] xl:translate-x-0 xl:translate-y-0">
          {/* 배경 원 */}
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="rotate-[-90deg]"
          >
            <circle
              className="stroke-secondary-700"
              fill="none"
              strokeWidth="1.5"
              strokeLinecap="round"
              cx="60"
              cy="60"
              r="57"
            ></circle>
            {userTimer?.time_rate && (
              <circle
                cx={endPoint.x}
                cy={endPoint.y}
                r="3.5"
                fill="white"
                className="transition-all duration-1000 ease-out"
              ></circle>
            )}
          </svg>
          {/* 원형 차트 */}
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute-center rotate-[-90deg]"
          >
            <circle
              className="stroke-white transition-all duration-1000 ease-out"
              fill="none"
              strokeWidth="1.5"
              strokeLinecap="round"
              cx="60"
              cy="60"
              r="57"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
            ></circle>
            {userTimer?.time_rate && (
              <circle
                cx={endPoint.x}
                cy={endPoint.y}
                r="3.5"
                fill="white"
                className="transition-all duration-1000 ease-out"
              ></circle>
            )}
          </svg>
          <p className="absolute-center font-pretendard text-[32px] font-medium">
            {currentSchedule && userTimer ? userTimer.time_rate : 0}
            <span className="caption">%</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserRate;
