import { getFeaturedPosts } from "@/service/refac";
import Image from "next/image";
import TopStudyCard from "./TopPostCard";

export default async function TopPostList() {
  const posts = await getFeaturedPosts();

  return (
    <section className="my-[3.25rem]">
      <h2 className="ml-1 flex gap-1 pl-6 text-xl font-medium">
        <Image src={`/icons/Book.svg`} width={23} height={23} alt="user" />
        인기 스터디
      </h2>
      <p className="ml-[0.375rem] pl-6 text-sm text-secondary-500">
        최근 가장 많은 관심을 받았어요.
      </p>
      <ul className="mt-4 flex gap-4 overflow-x-auto pl-6 pr-6">
        {posts.data.map((post) => (
          <li key={post.createdAt}>
            <TopStudyCard post={post} />
          </li>
        ))}
      </ul>
    </section>
  );
}
