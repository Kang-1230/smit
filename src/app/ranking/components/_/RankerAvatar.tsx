import Image from "next/image";
import { Study } from "@/types/studys";
import { getRankConfig } from "@/utils/rank";

type Props = {
  rank: number;
  study: Study;
  handleModalClick: (id: string) => void;
};
export default function RankerAvatar({ rank, study, handleModalClick }: Props) {
  const {
    borderColorMain,
    imageSize,
    marginTop,
    smallBorderColorMain,
    smallGradientStart,
    smallGradientEnd,
  } = getRankConfig(rank);

  return (
    <div
      className="flex flex-col items-center gap-[32px]"
      style={{ marginTop }}
      onClick={() => handleModalClick(study.id)}
    >
      <div
        className="relative rounded-full"
        style={{
          border: `1.5px solid ${borderColorMain}`,
          width: imageSize,
          height: imageSize,
        }}
      >
        <div
          className="absolute -top-2 left-0 flex h-6 w-6 items-center justify-center rounded-full text-[14px] text-white"
          style={{
            border: `2px solid ${smallBorderColorMain}`,
            background: `linear-gradient(to bottom right, ${smallGradientStart}, ${smallGradientEnd})`,
          }}
        >
          {rank}
        </div>
        <Image
          priority
          className="h-full w-full rounded-full object-cover"
          src={study.image || ""}
          alt={study.name}
          width={100}
          height={100}
        />
      </div>

      <div className="flex flex-col items-center gap-[2px] text-[14px]">
        <div className="w-[60px] truncate text-center font-[500] text-[#B2611D]">
          {study.name}
        </div>
        <div className="rounded-16 bg-[#F28327] px-[8px] font-semibold text-white">
          {study.score.toLocaleString()}점
        </div>
      </div>
    </div>
  );
}
