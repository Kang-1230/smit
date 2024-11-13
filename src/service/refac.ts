"use server";

import { Post, SupabasePost, camelizePost } from "@/types/posts";
import { SearchQueryParams } from "@/types/search";
import { Study, SupabaseStudy, camelizeStudy } from "@/types/studys";
import { filterPostsBySearch, sortPostsByCategory } from "@/utils/sorting";
import { createClient } from "@/utils/supabase/server";

export async function getPosts({
  search = "",
  category = "최신순",
}: Partial<SearchQueryParams>) {
  let result: Post[];

  const serverClient = createClient();
  const { data } = await serverClient
    .from("post")
    .select(`*, study(*), user(name)`)
    .order("post_createtime", { ascending: false });

  if (!data) {
    return { data: [] };
  }

  result = await Promise.all(
    data!.map(async (post) => {
      const joinCnt = await getStudyParticipantsCount(post.study.sutdy_id);
      return camelizePost(post as SupabasePost, joinCnt);
    }),
  );

  result = filterPostsBySearch(result, search);

  result = sortPostsByCategory(result, category);

  return { data: result };
}

// 인기 포스트
export async function getFeaturedPosts() {
  let result: Post[];

  const serverClient = createClient();
  const { data } = await serverClient
    .from("post")
    .select(`*, study(*), user(name)`)
    .order("like_count", { ascending: false })
    .limit(5);

  result = await Promise.all(
    data!.map(async (post) => {
      const joinCnt = await getStudyParticipantsCount(post.study.sutdy_id);
      return camelizePost(post as SupabasePost, joinCnt);
    }),
  );

  return { data: result };
}

//study_id를 받으면 해당 스터디에 현재 참여중인 인원이 몇명인지 조회
export async function getStudyParticipantsCount(
  studyId: string,
): Promise<number> {
  const serverClient = createClient();
  const { data } = await serverClient
    .from("study_applylist")
    .select()
    .eq("study_id", studyId)
    .eq("is_approved", true);

  if (!data) return 0;

  return data?.length;
}

// postId와 그 유저가 게시물을 눌렀는지 안눌렀는지 조회
export async function getLike() {}

// - study -
export async function getStudys(page = 1) {
  const pageSize = 5;
  let result: Study[];

  const serverClient = createClient();
  const { data } = await serverClient
    .from("study")
    .select(`*`)
    .order("study_score", { ascending: false })
    .range((page - 1) * pageSize, page * pageSize);

  if (!data) result = [];

  result = data!
    .slice(0, pageSize)
    .map((study, idx) =>
      camelizeStudy(study as SupabaseStudy, (page - 1) * pageSize + idx + 1),
    );

  const hasMore = data!.length > pageSize;

  return { data: result, hasMore, page };
}
