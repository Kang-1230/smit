import Image from "next/image";
import { Tables } from "../../../../database.types";
import { getRankConfig } from "@/service/study";

type Props = {
  rank: number;
  study: Tables<"study">;
  onClick: () => void;
};
export default function Avatar({ rank, study, onClick }: Props) {
  const {
    borderColorMain,
    imageSize,
    marginTop,
    smallBorderColorMain,
    smallGradientStart,
    smallGradientEnd,
  } = getRankConfig(rank);

  const { study_name, study_score, study_imgurl } = study;

  return (
    <div
      className="flex flex-col items-center gap-[32px]"
      style={{ marginTop: marginTop }}
      onClick={onClick}
    >
      <div
        className="rounded-full relative"
        style={{
          border: `1.5px solid ${borderColorMain}`,
          width: imageSize,
          height: imageSize,
        }}
      >
        <div
          className="absolute -top-2 left-0 rounded-full w-6 h-6 text-white flex items-center justify-center text-[14px]"
          style={{
            border: `2px solid ${smallBorderColorMain}`,
            background: `linear-gradient(to bottom right, ${smallGradientStart}, ${smallGradientEnd})`,
          }}
        >
          {rank}
        </div>
        <Image
          priority
          className="w-full h-full object-cover rounded-full"
          src={study_imgurl || ""}
          alt={study_name}
          width={25}
          height={25}
        />
      </div>

      <div className="flex flex-col items-center text-[14px] gap-[2px]">
        <div className="text-[#B2611D] w-[60px] truncate text-center font-[500]">
          {study_name}
        </div>
        <div className="text-white font-semibold bg-[#F28327] px-[8px] rounded-16">
          {study_score.toLocaleString()}점
        </div>
      </div>
    </div>
  );
}
