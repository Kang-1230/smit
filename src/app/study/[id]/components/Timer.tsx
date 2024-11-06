"use client";

import { useStudyTimer } from "@/hooks/useTimer";
import Image from "next/image";
import { useEffect, useState } from "react";

const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0",
  )}:${String(remainingSeconds).padStart(2, "0")}`;
};

const TimerTimer = ({ studyId }: { studyId: string }) => {
  const {
    schedules,
    time,
    isRunning,
    isWithinTimeRange,
    handleStart,
    handlePause,
  } = useStudyTimer(studyId);

  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning) {
      intervalId = setInterval(() => {
        setRotation((prev) => (prev - 1) % 360);
      }, 50);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning]);

  if (schedules.length) {
    return (
      <div className="bg-secondary-900 rounded-20 w-full h-[316px] relative my-6">
        <Image
          src={`/icons/timer/Spinner.svg`}
          alt="timer_spinner"
          width={276}
          height={276}
          className="absolute top-1/2 left-1/2"
          style={{
            transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
          }}
        />
        <p className="font-pretendard text-[54px] text-white font-light mr-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {formatTime(time)}
        </p>
        <div className="absolute bottom-6 right-5">
          {!isRunning ? (
            <button
              onClick={handleStart}
              disabled={!isWithinTimeRange}
              className="focus:outline-none"
            >
              <Image
                src={`/icons/timer/Start.svg`}
                alt="start"
                width={24}
                height={24}
              />
            </button>
          ) : (
            <button onClick={handlePause} className="focus:outline-none">
              <Image
                src={`/icons/timer/Pause.svg`}
                alt="start"
                width={24}
                height={24}
              />
            </button>
          )}
        </div>
      </div>
    );
  } else {
    return <div>오늘 일정이 없습니다</div>;
  }
};

export default TimerTimer;
