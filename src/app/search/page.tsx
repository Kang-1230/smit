import { SearchQueryParams } from "@/types/search";
import SearchForm from "./components/SearchForm";
import SearchResult from "./components/SearchResult";
import { getPosts } from "@/service/refac";
import FloatingButtons from "@/components/common/FloatingButtons";

type SearchProps = {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  params: {};
  searchParams: SearchQueryParams;
};

export default async function SearchPage({ searchParams }: SearchProps) {
  const { data } = await getPosts(searchParams);
  return (
    <>
      <SearchForm />
      <hr className="h-28" />
      <section className="relative px-6">
        <SearchResult posts={data} />
      </section>
      <FloatingButtons />
    </>
  );
}
