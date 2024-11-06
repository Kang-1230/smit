import WaitApplyList from "./components/WaitApplyList";
import GroupCalendar from "../components/GroupCalendar";
import PersonalMemos from "../components/PersonalMemos";
import { addAttendanceList } from "@/utils/supabase/supabase-server";
import { fetchStudyMember } from "@/utils/supabase/supabase-client";

import AttendanceRate from "./components/AttendanceRate";
import { getToday } from "@/utils/getTime";
import TimerTimer from "./components/Timer";
import RateGroupBox from "./components/RateGroupBox";
import StudyInfo from "./components/StudyInfo";

const Page = async ({ params }: { params: { id: string } }) => {
  const studyId = params.id;
  const today = getToday(new Date());
  await addAttendanceList(studyId, today);
  const studyMember = await fetchStudyMember(studyId);

  return (
    <div className="flex flex-col items-center px-6 w-full bg-secondary-800">
      <StudyInfo studyId={studyId} />
      <TimerTimer studyId={studyId} />
      <RateGroupBox member={studyMember} studyId={studyId} today={today}>
        <AttendanceRate studyId={studyId} member={studyMember} today={today} />
      </RateGroupBox>
      <GroupCalendar studyId={studyId} />
      <PersonalMemos studyId={studyId} />
      <WaitApplyList urlStudyId={studyId} />
    </div>
  );
};
export default Page;
