"use client";
import { useStudyMember } from "@/hooks/useStudy";
import OpenStudyProfile from "./OpenStudyProfile";
import { Tables } from "../../../../../database.types";

const StudyPostInfo = ({
  postData,
  studyData,
}: {
  postData: Tables<"post">;
  studyData: Tables<"study">;
}) => {
  const { data: applyNumber } = useStudyMember(studyData.study_id);

  const changeDateForm = (dateString: string) => {
    return dateString.replaceAll("-", ".");
  };

  return (
    <div className="body-14-r mb-[27px] grid min-w-[327px] grid-cols-[82px_1fr] gap-y-3 rounded-lg bg-c-background p-5">
      <p className="text-secondary-400">모집 인원</p>
      <p>
        {applyNumber?.length} / {studyData.study_max_people}
      </p>
      <p className="text-secondary-400">시작 예정일</p>
      <p> {changeDateForm(postData.study_startday!)}</p>
      <p className="text-secondary-400">스터디 이름</p>
      <div className="flex items-center">
        <p> {studyData.study_name}</p>
        <OpenStudyProfile
          userId={postData.user_id}
          studyId={postData.study_id}
        />
      </div>
    </div>
  );
};

export default StudyPostInfo;
