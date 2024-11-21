import Image from "next/image";
import { Study } from "@/types/studys";
import { getRankConfigBig } from "@/utils/rank";

type Props = {
  rank: number;
  study: Study;
  handleModalClick: (id: string) => void;
};
export default function RankerAvatarBig({
  rank,
  study,
  handleModalClick,
}: Props) {
  const {
    borderColorMain,
    imageSize,
    marginTop,
    smallGradientStart,
    smallGradientEnd,
  } = getRankConfigBig(rank);

  return (
    <div
      className="flex flex-col items-center gap-[65px]"
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
          className="absolute -top-2 left-[0.15rem] h-[2.5rem] w-[2.5rem] items-center justify-center rounded-full p-[0.15rem] text-xl"
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
          className="h-full w-full rounded-full object-cover p-[0.18rem]"
          src={study.image || ""}
          alt={study.name}
          width={100}
          height={100}
        />
      </div>

      <div className="flex flex-col items-center gap-1 text-lg">
        <div className="w-[210px] truncate text-center font-[500] text-[#B2611D]">
          {study.name}
        </div>
        <div className="rounded-[27px] bg-primary-100 px-3 py-1 font-light text-white">
          {study.score.toLocaleString()}점
        </div>
      </div>
    </div>
  );
}
