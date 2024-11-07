import SearchInput from "./components/SearchInput";
import SearchResults from "./components/SearchResults";

type Props = {
  params: { slug: string };
};

export default function SearchPage({ params: { slug } }: Props) {
  return (
    <>
      <SearchInput />
      <hr className="h-28" />
      <section className="relative px-6">
        <SearchResults slug={decodeURIComponent(slug)} />
      </section>
    </>
  );
}
