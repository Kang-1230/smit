import { getPosts } from "@/service/refac";
import { SearchQueryParams } from "@/types/search";
import SearchResult from "./SearchResult";

type SearchProps = {
  searchParams: SearchQueryParams;
};

export default async function SearchResultList({ searchParams }: SearchProps) {
  const { data } = await getPosts(searchParams);
  return (
    <section className="relative mx-auto max-w-[80rem] px-6 md:px-0">
      <SearchResult posts={data} />
    </section>
  );
}
