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
        className={`relative rounded-full`}
        style={{
          backgroundImage: `linear-gradient(to bottom right, white, ${borderColorMain})`,
          width: imageSize,
          height: imageSize,
        }}
      >
        <div
          className="absolute -top-2 left-[0.15rem] h-[1.7rem] w-[1.7rem] items-center justify-center rounded-full p-[0.1rem] text-sm"
          style={{
            backgroundImage: `linear-gradient(to top left, ${smallGradientStart}, ${smallGradientEnd})`,
          }}
        >
          <div
            className="flex h-full w-full items-center justify-center rounded-full text-white"
            style={{
              background: `linear-gradient(to bottom right, ${smallGradientStart}, ${smallGradientEnd})`,
            }}
          >
            {rank}
          </div>
        </div>
        <Image
          priority
          className="h-full w-full rounded-full object-cover p-[0.14rem]"
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
