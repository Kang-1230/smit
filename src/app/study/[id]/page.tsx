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
import BackButton from "@/components/common/BackButton";

const Page = async ({ params }: { params: { id: string } }) => {
  const studyId = params.id;
  const today = getToday(new Date());
  const study = await fetchStudyInfo(studyId);
  await addAttendanceList(studyId, today);
  const studyMember = await fetchStudyMember(studyId);

  return (
    <div className="w-full xl:mx-auto xl:max-w-[1280px]">
      <BackButton className="ml-6 mt-[10px]" />
      <div className="flex w-full flex-col items-center overflow-x-hidden bg-secondary-800 px-6 pt-[64px] text-white">
        <StudyInfo study={study} member={studyMember} />
        <main className="w-full xl:grid xl:grid-rows-[402px_474px] xl:gap-y-[24px]">
          <StudyStateBox
            studyId={studyId}
            member={studyMember}
            today={today}
            study={study}
          />
          <section className="xl:grid xl:grid-cols-3 xl:gap-x-6">
            <div className="hidden xl:block">Daily Planner</div>
            <GroupCalendar studyId={studyId} />
            <PersonalMemos studyId={studyId} />
          </section>
        </main>
      </div>
    </div>
  );
};
export default Page;
