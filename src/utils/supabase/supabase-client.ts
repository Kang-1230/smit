import browserClient from "@/utils/supabase/client";
import { Tables } from "../../../database.types";
import { User } from "@supabase/supabase-js";

// 세션 정보 가져오기
export const fetchSessionData = async () => {
  const { data, error } = await browserClient.auth.getSession();

  if (error) {
    console.error("Session fetch error:", error);
    return null;
  }

  // session이 없는 것은 정상적인 상태일 수 있음
  if (!data.session) {
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

// 스터디 생성 (insert)
export const insertStudy = async (name: string, img: string) => {
  const user = await fetchSessionData();
  if (!user) {
    throw new Error("로그인 상태가 아님");
  }

  await browserClient
    .from("user")
    .update({ name: name, profile_img: img })
    .eq("id", user.id);
};

// 스터디 삭제 (insert)
export const deleteStudy = async (studyId : string) => {
  await browserClient
    .from("study")
    .delete()
    .eq("study_id", studyId)
};


// 모집글 생성 (insert)
export const insertPostWrite = async (name: string, img: string) => {
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

// 특정 유저가 좋아요 누른 포스트 가져오기
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

// 특정 포스트를 좋아요 누른 유저 가져오기
export const fetchPostLikers = async (postId: number | undefined) => {
  const { data: posts } = await browserClient
    .from("like")
    .select("*")
    .eq("like_post", postId);

  return posts as Tables<"like">[];
};

// 좋아요를 누르고 취소하는 로직
export const toggleLike = async (
  user: User | null,
  isLike: boolean,
  postId: number,
) => {
  if (!user) {
    throw new Error("유저를 찾을 수 없습니다.");
  }
  if (isLike) {
    await browserClient
      .from("like")
      .delete()
      .eq("like_user", user.id)
      .eq("like_post", postId);
  } else {
    await browserClient
      .from("like")
      .insert({ like_post: postId, like_user: user.id });
  }
};

// post의 댓글 목록 가져오기
export const fetchDetailComments = async (id: string) => {
  const { data, error } = await browserClient
    .from("comment")
    .select("*")
    .eq("post_id", id);
  if (!data || error) {
    throw new Error("댓글 정보를 불러오지 못했습니다.");
  }
  return data as Tables<"comment">[];
};

// 모집 상세페이지 댓글 추가
export const addPostComment = async (data: {
  id: string;
  commentItem: string;
}) => {
  const user = await fetchSessionData();
  const { error } = await browserClient.from("comment").insert({
    post_id: +data.id,
    user_id: user?.id,
    comment_contents: data.commentItem,
  });
  if (error) {
    throw new Error("댓글 입력에 실패했습니다.");
  }
};

// 모집 상세페이지 댓글 삭제
export const deletePostComment = async (comment_id: string) => {
  const { error } = await browserClient
    .from("comment")
    .delete()
    .eq("comment_id", comment_id);
  alert("댓글이 삭제되었습니다!");
  if (error) {
    throw new Error("댓글 삭제에 실패했습니다.");
  }
};

// 모집 상세페이지 댓글 수정
export const updatePostComment = async (
  comment_id: string,
  content: string,
  updatedAt: string,
) => {
  if (!content) return alert("수정할 내용을 입력해주세요!");
  const { error } = await browserClient
    .from("comment")
    .update({
      comment_contents: content,
      comment_updatetime: updatedAt,
    })
    .eq("comment_id", comment_id);
  if (error) {
    throw new Error("댓글 수정에 실패했습니다.");
  }
};

// 스터디 신청하기
export const applyNewStudy = async (studyId: string) => {
  const user = await fetchSessionData();
  const res = await browserClient
    .from("study_applylist")
    .select("*")
    .eq("study_id", studyId);
  if (res.error !== null) return;

  const applyData: Tables<"study_applylist">[] = res.data;
  const findInfo = applyData.filter((data) => data.user_id === user?.id);
  if (findInfo.length > 0) return alert("이미 신청한 스터디입니다!");

  const { error } = await browserClient.from("study_applylist").insert({
    user_id: user?.id,
    study_id: studyId,
    is_approved: false,
  });
  alert("신청되었습니다!");

  if (error) {
    throw new Error("스터디 신청에 실패했습니다.");
  }
};

// 모집글 삭제
export const deleteMyPost = async (post_id: string) => {
  const { error } = await browserClient
    .from("post")
    .delete()
    .eq("post_id", post_id);
  alert("삭제되었습니다!");
  if (error) {
    throw new Error("모집글 삭제에 실패했습니다.");
  }
};

// 댓글 작성한 유저 정보
export const getUserByCommentId = async (user_id: string) => {
  const { data, error } = await browserClient
    .from("user")
    .select("*")
    .eq("id", user_id);

  if (!data || error) {
    console.log(error);
    throw new Error("사용자 정보를 불러오지 못했습니다.");
  }
  return data[0] as Tables<"user">;
};
