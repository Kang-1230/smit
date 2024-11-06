"use client";

import { getTime } from "@/utils/getTime";
import { Tables } from "../../../../../database.types";

const StudyTime = ({
  todaySchedules,
}: {
  todaySchedules: Tables<"calendar">[] | null;
  currentSchedule: Tables<"calendar"> | null;
}) => {
  const now = getTime(new Date());

  if (todaySchedules) {
    const nextSchedule = todaySchedules.find((schedule) => {
      const prevScheduleIndex = todaySchedules.indexOf(schedule) - 1;

      if (prevScheduleIndex >= 0) {
        const prevSchedule = todaySchedules[prevScheduleIndex];
        return now > prevSchedule.end_time && now < schedule.start_time;
      }

      return schedule.start_time > now;
    });

    return (
      <div className="w-1/2 h-full p-4 bg-secondary-100 rounded-20">
        <p className="caption text-secondary-700">스터디 시간</p>
        {nextSchedule ? (
          <div className="mt-14 text-2xl font-light text-black tracking-[-0.02em] flex flex-col gap-y-1 leading-[1.35]">
            <p>{nextSchedule.start_time.slice(0, 5)}</p>
            <p>{nextSchedule.end_time.slice(0, 5)}</p>
          </div>
        ) : (
          <div className="mt-[27px] flex flex-col items-center">
            <div className="w-10 h-10 mb-4 rounded-full bg-secondary-200"></div>
            <p className="text-center body-14-r text-secondary-400">
              오늘 스터디 <br /> 일정이 없습니다
            </p>
          </div>
        )}
      </div>
    );
  }
};

export default StudyTime;
