"use server";

import { createClient } from "@/utils/supabase/server";
import { Tables } from "../../database.types";
import browserClient from "@/utils/supabase/client";

export type PostWithRelations = Tables<"post"> & {
  study: Tables<"study">;
  user: Tables<"user">;
};

export type SortCategory = "최신순" | "인기순" | "댓글순";

export type StudyApplyList = Tables<"study_applylist">;

const sortByRanking = (posts: PostWithRelations[], topN = 6) => {
  return posts.sort((a, b) => b.like_count - a.like_count).slice(0, topN);
};

const sortByCreatedTime = (posts: PostWithRelations[]) => {
  return posts.sort(
    (a, b) => Number(b.post_createtime) - Number(a.post_createtime),
  );
};

const sortByComments = (posts: PostWithRelations[]) => {
  return posts.sort(
    (a, b) => Number(b.comment_count) - Number(a.comment_count),
  );
};

function filterByKeywords(data: PostWithRelations[], keywords: string[]) {
  return data.filter((item) =>
    keywords.every((keyword) => item.study.study_category.includes(keyword)),
  );
}

function filtredByCategory(data: PostWithRelations[], category: SortCategory) {
  if (category === "인기순") return sortByRanking(data, data.length);
  if (category === "최신순") return sortByCreatedTime(data);
  if (category === "댓글순") return sortByComments(data);
}

export async function fetchAllPostsClient(): Promise<PostWithRelations[]> {
  const { data: posts } = await browserClient
    .from("post")
    .select(`*, study(*), user(*)`);

  if (!posts) {
    throw new Error("Failed to retrieve posts");
  }

  return posts;
}

export async function fetchApplyStudyList(): Promise<StudyApplyList[]> {
  const { data } = await browserClient.from("study_applylist").select();

  if (!data) {
    throw new Error("Failed to retrieve data");
  }

  return data;
}

export async function fetchCategoryPosts(
  keywords: string[],
  category: SortCategory,
): Promise<PostWithRelations[]> {
  const posts = await fetchAllPostsClient();

  const filteredPosts = filterByKeywords(posts, keywords);
  return filtredByCategory(filteredPosts, category) || [];
}

export async function fetchAllPostsServer(): Promise<PostWithRelations[]> {
  const serverClient = createClient();
  const { data: posts } = await serverClient
    .from("post")
    .select(`*, study(*), user(*)`);

  if (!posts) {
    throw new Error("Failed to retrieve posts");
  }
  return posts;
}

export async function fetchFeaturedPosts() {
  const posts = await fetchAllPostsServer();
  return sortByRanking(posts);
}

export async function fetchRecentPosts() {
  const posts = await fetchAllPostsServer();
  return sortByCreatedTime(posts);
}

export async function fetchStudyApplyList(
  studyId: string,
): Promise<StudyApplyList[]> {
  const { data: posts } = await browserClient
    .from("study_applylist")
    .select(`*`)
    .eq("study_id", studyId);

  if (!posts) {
    throw new Error("Failed to retrieve posts");
  }

  return posts;
}

export async function fetchAllStudyByRanking(
  page = 1,
): Promise<Tables<"study">[]> {
  const serverClient = createClient();
  const { data: studys } = await serverClient
    .from("study")
    .select(`*`)
    .order("study_score", { ascending: false })
    .range(0, page * 15 - 1);

  if (!studys) {
    throw new Error("Failed to retrieve studys");
  }

  return studys;
}

export async function fetchByStudyId(id: string): Promise<Tables<"study">> {
  const serverClient = createClient();
  const { data: study } = await serverClient
    .from("study")
    .select(`*`)
    .eq("study_id", id);

  if (!study) {
    throw new Error("Failed to retrieve studys");
  }

  return study[0];
}
