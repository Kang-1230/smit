"use server";

import { Post, SupabasePost, camelizePost } from "@/types/posts";
import { SearchQueryParams } from "@/types/search";
import { createClient } from "@/utils/supabase/server";

export async function getFeaturedPosts() {
  let result: Post[];

  const serverClient = createClient();
  const { data } = await serverClient
    .from("post")
    .select(`*, study(*), user(name)`)
    .order("like_count", { ascending: false })
    .limit(5);

  result = await Promise.all(
    data!.map(async (product) => {
      const joinCnt = await getStudyParticipantsCount(product.study.sutdy_id);
      return camelizePost(product as SupabasePost, joinCnt);
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
