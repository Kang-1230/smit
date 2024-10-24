import {
  fetchPostByUser,
  fetchPublicUser,
  fetchSessionData,
} from "@/utils/supabase/supabase-client";
import { useQuery } from "@tanstack/react-query";

export const useSession = () => {
  return useQuery({
    queryKey: ["user", "session"],
    queryFn: () => fetchSessionData(),
  });
};

export const usePublicUser = () => {
  return useQuery({
    queryKey: ["user", "public"],
    queryFn: () => fetchPublicUser(),
    retry: 0,
  });
};

export const usePostByUser = (userId: string | undefined) => {
  return useQuery({
    queryKey: ["post", userId],
    queryFn: () => fetchPostByUser(userId),
    retry: 1,
    enabled: !!userId,
  });
};

export const useStudyByPost = (postId: string) => {
  return useQuery({
    queryKey: ["study", postId],
    queryFn: () => {},
  });
};
