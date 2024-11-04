import { Tables } from "../../database.types";

// 회고록 데이터 + 멤버정보(닉네임) 포함 타입
export interface MemoWithUser extends Tables<"study_personal_memo"> {
  user: {
    name: string;
  } | null;
}
