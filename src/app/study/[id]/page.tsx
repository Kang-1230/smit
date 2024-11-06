import WaitApplyList from "./components/WaitApplyList";
import GroupCalendar from "../components/GroupCalendar";
import PersonalMemos from "../components/PersonalMemos";
import {
  addAttendanceList,
  fetchStudyInfo,
} from "@/utils/supabase/supabase-server";
import { fetchStudyMember } from "@/utils/supabase/supabase-client";

import { getToday } from "@/utils/getTime";

import StudyInfo from "./components/StudyInfo";
import StudyStateBox from "./components/StudyStateBox";

const Page = async ({ params }: { params: { id: string } }) => {
  const studyId = params.id;
  const today = getToday(new Date());
  const study = await fetchStudyInfo(studyId);
  await addAttendanceList(studyId, today);
  const studyMember = await fetchStudyMember(studyId);

  return (
    <div className="flex w-full flex-col items-center overflow-x-hidden bg-secondary-800 px-6 pt-[64px] text-white">
      <StudyInfo study={study} member={studyMember} />
      <StudyStateBox
        studyId={studyId}
        member={studyMember}
        today={today}
        study={study}
      ></StudyStateBox>
      <GroupCalendar studyId={studyId} />
      <PersonalMemos studyId={studyId} />
      <WaitApplyList urlStudyId={studyId} />
    </div>
  );
};
export default Page;
