"use client";

import Loading from "@/components/common/Loading";
import { getStudyById } from "@/service/refac";
import { useQuery } from "@tanstack/react-query";
import ImageSection from "../ImageSection";
import StudyDescription from "../StudyDescription";
import RankingInfoSection from "../RankingInfoSection";

const LoadingSection = () => (
  <section className="flex h-[25.7rem] w-full flex-col items-center justify-center px-5 pb-8 pt-6">
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

  const studyData = data.data;

  return (
    <section className="w-full max-w-[22rem]">
      <ImageSection image={studyData.image} name={studyData.name} />
      <section className="flex w-full flex-col px-5 pb-5 pt-3 md:px-8 md:pb-8">
        <StudyDescription data={studyData} />
        <RankingInfoSection score={studyData.score} rank={studyData.rank} />
      </section>
    </section>
  );
}
