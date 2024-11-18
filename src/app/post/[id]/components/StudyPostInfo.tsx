"use client";
import { useStudyMember } from "@/hooks/useStudy";
import OpenStudyProfile from "./OpenStudyProfile";
import { Tables } from "../../../../../database.types";
import { formatDate } from "@/utils/convertDate";

const StudyPostInfo = ({
  postData,
  studyData,
}: {
  postData: Tables<"post">;
  studyData: Tables<"study">;
}) => {
  const { data: applyNumber } = useStudyMember(studyData.study_id);

  return (
    <div className="body-14-r mb-[27px] grid w-full min-w-0 grid-cols-[82px_minmax(0,1fr)] gap-y-3 rounded-lg bg-c-background p-5 xl:h-[130px]">
      <p className="text-secondary-400">모집 인원</p>
      <p>
        {applyNumber?.length} / {studyData.study_max_people}
      </p>
      <p className="text-secondary-400">시작 예정일</p>
      <p> {formatDate(postData.study_startday!)}</p>
      <p className="text-secondary-400">스터디 이름</p>
      <div className="flex items-center gap-[3px]">
        <p className="min-w-0 truncate">{studyData.study_name}</p>
        <OpenStudyProfile studyId={postData.study_id} />
      </div>
    </div>
  );
};

export default StudyPostInfo;
