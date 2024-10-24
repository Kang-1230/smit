import browserClient from "@/utils/supabase/client";
import { Tables } from "../../../database.types";

// 세션 정보 가져오기
export const fetchSessionData = async () => {
  const { data, error } = await browserClient.auth.getSession();

  if (!data.session) {
    console.error(error);
    return null;
  }

  return data.session.user;
};

// 퍼블릭 user 테이블 정보 가져오기
export const fetchPublicUser = async () => {
  const user = await fetchSessionData();
  if (!user) {
    throw new Error("로그인 상태가 아님");
  }

  const { data, error } = await browserClient
    .from("user")
    .select("*")
    .eq("id", user.id);

  if (!data || error) {
    console.log(error);
    throw new Error("사용자 정보를 불러오지 못했습니다.");
  }
  return data[0] as Tables<"user">;
};

// 프로필 업데이트
export const updateUserProfile = async (name: string, img: string) => {
  const user = await fetchSessionData();
  if (!user) {
    throw new Error("로그인 상태가 아님");
  }

  await browserClient
    .from("user")
    .update({ name: name, profile_img: img })
    .eq("id", user.id);
};

// 특정 사용자가 작성한 게시글 불러오기
export const fetchPostByUser = async (userId: string | undefined) => {
  const { data, error } = await browserClient
    .from("post")
    .select("*")
    .eq("user_id", userId);

  if (error || !data) {
    console.log(error);
    throw new Error("포스트 정보를 불러오지 못했습니다.");
  }
  return data as Tables<"post">[];
};

// 포스트 삭제
export const deletePost = async (postId: number) => {
  await browserClient.from("post").delete().eq("post_id", postId);
};

// 특정 유저가 좋아요 누른 포스트 id 가져오기
export const fetchLikedPostsByUser = async (userId: string | undefined) => {
  const { data: posts } = await browserClient
    .from("like")
    .select("*")
    .eq("like_user", userId);

  const postIds = posts?.map((post) => post.like_post);
  if (postIds) {
    const { data: likePosts } = await browserClient
      .from("post")
      .select("*")
      .in("post_id", postIds);

    return likePosts as Tables<"post">[];
  } else {
    return null;
  }
};

// 포스트의 좋아요 개수 계산을 위한 패치로직
export const fetchPostLikesCount = async (postId: number | undefined) => {
  const { data: posts } = await browserClient
    .from("like")
    .select("*")
    .eq("like_post", postId);

  return posts as Tables<"like">[];
};
