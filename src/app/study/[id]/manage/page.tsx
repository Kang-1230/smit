"use client";

import { useParams } from "next/navigation";
import WaitApplyList from "../components/WaitApplyList";
import ManagedMemberList from "../components/ManagedMemberList";
import { useState } from "react";
import ManageOptions from "../components/ManageOptions";
import StudyImage from "../components/StudyImage";
import { Tables } from "../../../../../database.types";
import MyButton from "@/components/common/Button";
import StudyUpdate from "../components/StudyUpdate";

const Page = () => {
  const [updateTrigger, setUpdateTrigger] = useState(0);

  const paramsurl = useParams();
  const urlStudyId: string = Array.isArray(paramsurl.id)
    ? paramsurl.id[0]
    : paramsurl.id;

  const [study, setStudy] = useState<Tables<"study">>();
  const [isStudyMenu, setIsStudyMenu] = useState<boolean>(false);

  const updateStudy = () => {
    console.log(study);
  };

  return (
    <div>
      <StudyImage
        urlStudyId={urlStudyId}
        onConfirm={(data: Tables<"study">) => {
          setStudy(data);
        }}
      ></StudyImage>
      <ManageOptions
        onConfirm={(data: boolean) => {
          setIsStudyMenu(data);
        }}
      />

      {!isStudyMenu ? (
        <div>
          <WaitApplyList urlStudyId={urlStudyId} />
          <ManagedMemberList
            urlStudyId={urlStudyId}
            key={updateTrigger}
            setUpdateTrigger={setUpdateTrigger}
          />
          <div className="absolute bottom-[14px] w-full">
            <div className="mx-6 flex flex-row gap-x-1">
              <MyButton
                style="gray-2"
                size="lg"
                onClick={() => {
                  console.log("나가기 누른거맞니??");
                }}
              >
                나가기
              </MyButton>
              <MyButton
                size="lg"
                style="black-fill"
                className="w-full"
                onClick={() => {
                  console.log("적용하기 누른거맞니??");
                  // profileSaveHandler();
                  // modalClose();
                }}
              >
                적용하기
              </MyButton>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-4 flex w-full flex-col">
          <StudyUpdate
            urlStudyId={urlStudyId}
            onConfirm={(data: Tables<"study">) => {
              setStudy(data);
            }}
          ></StudyUpdate>
          <div className="mx-6 flex flex-row gap-x-1">
            <MyButton
              style="gray-2"
              size="lg"
              onClick={() => {
                console.log("나가기 누른거맞니??");
              }}
            >
              나가기
            </MyButton>
            <MyButton
              size="lg"
              style="black-fill"
              className="w-full"
              onClick={() => {
                console.log("적용하기 누른거맞니??");
                updateStudy();
                // modalClose();
              }}
            >
              적용하기
            </MyButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
