import { Tables } from "../../database.types";

type PostFields = Tables<"post">;
type StudyFields = Tables<"study">;
type UserFields = Pick<Tables<"user">, "name">;

export type SupabasePost = PostFields & {
  study: StudyFields;
  user: UserFields;
};

export type Post = {
  id: number;
  title: string;
  likes: number;
  comments: number;
  createdAt: string;
  study: {
    id: string;
    name: string;
    image: string;
    tags: string[];
    currentParticipants: number;
    totalParticipants: number;
  };
  leader: {
    name: string;
  };
};

export const camelizePost = (data: SupabasePost, joinCnt: number): Post => {
  return {
    id: data.post_id,
    title: data.post_name ?? "",
    likes: data.like_count,
    comments: data.comment_count,
    createdAt: data.post_createtime,
    study: {
      id: data.study_id,
      name: data.study.study_name,
      image: data.study.study_imgurl ?? "",
      tags: data.study.study_category,
      currentParticipants: joinCnt,
      totalParticipants: data.study.study_max_people,
    },
    leader: {
      name: data.user.name,
    },
  };
};

// study-study_name + study-study_category + study-study_imgurl + user-name + study-study_max_people
// ---> study_id로 study_applylist.eq(study_id,).is_approved True인 것만 조회해서 갯수 세기
// ----> post_id와 user_id 통해서 내가 좋아요 눌렀는지 여부 확인 (like update)
