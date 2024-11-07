import CustomButton from "@/components/ui/CustomButton";
import { fetchByStudyId, fetchRankingById } from "@/service/posts";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

const fetchAllStudy = async (id: string) => {
  const data = await fetchByStudyId(id);
  const rank = await fetchRankingById(id);
  return { ...data, rank };
};

export default function RankingModal({ id }: { id: string }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["modal", id],
    queryFn: () => fetchAllStudy(id),
  });

  if (isLoading) {
    return (
      <section className="flex w-full flex-col items-center justify-center px-5 pb-8 pt-6">
        Loading...
      </section>
    );
  }

  if (isError) {
    return <div>Error occurred while fetching data</div>;
  }

  return (
    <section className="flex w-full flex-col gap-4 px-5 pb-8 pt-6">
      <h2 className="w-full truncate text-lg font-semibold">
        {data?.study_name}
      </h2>

      <div className="flex gap-[10px]">
        <div className="relative h-[72px] w-[72px] rounded-8">
          <Image
            priority
            className="h-full w-full rounded-8 object-cover"
            src={data?.study_imgurl || ""}
            alt={data?.study_name || "study-image"}
            width={25}
            height={25}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex h-11 flex-wrap gap-1">
            {data?.study_category.map((item, i) => (
              <CustomButton
                text={item}
                size="medium"
                bgColor={i === 0 ? "#BFA28D" : "#FF9945"}
                key={item}
              />
            ))}
          </div>

          <div className="flex gap-[2px] text-xs text-secondary-500">
            <Image
              src={`/icons/UserGray.svg`}
              width={14}
              height={14}
              alt="user"
              className="text-secondary-500"
            />
            인원 {data?.study_max_people}명
          </div>
        </div>
      </div>

      <p className="line-clamp-3 min-h-12 w-full overflow-hidden text-xs font-normal text-secondary-500">
        {data?.study_description}
      </p>

      <div className="mt-2 flex h-[84px] justify-between gap-5 rounded-16 bg-[#F6F6F4] p-5 text-[#666]">
        <div className="flex flex-1 flex-col gap-1 border-r border-secondary-300">
          <div className="flex gap-[2px] text-xs">
            <Image
              src={`/icons/ArrowChart.svg`}
              width={12}
              height={12}
              alt="user"
              className="text-secondary-500"
            />
            그룹점수
          </div>
          <div className="flex items-center gap-1 text-sm">
            <span className="text-lg font-semibold text-[#1e1e1e]">
              {data?.study_score.toLocaleString()}
            </span>
            점
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-1">
          <div className="flex gap-[2px] text-xs">
            <Image
              src={`/icons/Chart.svg`}
              width={12}
              height={12}
              alt="user"
              className="text-secondary-500"
            />
            스터디 랭킹
          </div>
          <div className="flex items-center gap-1 text-sm">
            <span className="text-lg font-semibold text-[#1e1e1e]">
              {data?.rank}
            </span>
            위
          </div>
        </div>
      </div>
    </section>
  );
}
