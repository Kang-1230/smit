import { Tables } from "../../database.types";

type StudyFields = Tables<"study">;

export type SupabaseStudy = StudyFields;

export type Study = {
  id: string;
  name: string;
  description: string;
  image: string;
  tags: string[];
  totalParticipants: number;
  score: number;
  rank: number;
};

export const camelizeStudy = (data: SupabaseStudy, rank: number): Study => {
  return {
    id: data.study_id,
    name: data.study_name,
    description: data.study_description ?? "",
    image: data.study_imgurl ?? "",
    tags: data.study_category,
    totalParticipants: data.study_max_people,
    score: data.study_score,
    rank: rank,
  };
};

export type StudyGroupParams = {
  params: { id: string };
  searchParams: { date?: string; modal?: string };
};
