"use client";

import { getTime } from "@/utils/getTime";
import { Tables } from "../../../../../database.types";

const StudyTime = ({
  todaySchedules,
  currentSchedule,
}: {
  todaySchedules: Tables<"calendar">[] | null;
  currentSchedule: Tables<"calendar"> | null;
}) => {
  const now = getTime(new Date());
  console.log(currentSchedule);

  if (todaySchedules) {
    const nextSchedule = !currentSchedule
      ? todaySchedules.find((schedule) => {
          const prevScheduleIndex = todaySchedules.indexOf(schedule) - 1;

          if (prevScheduleIndex >= 0) {
            const prevSchedule = todaySchedules[prevScheduleIndex];
            return now > prevSchedule.end_time && now < schedule.start_time;
          }

          return schedule.start_time > now;
        })
      : currentSchedule;

    return (
      <div className="h-full w-1/2 rounded-20 bg-secondary-100 p-4">
        <p className="caption text-secondary-700">스터디 시간</p>
        {nextSchedule ? (
          <div className="mt-14 flex flex-col gap-y-1 text-2xl font-light leading-[1.35] tracking-[-0.02em] text-black">
            <p>{nextSchedule.start_time.slice(0, 5)}</p>
            <p>{nextSchedule.end_time.slice(0, 5)}</p>
          </div>
        ) : (
          <div className="mt-[27px] flex flex-col items-center">
            <div className="mb-4 h-10 w-10 rounded-full bg-secondary-200"></div>
            <p className="body-14-r text-center text-secondary-400">
              오늘 스터디 <br /> 일정이 없습니다
            </p>
          </div>
        )}
      </div>
    );
  }
};

export default StudyTime;