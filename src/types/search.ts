export type Category = "최신순" | "댓글순" | "인기순";

export type SearchQueryParams = {
  search: string;
  category: Category;
};
