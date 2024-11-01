import {
  deleteApplyStudy,
  getApplyStudyList,
  getJoinedStudyList,
} from "@/utils/supabase/supabase-client";
import { User } from "@supabase/supabase-js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

//내가 신청한 스터디 중 승인 안 된 스터디 불러오기
export const useGetApplyStudyList = (user: User | null) => {
  return useQuery({
    queryKey: ["study_apply", user?.id],
    queryFn: () => getApplyStudyList(user),
  });
};

//스터디 신청 취소 기능
export const useDeleteApplyStudy = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (studyId: string) => deleteApplyStudy(studyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["study_apply"] });
    },
  });
};

//내가 가입한 스터디 불러오기
export const useGetJoinedStudyList = (user: User | null) => {
  return useQuery({
    queryKey: ["study_join", user?.id],
    queryFn: () => getJoinedStudyList(user),
  });
};
