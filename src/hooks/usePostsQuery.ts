import {
  SortCategory,
  fetchApplyStudyList,
  fetchCategoryPosts,
} from "@/service/posts";
import { useQuery } from "@tanstack/react-query";

export const QUERY_KEYS = {
  POSTS: ["posts"],
  LIKES: ["posts", "apply"],
};

export function usePostsCategoryQuery(
  keywords: string[],
  category: SortCategory,
) {
  return useQuery({
    queryKey: QUERY_KEYS.POSTS,
    queryFn: () => fetchCategoryPosts(keywords, category),
  });
}

export function useApplyListQuery() {
  return useQuery({
    queryKey: QUERY_KEYS.LIKES,
    queryFn: () => fetchApplyStudyList(),
  });
}
