import { fetchFeaturedPosts } from "@/service/posts";
import Image from "next/image";
import SquarePostCard from "../common/SquarePostCard";

export default async function FeaturedPosts() {
  const posts = await fetchFeaturedPosts();

  if (!posts || posts.length === 0) return <>Posts가 없습니다</>;

  return (
    <section className="my-8">
      <h2 className="flex gap-1 pl-6 text-xl font-medium">
        <Image src={`/icons/Book.svg`} width={23} height={23} alt="user" />
        인기 스터디
      </h2>
      <p className="pl-6 text-sm text-secondary-500">
        최근 가장 많은 관심을 받았어요.
      </p>
      <ul className="mt-4 flex gap-2 overflow-x-auto pl-6 pr-6">
        {posts.map((post) => (
          <li key={post.post_createtime}>
            <SquarePostCard post={post} />
          </li>
        ))}
      </ul>
    </section>
  );
}
