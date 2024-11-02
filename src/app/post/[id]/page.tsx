import DetailContents from "./components/DetailContents";
import DetailComments from "./components/DetailComments";
import ApplyStudy from "./components/ApplyStudy";
import ShareStudy from "./components/ShareStudy";
import LikeButton from "@/components/common/LikeButton";
import { fetchPostInfo } from "@/utils/supabase/supabase-server";

export default async function PostDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const postData = await fetchPostInfo(params.id);
  if (!postData) {
    return <div>정보를 불러오는 데 실패했습니다.</div>;
  }

  return (
    <div className="flex flex-col mt-10 items-center mx-6">
      <DetailContents id={params.id} postData={postData} />
      <DetailComments id={params.id} />
      <div className="flex w-full gap-2 items-center">
        <LikeButton postId={+params.id} />
        <ShareStudy />
        <ApplyStudy postData={postData} />
      </div>
    </div>
  );
}
