import DetailContents from "./components/DetailContents";
import DetailComments from "./components/DetailComments";
import ApplyStudy from "./components/ApplyStudy";
import ShareStudy from "./components/ShareStudy";
import LikeButton from "@/components/common/LikeButton";
import { fetchPostInfo } from "@/utils/supabase/supabase-server";
import { checkStudyFull } from "@/actions/detail";

export default async function PostDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const postData = await fetchPostInfo(params.id);

  if (!postData) {
    return <div>정보를 불러오는 데 실패했습니다.</div>;
  }
  const isFull = await checkStudyFull(postData.study_id);

  return (
    <div className="flex h-screen flex-col overflow-y-auto">
      <main className="mx-6 flex flex-col items-center pb-[72px] pt-[59px]">
        <DetailContents id={params.id} postData={postData} />
        <DetailComments id={params.id} />
      </main>

      <footer className="fixed bottom-0 flex w-full items-center gap-2 border-t bg-white px-6 py-3">
        <LikeButton postId={+params.id} className="bg-secondary-50" />
        <ShareStudy />
        <ApplyStudy postData={postData} isFull={isFull} />
      </footer>
    </div>
  );
}
