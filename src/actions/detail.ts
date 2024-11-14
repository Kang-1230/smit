"use server";

import {
  fetchStudyApplyList,
  fetchStudyInfo,
} from "@/utils/supabase/supabase-server";

// 스터디 신청인원
export const getApplylist = async (studyId: string) => {
  const applyData = await fetchStudyApplyList(studyId);
  const applyNumber =
    applyData?.filter((apply) => apply.is_approved).length ?? 0;
  if (!applyData) {
    throw new Error("신청 리스트 가져오기 실패");
  }
  return applyNumber;
};

// 스터디 모집마감 여부 확인
export const checkStudyFull = async (studyId: string): Promise<boolean> => {
  try {
    const applyNumber = await getApplylist(studyId);
    const studyData = await fetchStudyInfo(studyId);
    return applyNumber >= (studyData?.study_max_people ?? 0) - 1;
  } catch (error) {
    console.error("모집마감 확인 중 오류 발생", error);
    throw new Error("정보 가져오기 실패");
  }
};
