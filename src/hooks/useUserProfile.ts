import {
  fetchPostByUser,
  fetchPublicUser,
  fetchSessionData,
} from "@/utils/supabase/supabase-client";
import { User } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";

export const useSession = () => {
  return useQuery<User | null>({
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
