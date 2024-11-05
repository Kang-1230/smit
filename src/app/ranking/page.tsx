import { fetchAllStudyByRanking } from "@/service/posts";
import Image from "next/image";
import Avatar from "./components/Avatar";
import RankingCard from "./components/RankingCard";

export default async function RankingPage() {
  const ranking = await fetchAllStudyByRanking();
  console.log(ranking);

  return (
    <>
      <section className="bg-gradient-to-b from-[#FF8F32] to-[#FFC799] relative h-screen">
        {/* 단상 및 빛깔 */}
        <Image
          className="absolute top-0 left-1/2 -translate-x-1/2"
          src="/images/rankingBackground.svg"
          alt="rankingbg"
          width={375}
          height={375}
        />
        {/* 헤더 */}
        <div className="py-[64px] px-[24px] flex justify-between">
          <h1 className="relative z-10 text-[20px] leading-normal font-semibold">
            주간 그룹 랭킹
          </h1>
          <button className="flex justify-center items-center">
            <Image src="/icons/Info.svg" alt="info" width={24} height={24} />
          </button>
        </div>

        {/* 아바타(1,2,3) */}
        <div className="w-full absolute top-[125px] flex gap-[31px] justify-center">
          <Avatar rank={2} study={ranking[1]} />
          <Avatar rank={1} study={ranking[0]} />
          <Avatar rank={3} study={ranking[2]} />
        </div>

        <section className="bg-white w-full absolute top-[333px] rounded-t-20 px-[24px] py-[12px]">
          {ranking.slice(3).map((study, i) => (
            <RankingCard study={study} rank={i + 4} />
          ))}
          <div className="mb-24 mt-3 text-secondary-300 text-[14px] text-center">
            <button>더보기</button>
          </div>
        </section>
      </section>
    </>
  );
}
