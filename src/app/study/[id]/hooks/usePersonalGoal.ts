import {
  deleteStudyGoal,
  getStudyGoalList,
  insertStudyGoal,
  updateStudyGoal,
} from "@/utils/supabase/supabase-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// 스터디 개인 학습 목표 삭제
export const useDeleteStudyGoalMutation = (
  studyId: string,
  userId: string | undefined,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteStudyGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["studyGoal", studyId, userId], // 동일한 queryKey 사용
      });
    },
  });
};

// 스터디 개인 학습 목표 추가를 위한 Mutation 훅
export const useInsertStudyGoalMutation = (
  studyId: string,
  userId: string | undefined,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (goalName: string) => insertStudyGoal(studyId, goalName), // goalName을 인자로 받아 insertStudyGoal 호출
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["studyGoal", studyId, userId], // 동일한 queryKey 사용
      });
    },
  });
};

// 스터디 개인 학습 목표 수정
export const useUpdateStudyGoal = (
  studyId: string,
  userId: string | undefined,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      goalId,
      goalName,
      isSuccess,
    }: {
      goalId: number;
      goalName?: string;
      isSuccess?: boolean;
    }) => updateStudyGoal(goalId, goalName, isSuccess),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["studyGoal", studyId, userId], // 동일한 queryKey 사용
      });
    },
  });
};

// 스터디 개인 학습 목표 데이터 가져오기
export const useStudyGoal = (studyId: string, userId: string | undefined) => {
  return useQuery({
    queryKey: ["studyGoal", studyId, userId],
    queryFn: () => getStudyGoalList(studyId, userId),
    retry: 1,
    enabled: !!userId,
  });
};
