import Image from "next/image";

export default function RankingStage() {
  return (
    <div className="absolute bottom-0 left-1/2 -z-10 h-[113px] w-[312px] -translate-x-1/2 md:h-[567.5px] md:w-[768px]">
      <Image
        src="/images/RankPlace.svg"
        alt="sun-cloud"
        fill
        className="hidden object-contain object-bottom md:block"
      />
      <Image
        src="/images/RankPlaceMobile.svg"
        alt="sun-cloud"
        fill
        className="object-contain object-bottom md:hidden"
      />
    </div>
  );
}
