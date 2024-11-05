import Image from "next/image";
import Link from "next/link";

export default function QuestionModal() {
  return (
    <section className="px-5 py-8 w-full flex flex-col gap-4 items-center">
      <Image
        className="my-6"
        src="/icons/RankingInfo.svg"
        alt="RankingInfo"
        width={101}
        height={116}
      />

      <div className="flex flex-col items-center px-5 gap-2">
        <h1 className="text-secondary-900 font-semibold text-xl">
          랭킹의 기준이 뭔가요?
        </h1>
        <ul className="text-sm text-gray-700 font-normal list-disc">
          <li>
            스터디의 정해진 시간 내에서 80% 이상 참여한 인원에 따라 점수가
            집계됩니다.
          </li>
          <li>
            누적시간(1시간 단위), 참여 인원 %에 따라 그룹 점수 부여가 다릅니다.
          </li>
          <li>1인 그룹은 랭킹에 참여 할 수 없습니다.</li>
        </ul>
      </div>

      <button className="rounded-24 bg-secondary-900 text-white w-full px-5 py-3 mt-5">
        바로가기
      </button>
    </section>
  );
}
