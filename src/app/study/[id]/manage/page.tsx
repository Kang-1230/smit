"use client";

import { useParams } from "next/navigation";
import WaitApplyList from "../components/WaitApplyList";
import ManagedMemberList from "../components/ManagedMemberList";

const Page = () => {
  const paramsurl = useParams();
  const urlStudyId: string = Array.isArray(paramsurl.id)
    ? paramsurl.id[0]
    : paramsurl.id;

  console.log("url :", urlStudyId);
  return (
    <div>
      <div>
        <WaitApplyList urlStudyId={urlStudyId} />
      </div>
      <div>
        <ManagedMemberList urlStudyId={urlStudyId} />
      </div>
    </div>
  );
};

export default Page;
