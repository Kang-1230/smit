import Image from "next/image";
import RankingGuideButton from "./RankingGuideButton";

export default function RankingHeader() {
  return (
    <>
      <Image
        className="absolute left-1/2 top-0 -translate-x-1/2"
        src="/images/rankingBackground.svg"
        alt="rankingbg"
        width={375}
        height={375}
      />
      <div className="flex justify-between px-[24px] py-[64px]">
        <h1 className="relative text-[20px] font-semibold leading-normal">
          주간 그룹 랭킹
        </h1>
        <RankingGuideButton />
      </div>
    </>
  );
}
