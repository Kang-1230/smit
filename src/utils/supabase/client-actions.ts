import browserClient from "@/utils/supabase/client";
import { Tables } from "../../../database.types";

export const fetchSessionData = async () => {
  const { data, error } = await browserClient.auth.getSession();

  if (!data.session) {
    console.error(error);
    return null;
  }

  return data.session.user;
};

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
