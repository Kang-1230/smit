import { Post } from "@/types/posts";
import Image from "next/image";
import PostCard from "./PostCard";

type Props = {
  posts: Post[];
};

export default function SearchResult({ posts }: Props) {
  return (
    <div className="mb-[7.4rem]">
      <div className="flex items-center justify-between">
        <div className="text-xs font-normal text-secondary-500">
          검색결과 {posts.length}개
        </div>
        {/* <SearchFilter category={category} setCategory={setCategory} /> */}
      </div>
      <section className="mb-14 mt-4 flex w-full flex-col items-center justify-center gap-4">
        {!posts.length && (
          <Image
            className="mt-20"
            src="/icons/SearchFailed.svg"
            alt="seach-fail"
            width={300}
            height={300}
          />
        )}
        <ul className="flex w-full flex-col gap-4">
          {posts.map((item, i) => (
            <PostCard color="primary" post={item} key={i} />
          ))}
        </ul>
      </section>
    </div>
  );
}
