import WaitApplyList from "./components/WaitApplyList";
import GroupCalendar from "../components/GroupCalendar";
import PersonalMemos from "../components/PersonalMemos";
import {
  addAttendanceList,
  fetchStudyInfo,
  getUser,
} from "@/utils/supabase/supabase-server";
import { fetchStudyMember } from "@/utils/supabase/supabase-client";

import { getToday } from "@/utils/getTime";
import TimerTimer from "./components/Timer";

import StudyInfo from "./components/StudyInfo";
import StudyStateBox from "./components/StudyStateBox";

const Page = async ({ params }: { params: { id: string } }) => {
  const studyId = params.id;
  const today = getToday(new Date());
  const study = await fetchStudyInfo(studyId);
  await addAttendanceList(studyId, today);
  const studyMember = await fetchStudyMember(studyId);

  console.log(studyMember);

  return (
    <div className="flex flex-col items-center px-6 w-full bg-secondary-800 pt-[64px] text-white overflow-x-hidden">
      <StudyInfo study={study} member={studyMember} />
      <StudyStateBox
        studyId={studyId}
        member={studyMember}
        today={today}
        study={study}
      >
        <GroupCalendar studyId={studyId} />
        <TimerTimer studyId={studyId} />
      </StudyStateBox>
      <PersonalMemos studyId={studyId} />
      <WaitApplyList urlStudyId={studyId} />
    </div>
  );
};
export default Page;
