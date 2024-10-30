import Link from "next/link";
import LikeButton from "../common/LikeButton";
import { createClient } from "@/utils/supabase/server";
import { PostWithRelations, StudyApplyList } from "@/service/posts";

const STYLES = {
  card: {
    white: "min-w-64 rounded-2xl bg-white p-4 shadow-md",
    gray: "max-w-sm rounded-2xl bg-gray-50 p-4",
  },
  tag: {
    white:
      "rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-[#595959]",
    gray: "rounded-full bg-white px-3 py-1 text-sm",
  },
};

const calculateApprovedApplicants = (data: StudyApplyList[] | null) => {
  return (
    data?.reduce((acc, curr) => (curr.is_approved ? acc + 1 : acc), 0) ?? 0
  );
};

export type Props = {
  post: PostWithRelations;
  variant?: "white" | "gray";
  showAuthor?: boolean;
  showStudyName?: boolean;
  showLikesCount?: boolean;
};

export default async function PostCard({
  post,
  variant = "white",
  showAuthor = false,
  showStudyName = false,
  showLikesCount = false,
}: Props) {
  const { post_name, post_id, study_id, study, user } = post;
  const { study_max_people, study_category, study_name } = study;
  const { name } = user;

  const serverClient = createClient();
  const { data } = await serverClient
    .from("study_applylist")
    .select(`*`)
    .eq("study_id", study_id);

  const currentNum = calculateApprovedApplicants(data);

  return (
    <Link href={`/post/${post_id}`}>
      <div className={STYLES.card[variant]}>
        {showAuthor && (
          <div className="mb-4 flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-gray-200"></div>
            <span className="text-gray-600 text-sm">{name}</span>
          </div>
        )}

        {showStudyName && (
          <div className="mb-2 text-base font-medium">{study_name}</div>
        )}

        <h2 className="mb-4 text-lg font-semibold">{post_name}</h2>

        <div className="mb-4 flex flex-wrap gap-2">
          {study_category.map((tag) => (
            <span key={tag} className={STYLES.tag[variant]}>
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>
            모집 {currentNum}/{study_max_people}
          </span>
          <div className="flex items-center gap-1">
            <LikeButton postId={post_id} showLikesCount={showLikesCount} />
          </div>
        </div>
      </div>
    </Link>
  );
}
