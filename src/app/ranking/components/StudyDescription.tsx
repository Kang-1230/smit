import CustomButton from "@/components/ui/CustomButton";
import Image from "next/image";

interface StudyDescriptionProps {
  data: {
    name: string;
    tags: string[];
    totalParticipants: number;
    description: string;
  };
}

const StudyDescription = ({ data }: StudyDescriptionProps) => (
  <div className="px-1">
    <h2 className="w-full truncate text-lg font-semibold">{data.name}</h2>
    <div className="mt-1 flex flex-wrap gap-1">
      {data.tags.map((item, i) => (
        <CustomButton
          text={item}
          size="medium"
          bgColor={i === 0 ? "#BFA28D" : "#FF9945"}
          key={item}
        />
      ))}
    </div>
    <div className="mt-2 flex gap-[2px] text-xs font-light text-secondary-500">
      <Image src={`/icons/UserGray.svg`} width={14} height={14} alt="user" />
      인원 {data.totalParticipants}명
    </div>
    <p className="mt-3 line-clamp-3 min-h-12 w-full overflow-hidden text-xs font-normal text-secondary-500">
      {data.description}
    </p>
  </div>
);

export default StudyDescription;
