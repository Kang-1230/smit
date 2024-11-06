"use client";

import { Tables } from "../../../../../database.types";
import AttendanceRate from "./AttendanceRate";
import StudyChat from "./StudyChat";
import StudyTime from "./StudyTime";
import GroupRate from "./GroupRate";
import UserRate from "./UserRate";
import { useStudyManager } from "@/hooks/useStudyManager";

const StudyStateBox = ({
  study,
  member,
  studyId,
  children,
}: {
  member: Pick<Tables<"study_applylist">, "user_id">[] | null;
  studyId: string;
  today: string;
  children: JSX.Element[];
  study: Tables<"study"> | null;
}) => {
  const {
    currentSchedule,
    strokeDashoffset,
    endPoint,
    todayAttendee,
    achieverList,
    timerState,
    circumference,
    todaySchedules,
  } = useStudyManager(studyId);
  return (
    <>
      <div className="flex flex-col justify-center w-full">
        <div className="flex flex-row justify-center w-full h-[172px] gap-x-3">
          <StudyTime
            todaySchedules={todaySchedules}
            currentSchedule={currentSchedule}
          />
          <StudyChat study={study} />
        </div>
        {children}
        <div className="min-w-[327px] h-[214px] flex flex-row w-full">
          <UserRate
            currentSchedule={currentSchedule}
            endPoint={endPoint}
            strokeDashoffset={strokeDashoffset}
            circumference={circumference}
            userTimer={timerState}
          />
          <div className="flex flex-col min-w-[128px] gap-y-3 w-full">
            <AttendanceRate todayAttendee={todayAttendee} member={member} />
            <GroupRate member={member} achieverList={achieverList} />
          </div>
        </div>
      </div>
    </>
  );
};

export default StudyStateBox;
