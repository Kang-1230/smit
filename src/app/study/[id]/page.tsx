import WaitApplyList from "./components/WaitApplyList";
import GroupCalendar from "../components/GroupCalendar";
import TimerTimer from "@/app/mypage/components/Timer";
import { addAttendanceList } from "@/utils/supabase/supabase-server";
import AttendanceRate from "../components/AttendanceRate";
import GroupRate from "../components/GroupRate";
import UserRate from "../components/UserRate";
import { fetchStudyMember } from "@/utils/supabase/supabase-client";

const Page = async ({ params }: { params: { id: string } }) => {
  const studyId = params.id;
  const today = new Date().toISOString().split("T")[0];
  await addAttendanceList(studyId, today);
  const studyMember = await fetchStudyMember(studyId);
  console.log("url :", studyId);

  return (
    <div className="flex flex-col items-center px-6">
      <TimerTimer studyId={studyId} />
      <GroupCalendar studyId={studyId} />
      <div className="w-full h-[214px] flex flex-row gap-x-3">
        <UserRate />
        <div className="flex flex-col w-32 gap-y-3">
          <AttendanceRate
            today={today}
            studyId={studyId}
            member={studyMember}
          />
          <GroupRate member={studyMember} />
        </div>
      </div>
      <WaitApplyList urlStudyId={studyId} />
    </div>
  );
};
export default Page;
