import CustomButton from "@/components/ui/CustomButton";
import { fetchByStudyId } from "@/service/posts";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

const fetchAllStudy = async (id: string) => {
  const data = await fetchByStudyId(id);
  return data;
};

export default function RankingModal({
  id,
  rank,
}: {
  id: string;
  rank: number;
}) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["modal", id],
    queryFn: () => fetchAllStudy(id),
  });

  console.log(data);

  if (isLoading) {
    return (
      <section className="w-full pt-6 px-5 pb-8 flex flex-col justify-center items-center">
        Loading...
      </section>
    );
  }

  if (isError) {
    return <div>Error occurred while fetching data</div>;
  }

  return (
    <section className="pt-6 px-5 pb-8 flex flex-col gap-4 w-full">
      <h2 className="font-semibold text-lg w-full truncate">
        {data?.study_name}
      </h2>

      <div className="flex gap-[10px]">
        <div className="relative rounded-8 w-[72px] h-[72px]">
          <Image
            priority
            className="w-full h-full object-cover rounded-8"
            src={data?.study_imgurl || ""}
            alt={data?.study_name || "study-image"}
            width={25}
            height={25}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap gap-1 h-11">
            {data?.study_category.map((item, i) => (
              <CustomButton
                text={item}
                size="medium"
                bgColor={i === 0 ? "#BFA28D" : "#FF9945"}
                key={item}
              />
            ))}
          </div>

          <div className="text-secondary-500 text-xs flex gap-[2px]">
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

      <p className="text-secondary-500 font-normal text-xs w-full line-clamp-3 overflow-hidden min-h-12">
        {data?.study_description}
      </p>

      <div className="flex justify-between gap-5 mt-2 h-[84px] p-5 bg-[#F6F6F4] rounded-16 text-[#666]">
        <div className="flex flex-col gap-1 flex-1 border-r border-secondary-300">
          <div className="flex text-xs gap-[2px]">
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
            <span className="text-lg text-[#1e1e1e] font-semibold">
              {data?.study_score.toLocaleString()}
            </span>
            점
          </div>
        </div>

        <div className="flex flex-col gap-1 flex-1">
          <div className="flex text-xs gap-[2px]">
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
            <span className="text-lg text-[#1e1e1e] font-semibold">{rank}</span>
            위
          </div>
        </div>
      </div>
    </section>
  );
}
