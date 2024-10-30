"use client";

import { useParams } from "next/navigation";
import WaitApplyList from "./components/WaitApplyList";
import GroupCalendar from "../components/GroupCalendar";

const Page = ({ params }: { params: { id: string } }) => {
  const paramsurl = useParams();
  const urlStudyId: string = Array.isArray(paramsurl.id)
    ? paramsurl.id[0]
    : params.id;

  console.log("url :", urlStudyId);

  return (
    <div>
      <GroupCalendar studyId={params.id} />
      <WaitApplyList urlStudyId={urlStudyId} />
    </div>
  );
};
export default Page;
