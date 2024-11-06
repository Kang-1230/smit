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
    <div className="bg-secondary-900 text-white min-w-[187px] rounded-20 p-4 relative overflow-hidden w-full mr-3">
      <div className="absolute w-3/4 h-full -translate-x-1/2 bg-white rounded-full top-48 blur-2xl left-1/2 bg-opacity-80"></div>
      <p className="flex flex-row items-center caption">
        <Image
          src={`/icons/Book.svg`}
          alt="book icon"
          width={16}
          height={16}
          className="mr-1"
          style={{ stroke: "white", fill: "white" }}
        />
        공부시간 달성률
      </p>
      <div className="relative h-[182px]">
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
            className="transition-all duration-1000 ease-out stroke-white"
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
        <p className="font-pretendard text-[32px] font-medium absolute-center">
          {currentSchedule && userTimer ? userTimer.time_rate : 0}
          <span className="caption">%</span>
        </p>
      </div>
    </div>
  );
};

export default UserRate;
