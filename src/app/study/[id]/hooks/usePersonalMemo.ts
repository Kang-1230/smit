import {
  getStudyMemoList,
  updateStudyMemo,
} from "@/utils/supabase/supabase-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// 스터디별 회고록 데이터 가져오기
export const useStudyMemo = (studyId: string) => {
  return useQuery({
    queryKey: ["personalMemo", studyId],
    queryFn: () => getStudyMemoList(studyId),
  });
};

// 회고록 내용 수정
export const useUpdateStudyMemo = (
  studyId: string,
  memoId: string,
  contents: string | null,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => updateStudyMemo(memoId, contents),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["personalMemo", studyId],
      });
    },
  });
};
