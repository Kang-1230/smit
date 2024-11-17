import { getPosts } from "@/service/refac";
import { SearchQueryParams } from "@/types/search";
import SearchResult from "./SearchResult";

type SearchProps = {
  searchParams: SearchQueryParams;
};

export default async function SearchResultList({ searchParams }: SearchProps) {
  const { data } = await getPosts(searchParams);
  return (
    <section className="relative px-6">
      <SearchResult posts={data} />
    </section>
  );
}
