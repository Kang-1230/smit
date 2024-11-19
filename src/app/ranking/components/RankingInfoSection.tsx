import RankingInfo from "./RankingInfo";

interface RankingInfoSectionProps {
  score: number;
  rank: number;
}

const RankingInfoSection = ({ score, rank }: RankingInfoSectionProps) => (
  <div className="mt-2 flex h-[84px] justify-between gap-5 rounded-16 bg-[#F6F6F4] px-7 py-4 text-[#666]">
    <RankingInfo
      title="그룹점수"
      icon="/icons/ArrowChart.svg"
      value={score}
      unit="점"
    />
    <div className="my-auto mr-2 h-5/6 w-[0.04rem] bg-secondary-400"></div>
    <RankingInfo
      title="스터디 랭킹"
      icon="/icons/Chart.svg"
      value={rank}
      unit="위"
    />
  </div>
);

export default RankingInfoSection;
