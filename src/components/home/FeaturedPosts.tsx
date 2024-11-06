import { fetchFeaturedPosts } from "@/service/posts";
import PostCard from "./PostCard";
import Image from "next/image";

export default async function FeaturedPosts() {
  const posts = await fetchFeaturedPosts();

  if (!posts || posts.length === 0) return <>Posts가 없습니다</>;

  return (
    <section className="my-4 pl-6">
      <h2 className="text-xl font-medium flex gap-1">
        <Image src={`/icons/Book.svg`} width={20} height={20} alt="user" />
        인기 스터디
      </h2>
      <p className="text-secondary-500 text-sm">
        최근 가장 많은 관심을 받았어요.
      </p>
      <ul className="flex overflow-x-auto gap-2 p-2">
        {posts.map((post) => (
          <li key={post.post_createtime}>
            <PostCard post={post} variant="white" showLikesCount={true} />
          </li>
        ))}
      </ul>
    </section>
  );
}
