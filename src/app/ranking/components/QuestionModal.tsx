import Image from "next/image";

type Props = {
  onClick: () => void;
};

export default function QuestionModal({ onClick }: Props) {
  return (
    <section className="flex w-full flex-col items-center gap-4 px-5 py-8">
      <Image
        className="my-6"
        src="/icons/RankingInfo.svg"
        alt="RankingInfo"
        width={101}
        height={116}
      />

      <div className="flex flex-col items-center gap-2 px-5">
        <h1 className="text-xl font-semibold text-secondary-900">
          랭킹의 기준이 뭔가요?
        </h1>
        <ul className="list-disc text-sm font-normal text-gray-700">
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

      <button
        className="mt-5 w-full rounded-24 bg-secondary-900 px-5 py-3 text-white"
        onClick={onClick}
      >
        닫기
      </button>
    </section>
  );
}
