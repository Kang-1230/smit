"use client";

import { useStudyTimer } from "../../../hooks/useTimer";

const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${String(hours).padStart(2, "0")} : ${String(minutes).padStart(
    2,
    "0",
  )} : ${String(remainingSeconds).padStart(2, "0")}`;
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

  if (schedules.length) {
    return (
      <div className="bg-gray-300 mx-6 flex flex-row rounded-2xl w-full py-6 justify-center">
        <p className="text-4xl font-semibold mr-3">{formatTime(time)}</p>
        {!isRunning ? (
          <button
            onClick={handleStart}
            disabled={!isWithinTimeRange}
            className="flex items-center gap-2"
          >
            시작
          </button>
        ) : (
          <button onClick={handlePause} className="flex items-center gap-2">
            일시정지
          </button>
        )}
      </div>
    );
  } else {
    return <div>오늘 일정이 없습니다</div>;
  }
};

export default TimerTimer;
