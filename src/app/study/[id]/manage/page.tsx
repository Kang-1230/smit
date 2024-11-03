"use client";

import { useParams } from "next/navigation";
import WaitApplyList from "../components/WaitApplyList";
import ManagedMemberList from "../components/ManagedMemberList";
import { useState } from "react";

const Page = () => {
  const [updateTrigger, setUpdateTrigger] = useState(0);

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
        <ManagedMemberList
          urlStudyId={urlStudyId}
          key={updateTrigger}
          setUpdateTrigger={setUpdateTrigger}
        />
      </div>
    </div>
  );
};

export default Page;
