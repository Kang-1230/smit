import CustomButton from "@/components/ui/CustomButton";
import { Study } from "@/types/studys";
import Image from "next/image";

export default function RankingDetails({ data }: { data: Study }) {
  return (
    <>
      <h2 className="w-full truncate text-lg font-semibold">{data.name}</h2>
      <div className="flex gap-[10px]">
        <div className="relative h-[72px] w-[72px] flex-shrink-0 rounded-8">
          <Image
            priority
            className="h-full w-full rounded-8 object-cover"
            src={data.image || ""}
            alt={data.name || "study-image"}
            width={100}
            height={100}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap gap-1">
            {data.tags.map((item, i) => (
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
            />
            인원 {data.totalParticipants}명
          </div>
        </div>
      </div>
      <p className="line-clamp-3 min-h-12 w-full overflow-hidden text-xs font-normal text-secondary-500">
        {data.description}
      </p>
    </>
  );
}
