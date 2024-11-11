"use client";

import { getTime } from "@/utils/getTime";
import { Tables } from "../../../../../database.types";
import Image from "next/image";

const StudyTime = ({
  todaySchedules,
  currentSchedule,
}: {
  todaySchedules: Tables<"calendar">[] | null;
  currentSchedule: Tables<"calendar"> | null;
}) => {
  const now = getTime(new Date());

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
        <p className="caption flex flex-row items-center text-secondary-700">
          <Image
            src={`/icons/timer/ClockLined.svg`}
            alt="book icon"
            width={16}
            height={16}
            className="mr-1"
          />
          스터디 시간
        </p>
        {nextSchedule ? (
          <div className="mt-14 flex flex-col gap-y-1 text-2xl font-light leading-[1.35] tracking-[-0.02em] text-black">
            <p className="flex items-center gap-x-2">
              <Image
                src={`/icons/StartClock.svg`}
                alt="clock icon"
                width={27}
                height={27}
              />
              {nextSchedule.start_time.slice(0, 5)}
            </p>
            <p className="flex items-center gap-x-2">
              <Image
                src={`/icons/EndClock.svg`}
                alt="clock icon"
                width={27}
                height={27}
              />
              {nextSchedule.end_time.slice(0, 5)}
            </p>
          </div>
        ) : (
          <div className="mt-[27px] flex flex-col items-center">
            <Image
              src={`/icons/timer/Clock.svg`}
              alt="clock icon"
              width={40}
              height={40}
              className="mb-4"
            />
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
