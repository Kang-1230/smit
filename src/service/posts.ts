import { createClient } from "@/utils/supabase/server";
import { Tables } from "../../database.types";

export type PostWithRelations = Tables<"post"> & {
  study: Tables<"study">;
  user: Tables<"user">;
};

export type StudyApplyList = Tables<"study_applylist">;

type LikeWithPost = Tables<"like"> & {
  post: Tables<"post">;
};

type PostLikesCount = {
  count: number;
  post: Tables<"post">;
};

const getTopPostsByLikes = (
  likes: LikeWithPost[],
  limit = 5,
): PostLikesCount[] => {
  const postLikeCounts = likes.reduce<Record<number, PostLikesCount>>(
    (acc, item) => {
      const postId = item.like_post;

      if (postId != null) {
        if (!acc[postId]) {
          acc[postId] = { count: 0, post: item.post };
        }
        acc[postId].count += 1;
      }

      return acc;
    },
    {},
  );

  return Object.values(postLikeCounts)
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
};

export const postApi = {
  async fetchAllPosts(): Promise<PostWithRelations[]> {
    const serverClient = createClient();
    const { data: posts } = await serverClient
      .from("post")
      .select(`*, study(*), user(*)`);

    if (!posts) {
      throw new Error("Failed to retrieve posts");
    }

    return posts;
  },

  async fetchFeaturedPosts(): Promise<Tables<"post">[]> {
    const serverClient = createClient();
    const { data: likes } = await serverClient
      .from("like")
      .select(`*, post(*)`);

    if (!likes) {
      throw new Error("Failed to retrieve likes");
    }

    const topPosts = getTopPostsByLikes(likes, 4);
    return topPosts.map((item) => item.post);
  },
};
