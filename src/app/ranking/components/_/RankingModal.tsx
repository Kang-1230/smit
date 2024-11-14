"use client";

import Loading from "@/components/common/Loading";
import { getStudyById } from "@/service/refac";
import { useQuery } from "@tanstack/react-query";
import RankingDetails from "../RankingDetails";
import RankingInfo from "../RankingInfo";

const LoadingSection = () => (
  <section className="flex h-[21.5rem] w-full flex-col items-center justify-center px-5 pb-8 pt-6">
    <Loading />
  </section>
);

const ErrorSection = () => <div>Error occurred while fetching data</div>;

const NoDataSection = () => <div>No data available</div>;

export default function RankingModal({ id }: { id: string }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["ranking", id],
    queryFn: () => getStudyById(id),
  });

  if (isLoading) return <LoadingSection />;
  if (isError) return <ErrorSection />;
  if (!data || !data.data) return <NoDataSection />;

  return (
    <section className="flex w-full flex-col gap-4 px-5 pb-8 pt-6">
      <RankingDetails data={data.data} />
      <div className="mt-2 flex h-[84px] justify-between gap-5 rounded-16 bg-[#F6F6F4] p-5 text-[#666]">
        <RankingInfo
          title="그룹점수"
          icon="/icons/ArrowChart.svg"
          value={data.data.score}
          unit="점"
        />
        <RankingInfo
          title="스터디 랭킹"
          icon="/icons/Chart.svg"
          value={data.data.rank}
          unit="위"
        />
      </div>
    </section>
  );
}
