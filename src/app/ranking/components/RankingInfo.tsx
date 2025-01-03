import Image from "next/image";

export default function RankingInfo({
  title,
  icon,
  value,
  unit,
}: {
  title: string;
  icon: string;
  value: string | number;
  unit: string;
}) {
  return (
    <div className="flex w-[3.25rem] flex-1 flex-col gap-1">
      <div className="flex items-center gap-1 text-xs">
        <Image
          src={icon}
          width={20}
          height={20}
          alt="icon"
          className="text-secondary-500"
        />
        <span>{title}</span>
      </div>
      <div className="flex items-center gap-1 text-sm">
        <span className="text-lg font-semibold text-[#1e1e1e]">
          {value.toLocaleString()}
        </span>
        {unit}
      </div>
    </div>
  );
}
