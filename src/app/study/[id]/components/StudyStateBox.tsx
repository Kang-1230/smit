"use client";

import { Tables } from "../../../../../database.types";
import AttendanceRate from "./AttendanceRate";
import StudyChat from "./StudyChat";
import StudyTime from "./StudyTime";
import GroupRate from "./GroupRate";
import UserRate from "./UserRate";
import { useStudyManager } from "@/hooks/useStudyManager";
import TimerTimer from "./Timer";
import ModalOverlay from "@/components/common/ModalOverlay";
import Image from "next/image";
import MyButton from "@/components/common/Button";

const StudyStateBox = ({
  study,
  member,
  studyId,
}: {
  member: string[] | null;
  studyId: string;
  today: string;
  study: Tables<"study"> | null;
}) => {
  const {
    currentSchedule,
    strokeDashoffset,
    endPoint,
    attendee,
    achieverList,
    timerState,
    circumference,
    todaySchedules,
    time,
    isRunning,
    isWithinTimeRange,
    handleStart,
    handlePause,
    setEndModalOpen,
    endModalOpen,
    studyScore,
  } = useStudyManager(studyId, member, study);
  return (
    <>
      <div className="flex w-full flex-col justify-center">
        <div className="flex h-[172px] w-full flex-row justify-center gap-x-3">
          <StudyTime
            todaySchedules={todaySchedules}
            currentSchedule={currentSchedule}
          />
          <StudyChat study={study} />
        </div>
        <TimerTimer
          todaySchedules={todaySchedules}
          time={time}
          isRunning={isRunning}
          isWithinTimeRange={isWithinTimeRange}
          handleStart={handleStart}
          handlePause={handlePause}
        />
        <div className="flex h-[214px] w-full min-w-[327px] flex-row">
          <UserRate
            currentSchedule={currentSchedule}
            endPoint={endPoint}
            strokeDashoffset={strokeDashoffset}
            circumference={circumference}
            userTimer={timerState}
          />
          <div className="flex w-full min-w-[128px] flex-col gap-y-3">
            <AttendanceRate attendee={attendee} member={member} />
            <GroupRate member={member} achieverList={achieverList} />
          </div>
        </div>
        {endModalOpen && (
          <ModalOverlay onClick={() => setEndModalOpen(false)}>
            <div className="flex flex-col items-center px-5 py-8 text-center text-secondary-900">
              <Image
                src={`/icons/Firecracker.svg`}
                alt="폭죽"
                width={178}
                height={161}
                className="mb-4"
              />
              <p className="title-20-s mb-2">
                스터디를 끝냈어요!
                <br />
                {studyScore}점 획득!
              </p>
              <p className="body-14-m mb-7">
                오늘도 수고했긔. 공부 열심히 했긔. 칭찬하긔.
              </p>
              <MyButton
                style="black-fill"
                size="lg"
                className="w-full"
                onClick={() => setEndModalOpen(false)}
              >
                닫기
              </MyButton>
            </div>
          </ModalOverlay>
        )}
      </div>
    </>
  );
};

export default StudyStateBox;
