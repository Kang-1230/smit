import { fetchPublicUser } from "@/utils/supabase/client-actions";
import { useQuery } from "@tanstack/react-query";

export const usePublicUser = () => {
  return useQuery({
    queryKey: ["user", "public"],
    queryFn: () => fetchPublicUser(),
    retry: 0,
  });
};
