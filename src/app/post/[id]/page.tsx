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
    <>
    <div className="flex flex-col mt-[59px] items-center mx-6">
      <DetailContents id={params.id} postData={postData} />
      <DetailComments id={params.id} />
    </div>
    <div className="flex w-full gap-2 items-center mt-[11px] py-3 border-t px-6">
    <LikeButton postId={+params.id} className="bg-secondary-50" />
    <ShareStudy />
    <ApplyStudy postData={postData} />
  </div>
  </>
  );
}
