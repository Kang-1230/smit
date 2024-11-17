import SearchForm from "./components/SearchForm";
import FloatingButtons from "@/components/common/FloatingButtons";
import SearchResultList from "./components/SearchResultList";
import { SearchQueryParams } from "@/types/search";
import { Suspense } from "react";
import Loading from "@/components/common/Loading";

type SearchProps = {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  params: {};
  searchParams: SearchQueryParams;
};

export default async function SearchPage({ searchParams }: SearchProps) {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <SearchForm />
        <hr className="h-28" />
        <SearchResultList searchParams={searchParams} />
      </Suspense>
      <FloatingButtons />
    </>
  );
}
