import DetailContent from "./components/DetailContent";
import DetailComments from "./components/DetailComments";
import ApplyStudy from "./components/ApplyStudy";
import ShareStudy from "./components/ShareStudy";
import LikeButton from "@/components/common/LikeButton";
import { fetchPostInfo } from "@/utils/supabase/supabase-server";
import { checkStudyFull } from "@/actions/detail";
import RankingModal from "@/app/ranking/components/_/RankingModal";

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
    <div className="mx-auto flex h-screen max-w-[1280px] flex-col overflow-y-auto md:grid md:grid-cols-[886px_1fr] md:overflow-visible">
      <main className="mx-6 flex flex-col items-center pb-[72px] pt-[59px] md:pr-4 md:pt-[174px]">
        <DetailContent id={params.id} postData={postData} />
        <DetailComments id={params.id} />
      </main>
      <section>
        <div className="hidden md:fixed md:top-[174px] md:block md:w-[354px] md:rounded-[20px] md:border md:border-[#E6E6E6] md:bg-white">
          <RankingModal id={postData.study_id} />
        </div>
        <footer className="fixed bottom-0 w-full border-t bg-white md:static">
          <div className="flex w-full items-center gap-2 px-6 py-3 md:fixed md:top-[630px] md:w-[354px] md:rounded-[20px] md:border md:border-[#E6E6E6] md:px-2 md:py-4">
            <LikeButton
              postId={+params.id}
              className="bg-secondary-50"
              color="#999999"
            />
            <ShareStudy />
            <ApplyStudy postData={postData} isFull={isFull} />
          </div>
        </footer>
      </section>
    </div>
  );
}
