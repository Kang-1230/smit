import { Tables } from "../../database.types";

// comment 테이블 구조에, replies(답글) 속성이 추가된 comment 타입
export interface CommentType extends Tables<"comment"> {
  replies?: CommentType[];
}
