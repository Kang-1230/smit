import { fetchFeaturedPosts } from "@/service/posts";
import PostCard from "./PostCard";

export default async function FeaturedPosts() {
  const posts = await fetchFeaturedPosts();

  if (!posts || posts.length === 0) return <>Posts가 없습니다</>;

  return (
    <section className="my-4">
      <h2 className="text-2xl font-bold my-2">인기 스터디 🔥</h2>
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
