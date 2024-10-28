export const useGetStudy = (userId: string | undefined) => {
    return useQuery({
      queryKey: ["post", userId],
      queryFn: () => fetchPostByUser(userId),
      retry: 1,
      enabled: !!userId,
    });
  };