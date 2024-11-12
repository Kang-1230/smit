import browserClient from "@/utils/supabase/client";
import { Tables, TablesInsert, TablesUpdate } from "../../../database.types";
import { User } from "@supabase/supabase-js";
import {
  ApplyData,
  JoinPersonWithManager,
} from "@/app/study/components/MyStudyList";
import { MemoWithUser } from "@/types/PersonalMemo";

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
export const updateUserProfile = async (
  name: string,
  img: string,
  user: Tables<"user">,
) => {
  await browserClient
    .from("user")
    .update<TablesUpdate<"user">>({ name, profile_img: img })
    .eq("id", user.id);
};

export const updateDefualtImg = async (user: Tables<"user">) => {
  await browserClient
    .from("user")
    .update({
      profile_img:
        "https://nkzghifllapgjxacdfbr.supabase.co/storage/v1/object/public/profile_img/default?t=2024-11-08T07%3A23%3A01.617Z",
    })
    .eq("id", user.id);
};

// 스터디 생성 (insert)
export const insertStudy = async (
  title: string,
  studyCategory: string[],
  studyMaxPeople: number,
  userId: string | undefined,
  studyDescription: string,
  studyLink: string,
  imgUrl: string,
) => {
  const user = await fetchSessionData();
  if (!user) {
    throw new Error("로그인 상태가 아님");
  }

  const { error } = await browserClient.from("study").insert({
    study_name: title,
    study_category: studyCategory,
    study_max_people: studyMaxPeople,
    study_manager: userId,
    study_description: studyDescription,
    study_chaturl: studyLink,
    study_imgurl: imgUrl,
  });

  if (error) {
    console.log(error);
    throw new Error("스터디를 생성하지 못했어요.");
  }
};

// 특정 유저의 스터디 정보 가져오기
export const fetchUserStudyInfo = async (user_id: string | undefined) => {
  const { data, error } = await browserClient
    .from("study")
    .select("*")
    .eq("study_manager", user_id);

  if (error || !data) {
    console.log(error);
    return null;
  }
  return data as Tables<"study">[];
};

// 스터디 삭제 (delete)
export const deleteStudy = async (studyId: string) => {
  await browserClient.from("study").delete().eq("study_id", studyId);
};

// 스터디 업데이트 (update)
export const updateStudy = async (
  studyId: string,
  title: string,
  studyCategory: string[],
  studyMaxPeople: number,
  userId: string,
  studyDescription: string,
  studyLink: string,
) => {
  const user = await fetchSessionData();
  if (!user) {
    throw new Error("로그인 상태가 아님");
  }

  await browserClient
    .from("study")
    .update({
      study_name: title,
      study_category: studyCategory,
      study_max_people: studyMaxPeople,
      study_description: studyDescription,
      study_chaturl: studyLink,
    })
    .eq("study_id", studyId);
};

// 포스트 생성 (insert)
export const insertPostWrite = async (
  userId: string,
  studyId: string,
  contents: string,
  title: string,
  startDay: string,
) => {
  const user = await fetchSessionData();
  if (!user) {
    throw new Error("로그인 상태가 아님");
  }

  const { data, error } = await browserClient
    .from("post")
    .insert({
      user_id: userId,
      study_id: studyId,
      post_contents: contents,
      post_name: title,
      study_startday: startDay,
    })
    .select("post_id");

  if (error) {
    console.log(error);
    throw new Error("게시글 삽입 실패: " + error.message);
  }

  return data[0].post_id;
};

// 포스트 수정(Update)
export const updatePostWrite = async (
  userId: string,
  studyId: string,
  contents: string,
  title: string,
  startDay: string,
  post_id: number,
) => {
  const user = await fetchSessionData();
  if (!user) {
    throw new Error("로그인 상태가 아님");
  }

  const { error } = await browserClient
    .from("post")
    .update({
      user_id: userId,
      study_id: studyId,
      post_contents: contents,
      post_name: title,
      study_startday: startDay,
    })
    .eq("post_id", post_id);

  if (error) {
    console.log(error);
    throw new Error("모집글 수정 실패");
  }

  return post_id;
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
  const { data, error } = await browserClient
    .from("like")
    .select("*, post(*)")
    .eq("like_user", userId);

  if (error) {
    console.error("Error fetching liked posts:", error);
    return null;
  }

  return (data?.map((like) => like.post) as Tables<"post">[]) || null;
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
      .insert<TablesInsert<"like">>({ like_post: postId, like_user: user.id });
  }
};

// 스터디 신청 데이터 가져오기
export const getApplyStudyList = async (user: User | null) => {
  const { data, error } = await browserClient
    .from("study_applylist")
    .select("*,study(*)")
    .eq("user_id", user?.id)
    .eq("is_approved", false);
  if (!data || error) {
    throw new Error("스터디 신청 정보를 불러오지 못했습니다.");
  }
  return data as ApplyData[];
};

// post의 댓글 목록 가져오기
export const fetchDetailComments = async (postId: string) => {
  const { data, error } = await browserClient
    .from("comment")
    .select("*")
    .eq("post_id", postId)
    .order("comment_createtime", { ascending: false });
  if (!data || error) {
    throw new Error("댓글 정보를 불러오지 못했습니다.");
  }
  return data as Tables<"comment">[];
};

// 모집 상세페이지 댓글 추가
export const addPostComment = async (data: {
  id: string;
  commentItem: string;
  parentId?: string;
}) => {
  const user = await fetchSessionData();
  if (!user) {
    throw new Error("로그인 상태가 아님");
  }

  const { error } = await browserClient.from("comment").insert({
    post_id: +data.id,
    user_id: user?.id,
    comment_contents: data.commentItem,
    parent_id: data.parentId ?? null,
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

// 답글이 존재하는 부모댓글 삭제시 삭제상태로 변경
export const updateStateToDelete = async (
  comment_id: string,
  postId: string,
) => {
  // comment 테이블 업데이트
  const { error: commentError } = await browserClient
    .from("comment")
    .update({
      is_deleted: true,
    })
    .eq("comment_id", comment_id);

  if (commentError) {
    throw new Error("삭제 상태 변경에 실패했습니다.");
  }

  // 현재 comment_count 조회
  const { data: post } = await browserClient
    .from("post")
    .select("comment_count")
    .eq("post_id", postId)
    .single();

  if (!post) {
    throw new Error("댓글을 찾을 수 없습니다.");
  }

  // post 테이블의 comment_count 감소
  const { error: postError } = await browserClient
    .from("post")
    .update({
      comment_count: post.comment_count - 1,
    })
    .eq("post_id", postId);

  if (postError) {
    throw new Error("댓글 카운트 감소에 실패했습니다.");
  }
};

// 스터디 신청하기
export const applyNewStudy = async (studyId: string, message: string) => {
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
    apply_message: message,
  });
  alert("신청되었습니다!");

  if (error) {
    throw new Error("스터디 신청에 실패했습니다.");
  }
};

// 가입된 데이터 가져오기
export const getJoinedStudyList = async (user: User | null) => {
  const { data, error } = await browserClient
    .from("study_applylist")
    .select("*,study(*)")
    .eq("user_id", user?.id)
    .eq("is_approved", true);
  if (!data || error) {
    throw new Error("스터디 가입 정보를 불러오지 못했습니다.");
  }
  return data as ApplyData[];
};

//스터디 신청 취소(삭제)
export const deleteApplyStudy = async (studyId: string) => {
  const { error } = await browserClient
    .from("study_applylist")
    .delete()
    .eq("study_id", studyId);
  alert("신청이 취소되었습니다!");
  if (error) {
    throw new Error("스터디 신청 취소에 실패했습니다.");
  }
};

//스터디에 가입한 사람들(매니저 추가) 목록 불러오기
export const getJoinedStudyPeopleList = async (study_id: string) => {
  const { data, error } = await browserClient
    .from("study_applylist")
    .select(`*, user : user_id(*), study(*)`)
    .eq("study_id", encodeURIComponent(study_id))
    .eq("is_approved", true);
  if (!data || error) {
    throw new Error("가입한 사람들을 불러오지 못했습니다.");
  } else if (data) {
    console.log("가입한 사람들 목록", data);

    return data as JoinPersonWithManager[];
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

// 좋아요 누른 포스트의 스터디 정보
export const fetchStudyByPost = async (studyId: string) => {
  const { data, error } = await browserClient
    .from("study")
    .select("*")
    .eq("study_id", studyId);

  if (error) {
    console.error(error);
    return null;
  }

  if (!data) {
    return null;
  }

  return data[0] as Tables<"study">;
};

// 현재 스터디 참여중인 인원 가져오기
export const fetchStudyMember = async (studyId: string) => {
  const { data, error } = await browserClient
    .from("study_applylist")
    .select("user_id")
    .eq("study_id", studyId)
    .eq("is_approved", true);

  const { data: manager, error: managerError } = await browserClient
    .from("study")
    .select("study_manager")
    .eq("study_id", studyId)
    .single();

  if (error || managerError) {
    console.error(error);
    return null;
  }

  if (!data || !manager) {
    return null;
  }

  return [...data.map((d) => d.user_id), manager.study_manager] as string[];
};

// 회원 탈퇴 라우트 핸들러 사용
export const deleteUser = async () => {
  const res = await fetch("/api/delete-user", {
    method: "DELETE",
  });
  const data = await res.json();

  if (res.ok) {
    console.log(data.message);
  } else {
    console.error(data.error);
  }
};

// 캘린더 일정 정보 가져오기 (날짜별)
export const fetchCalenderEvent = async (
  studyId: string,
  eventDate: string,
) => {
  const { data, error } = await browserClient
    .from("calendar")
    .select("*")
    .eq("study_id", studyId)
    .eq("event_date", eventDate)
    .order("start_time", { ascending: true });
  if (!data || error) {
    throw new Error("일정 정보를 불러오지 못했습니다.");
  }
  return data as Tables<"calendar">[];
};

// 캘린더 일정 정보 가져오기 (스터디별)
export const fetchCalenderEventByStudy = async (studyId: string) => {
  const { data, error } = await browserClient
    .from("calendar")
    .select("*")
    .eq("study_id", studyId);
  if (!data || error) {
    throw new Error("일정 정보를 불러오지 못했습니다.");
  }
  return data as Tables<"calendar">[];
};

// 캘린더 일정 등록
export const addCalenderEvent = async (data: {
  studyId: string;
  eventDate: string;
  eventDescription: string;
  eventStart: string;
  eventEnd: string;
}) => {
  const user = await fetchSessionData();
  if (!user) {
    throw new Error("로그인 상태가 아님");
  }
  const { error } = await browserClient.from("calendar").insert({
    user_id: user?.id,
    study_id: data.studyId,
    event_date: data.eventDate,
    event_description: data.eventDescription,
    start_time: data.eventStart,
    end_time: data.eventEnd,
  });
  if (error) {
    throw new Error("일정 등록에 실패했습니다.");
  }
};

// 캘린더 일정 삭제
export const deleteCalenderEvent = async (calendarId: string) => {
  const { error } = await browserClient
    .from("calendar")
    .delete()
    .eq("calendar_id", calendarId);
  if (error) {
    throw new Error("일정 삭제에 실패했습니다.");
  }
};

// 캘린더 일정 수정
export const updateCalendarEvent = async (
  calendarId: string | undefined,
  description: string,
  eventStart: string,
  eventEnd: string,
) => {
  const { error } = await browserClient
    .from("calendar")
    .update({
      event_description: description,
      start_time: eventStart,
      end_time: eventEnd,
    })
    .eq("calendar_id", calendarId);
  if (error) {
    throw new Error("일정 수정에 실패했습니다.");
  }
};

// 현재 일정의 유저 타이머 조회
export const fetchTimer = async (
  userId: string | undefined,
  currentSchedule: Tables<"calendar"> | null,
  studyId: string,
  today: string,
) => {
  if (!userId || !currentSchedule) return null;

  const { data: timer } = await browserClient
    .from("timer")
    .select("*")
    .eq("study_id", studyId)
    .eq("user_id", userId)
    .eq("date", today)
    .eq("calendar_id", currentSchedule.calendar_id)
    .single();

  if (timer) return timer;

  // 타이머가 없으면 새로 생성
  const { data: newTimer } = await browserClient
    .from("timer")
    .insert({
      study_id: studyId,
      user_id: userId,
      accumulated_time: 0,
      is_running: false,
      date: today,
      calendar_id: currentSchedule.calendar_id,
    })
    .select()
    .single();

  return newTimer;
};

// 스터디 회고록 데이터, 멤버정보(닉네임) 불러오기
export const getStudyMemoList = async (studyId: string) => {
  const { data, error } = await browserClient
    .from("study_personal_memo")
    .select(
      `
      *,
      user!study_personal_memo_user_id_fkey (
        name
      )
    `,
    )
    .eq("study_id", studyId);

  if (!data || error) {
    throw new Error("스터디 회고록 데이터를 불러오지 못했습니다.");
  }
  return data as MemoWithUser[];
};

// 스터디 회고록 내용 수정
export const updateStudyMemo = async (
  memoId: string,
  contents: string | null,
) => {
  const { error } = await browserClient
    .from("study_personal_memo")
    .update({
      memo_content: contents,
    })
    .eq("memo_id", memoId);
  if (error) {
    console.log(error);
    throw new Error("일정 수정에 실패했습니다.");
  }
};

// 오늘 출석한 사람 몇명인지 가져오기
export const fetchAttendanceRate = async (studyId: string, today: string) => {
  const { data }: { data: Tables<"attendance_list">[] | null } =
    await browserClient
      .from("attendance_list")
      .select("*")
      .eq("study_id", studyId)
      .eq("date", today);

  if (!data) {
    return 0;
  } else {
    return data.length;
  }
};
