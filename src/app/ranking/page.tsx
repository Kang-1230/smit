"use client";

import { fetchAllStudyByRanking } from "@/service/posts";
import Image from "next/image";
import Avatar from "./components/Avatar";
import RankingCard from "./components/RankingCard";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import RankingModal from "./components/RankingModal";
import RankingModalOverlay from "./components/RankingModalOverlay";
import QuestionModal from "./components/QuestionModal";

const fetchAllStudy = async (page: number) => {
  const data = await fetchAllStudyByRanking(page);
  return data;
};

export default function RankingPage() {
  // 마지막페이지 계산해서 호출안하게 하는 로직추가 예정
  // 더보기 로딩시 로딩스피너 구현 필요 + 클릭 방지
  const [page, setPage] = useState(1);
  const [isModal, setIsModal] = useState(false);
  const [isQuestionModal, setIsQuestionModal] = useState(false);
  const [id, setId] = useState("");
  const [rank, setRank] = useState(0);

  const {
    data: ranking,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["ranking", page],
    queryFn: () => fetchAllStudy(page),
    placeholderData: (previousData) => previousData,
  });

  const onModalClick = (id: string, rank: number) => {
    setIsModal(true);
    setId(id);
    setRank(rank);
  };

  const handleMore = useCallback(() => {
    setPage((prev) => prev + 1);
    refetch();
  }, [refetch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching data</div>;
  }

  return (
    <>
      <section className="relative h-screen bg-gradient-to-b from-[#FF8F32] to-[#FFC799]">
        {/* 단상 및 빛깔 */}
        <Image
          className="absolute left-1/2 top-0 -translate-x-1/2"
          src="/images/rankingBackground.svg"
          alt="rankingbg"
          width={375}
          height={375}
        />

        {/* 헤더 */}
        <div className="flex justify-between px-[24px] py-[64px]">
          <h1 className="relative z-10 text-[20px] font-semibold leading-normal">
            주간 그룹 랭킹
          </h1>
          <button
            className="relative flex items-center justify-center"
            onClick={() => setIsQuestionModal(true)}
          >
            <Image src="/icons/Info.svg" alt="info" width={24} height={24} />
          </button>
        </div>

        {/* 아바타(1,2,3) */}
        {ranking?.length && ranking.length >= 3 && (
          <div className="absolute top-[125px] flex w-full justify-center gap-[31px]">
            <Avatar
              rank={2}
              study={ranking[1]}
              onClick={() => onModalClick(ranking[1].study_id, 2)}
            />
            <Avatar
              rank={1}
              study={ranking[0]}
              onClick={() => onModalClick(ranking[0].study_id, 1)}
            />
            <Avatar
              rank={3}
              study={ranking[2]}
              onClick={() => onModalClick(ranking[2].study_id, 3)}
            />
          </div>
        )}

        {/* 랭킹카드들 */}
        <section className="absolute top-[333px] min-h-[30rem] w-full rounded-t-20 bg-gradient-to-b from-[#FFFCF9] via-[#FFF] to-[#FFF] px-[24px] py-[12px] backdrop-blur-[15px]">
          {ranking
            ?.slice(3)
            .map((study, i) => (
              <RankingCard
                study={study}
                rank={i + 4}
                key={study.study_id}
                onClick={() => onModalClick(study.study_id, i + 4)}
              />
            ))}
          <div className="mb-24 mt-3 text-center text-[14px] text-secondary-300">
            <button onClick={handleMore}>더보기</button>
          </div>
        </section>

        {/* 모달 */}
        {isModal && (
          <RankingModalOverlay onClick={() => setIsModal(false)}>
            <RankingModal id={id} rank={rank} />
          </RankingModalOverlay>
        )}
        {isQuestionModal && (
          <RankingModalOverlay
            isXButtonVisible={false}
            onClick={() => setIsQuestionModal(false)}
          >
            <QuestionModal />
          </RankingModalOverlay>
        )}
      </section>
    </>
  );
}
