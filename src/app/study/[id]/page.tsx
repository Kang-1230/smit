"use client";

import { useParams } from "next/navigation";
import WaitApplyList from "./components/WaitApplyList";

const Page = () => {
  const params = useParams();
  const urlStudyId: string = Array.isArray(params.id)
    ? params.id[0]
    : params.id;

  console.log("url :", urlStudyId);

  return (
    <div>
      <WaitApplyList urlStudyId={urlStudyId} />
    </div>
  );
};

export default Page;
