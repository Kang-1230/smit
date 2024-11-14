"use client";

import { useParams } from "next/navigation";
import WaitApplyList from "../components/WaitApplyList";
import ManagedMemberList from "../components/ManagedMemberList";
import { useState } from "react";
import ManageOptions from "../components/ManageOptions";
import StudyImage from "../components/StudyImage";

const Page = () => {
  const [updateTrigger, setUpdateTrigger] = useState(0);

  const paramsurl = useParams();
  const urlStudyId: string = Array.isArray(paramsurl.id)
    ? paramsurl.id[0]
    : paramsurl.id;

  return (
    <div>
      <StudyImage urlStudyId={urlStudyId}></StudyImage>
      <ManageOptions />
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
      <div className="border-t px-6 py-[14px]">
        <button className="title-20-s w-full rounded-[24px] bg-secondary-900 px-5 py-3 text-white">
          적용하기
        </button>
      </div>
    </div>
  );
};

export default Page;
