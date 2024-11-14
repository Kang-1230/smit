import {
  fetchStudyByPost,
  fetchStudyMember,
} from "@/utils/supabase/supabase-client";
import { useQuery } from "@tanstack/react-query";

export const useStudyByPost = (postId: string) => {
  return useQuery({
    queryKey: ["study", postId],
    queryFn: () => fetchStudyByPost(postId),
    enabled: !!postId,
  });
};

export const useStudyMember = (studyId: string) => {
  return useQuery({
    queryKey: ["member", studyId],
    queryFn: () => fetchStudyMember(studyId),
    enabled: !!studyId,
  });
};
