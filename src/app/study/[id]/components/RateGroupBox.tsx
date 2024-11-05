"use client";

import { useSession } from "@/hooks/useUserProfile";
import { useTimerState, useTodayCalendar } from "@/hooks/useTimerQuery";
import { getTime } from "@/utils/getTime";
import { useEffect, useState } from "react";
import { Tables } from "../../../../../database.types";
import UserRate from "./UserRate";
import GroupRate from "./GroupRate";

const RateGroupBox = ({
  member,
  studyId,
  today,
  children,
}: {
  member: Pick<Tables<"study_applylist">, "user_id">[] | null;
  studyId: string;
  today: string;
  children: JSX.Element;
}) => {
  const [current, setCurrent] = useState<Tables<"calendar"> | null>(null);
  const { data: user = null } = useSession();
  const { data: todaySchedules = null } = useTodayCalendar(studyId, today);
  const { data: userTimer = null } = useTimerState(
    user?.id,
    current,
    studyId,
    today,
  );

  useEffect(() => {
    if (!user || !todaySchedules) return;
    const current = todaySchedules?.find(
      (schedule) =>
        schedule.start_time <= getTime(new Date()) &&
        getTime(new Date()) < schedule.end_time,
    );
    if (current) setCurrent(current);
  }, [todaySchedules, userTimer]);

  return (
    <div className="w-full h-[214px] flex flex-row gap-x-3">
      <UserRate current={current} userTimer={userTimer} />
      <div className="flex flex-col w-32 gap-y-3">
        {children}
        <GroupRate
          today={today}
          studyId={studyId}
          member={member}
          current={current}
        />
      </div>
    </div>
  );
};

export default RateGroupBox;
