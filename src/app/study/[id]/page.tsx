"use client";

import GroupCalendar from "../components/GroupCalendar";
import TimerTimer from "@/app/mypage/components/Timer";

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <TimerTimer studyId={params.id} />
      <GroupCalendar studyId={params.id} />
    </div>
  );
};
export default Page;
