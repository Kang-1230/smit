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
    <div className="mx-auto flex h-screen max-w-[1280px] flex-col overflow-y-auto xl:grid xl:grid-cols-[886px_1fr] xl:overflow-visible">
      <main className="mx-6 flex flex-col items-center pb-[72px] pt-[59px] xl:pr-4 xl:pt-[174px]">
        <DetailContent id={params.id} postData={postData} />
        <DetailComments id={params.id} />
      </main>
      <section className="xl: static">
        <div className="hidden xl:fixed xl:top-[174px] xl:block xl:w-[354px] xl:rounded-[20px] xl:border xl:border-[#E6E6E6] xl:bg-white">
          <RankingModal id={postData.study_id} />
        </div>
        <footer className="fixed bottom-0 w-full border-t bg-white xl:static">
          <div className="flex w-full items-center gap-2 px-6 py-3 xl:fixed xl:top-[644px] xl:w-[354px] xl:rounded-[20px] xl:border xl:border-[#E6E6E6] xl:px-2 xl:py-4">
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
