import { Post } from "@/types/posts";
import Link from "next/link";
import LikeButton from "../common/LikeButton";
import Badge from "../common/Badge";

type Props = {
  post: Post;
};

export default function TopPostCard({ post }: Props) {
  return (
    <Link href={`/post/${post.id}`}>
      <div className="flex h-[216px] w-[260px] flex-col justify-between rounded-3xl bg-secondary-900 px-5 pb-6 pt-5 text-white">
        <div>
          <p className="body-16-s mb-3 line-clamp-2">{post.title}</p>
          <div className="flex flex-row flex-wrap gap-1">
            {post.study.tags.map((category, idx) => (
              <Badge
                category={category}
                key={`${post.study.id}-${category}`}
                idx={idx}
                color="secondary"
              />
            ))}
          </div>
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="caption flex flex-col gap-y-2">
            <p>
              모집 {post.study.currentParticipants + 1}/
              {post.study.totalParticipants}
            </p>
            <p className="text-secondary-400">
              관심 {post.likes}
              <span className="mx-[5px]">·</span>댓글 {post.comments}
            </p>
          </div>
          <LikeButton postId={post.id} />
        </div>
      </div>
    </Link>
  );
}
