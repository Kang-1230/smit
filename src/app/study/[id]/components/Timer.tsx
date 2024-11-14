"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Tables } from "../../../../../database.types";

const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0",
  )}:${String(remainingSeconds).padStart(2, "0")}`;
};

const TimerTimer = ({
  time,
  isRunning,
  isWithinTimeRange,
  handleStart,
  handlePause,
}: {
  todaySchedules: Tables<"calendar">[];
  time: number;
  isRunning: boolean | undefined | null;
  isWithinTimeRange: boolean;
  handleStart: () => void;
  handlePause: () => void;
}) => {
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

  return (
    <div className="relative my-6 h-[316px] w-full rounded-20 bg-secondary-900">
      <Image
        src={`/icons/timer/Spinner.svg`}
        alt="timer_spinner"
        width={276}
        height={276}
        className="absolute left-1/2 top-1/2"
        style={{
          transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
        }}
      />
      <p className="absolute left-1/2 top-1/2 mr-3 -translate-x-1/2 -translate-y-1/2 font-pretendard text-[54px] font-light text-white">
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
};

export default TimerTimer;
