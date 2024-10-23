"use server";

import { Tables } from "../../../database.types";
import { createClient } from "./server";

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
