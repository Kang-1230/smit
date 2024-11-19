"use server";

import { fetchStudyMember } from "@/utils/supabase/supabase-client";
import { fetchStudyInfo } from "@/utils/supabase/supabase-server";

// 스터디 모집마감 여부 확인
export const checkStudyFull = async (studyId: string): Promise<boolean> => {
  try {
    const [members, studyData] = await Promise.all([
      fetchStudyMember(studyId),
      fetchStudyInfo(studyId),
    ]);
    const applyNumber = members?.length ?? 0;

    return applyNumber >= (studyData?.study_max_people ?? 0);
  } catch (error) {
    console.error("모집마감 확인 중 오류 발생", error);
    throw new Error("정보 가져오기 실패");
  }
};
