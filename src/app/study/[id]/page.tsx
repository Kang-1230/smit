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
import CalendarModal from "./components/CalendarModal";
import { StudyGroupParams } from "@/types/studys";

const Page = async ({ params, searchParams }: StudyGroupParams) => {
  const studyId = params.id;
  const today = getToday(new Date());
  const study = await fetchStudyInfo(studyId);
  await addAttendanceList(studyId, today);
  const studyMember = await fetchStudyMember(studyId);
  console.log("searchParams.modal", searchParams.modal);

  return (
    <div
      className={`md:mx-auto md:max-w-[1280px] md:px-[24px] ${searchParams.modal && "h-screen overflow-hidden xl:overflow-visible"}`}
    >
      <div className="xl:hidden">
        <BackButton className="ml-6 mt-[10px]" studyId={studyId} />
      </div>
      <div className="flex w-full flex-col items-center bg-secondary-800 px-6 pt-[64px] text-white xl:relative">
        <StudyInfo study={study} member={studyMember} />
        <main className="xl:grid xl:grid-rows-[402px_474px] xl:gap-y-6">
          <StudyStateBox
            studyId={studyId}
            member={studyMember}
            today={today}
            study={study}
          ></StudyStateBox>
          <section className="xl:grid xl:grid-cols-[388px_408px_388px] xl:gap-x-6">
            <div className="hidden xl:block">Daily Planner</div>
            <GroupCalendar studyId={studyId} />
            <PersonalMemos studyId={studyId} />
          </section>
        </main>
        <CalendarModal
          studyData={study}
          studyId={studyId}
          selectedDate={searchParams.date}
          isModalOpen={searchParams.modal === "calendar"}
        />
      </div>
    </div>
  );
};
export default Page;
