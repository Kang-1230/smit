"use client";

import { useParams } from "next/navigation";
import WaitApplyList from "./components/WaitApplyList";
import GroupCalendar from "../components/GroupCalendar";
import TimerTimer from "@/app/mypage/components/Timer";
import StudyInfo from "./components/StudyInfo";

const Page = ({ params }: { params: { id: string } }) => {
  const paramsurl = useParams();
  const urlStudyId: string = Array.isArray(paramsurl.id)
    ? paramsurl.id[0]
    : params.id;

  console.log("url :", urlStudyId);

  return (
    <div>
      <StudyInfo studyId={urlStudyId} />
      <TimerTimer studyId={urlStudyId} />
      <GroupCalendar studyId={params.id} />
      <WaitApplyList urlStudyId={urlStudyId} />
    </div>
  );
};
export default Page;
