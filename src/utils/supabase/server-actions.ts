"use server";

import { Tables } from "../../../database.types";
import { createClient } from "./server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
