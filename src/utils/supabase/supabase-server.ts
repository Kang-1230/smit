"use server";

import { Tables } from "../../../database.types";
import { createClient } from "./server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const getUser = async () => {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    console.error(error);
    return null;
  }

  return user;
};

//로그인 함수
export async function login(formData: FormData) {
  const supabase = createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

//회원가입 함수
export async function signup(formData: FormData) {
  const supabase = createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

//로그아웃 함수
export async function signout() {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log("signout error");
    redirect("/error");
  }
}

export const getIsLogin = async () => {
  const serverClient = createClient();
  const {
    data: { session },
  } = await serverClient.auth.getSession();
  return !!session;
};

export const fetchUserPosts = async (id: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("post")
    .select("*")
    .eq("user_id", id);

  if (error || !data) {
    console.log(error);
    return null;
  }

  return data as Tables<`post`>[];
};

// 유저 정보 가져오기 - 서버컴포넌트 사용
export const fetchUserInfo = async (user_id: string) => {
  const serverClient = createClient();
  const { data, error } = await serverClient
    .from("user")
    .select("*")
    .eq("id", user_id);
  if (error || !data) {
    console.log(error);
    return null;
  }
  return data[0] as Tables<"user">;
};

// post 정보 가져오기
export const fetchPostInfo = async (id: string) => {
  const serverClient = createClient();
  const { data, error } = await serverClient
    .from("post")
    .select("*")
    .eq("post_id", id);
  if (error || !data) {
    console.log(error);
    return null;
  }

  return data[0] as Tables<"post">;
};

// study 정보 가져오기
export const fetchStudyInfo = async (study_id: string) => {
  const serverClient = createClient();
  const { data, error } = await serverClient
    .from("study")
    .select("*")
    .eq("study_id", study_id);
  if (error || !data) {
    console.log(error);
    return null;
  }
  return data[0] as Tables<"study">;
};

// 스터디 신청리스트 가져오기
export const fetchStudyApplyList = async (study_id: string) => {
  const serverClient = createClient();
  const { data, error } = await serverClient
    .from("study_applylist")
    .select("*")
    .eq("study_id", study_id);
  if (error || !data) {
    console.log(error);
    return null;
  }
  return data as Tables<"study_applylist">[];
};
