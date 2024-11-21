import Link from "next/link";
import React from "react";
import Tooltip from "@/components/common/Tooltip";
import useTooltip from "@/hooks/useTooltip";
import { Tables } from "../../../../database.types";
import Image from "next/image";
import ApplyUserIncludeManagerProfileImgList from "./ApplyUserIncludeManagerProfileImgList";
import Badge from "@/components/common/Badge";
import Chart from "../../../../public/icons/Chart.svg";
import ArrowChart from "../../../../public/icons/ArrowChart.svg";
import GroupDesign from "../../../../public/icons/GroupDesign.svg";
import SeeMoreButton from "../../../../public/icons/SeeMoreButton.svg";
import GroupDesignWeb from "../../../../public/icons/GroupDesignWeb.svg";

import { getStudyById } from "@/service/refac";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/common/Loading";
import { usePublicUser } from "@/hooks/useUserProfile";

interface StudyCardProps {
  dataItem: Tables<"study">;
  i: number;
}

const LoadingSection = () => (
  <section className="flex h-[21.5rem] w-full flex-col items-center justify-center px-5 pb-8 pt-6">
    <Loading />
  </section>
);

const ErrorSection = () => <div>Error occurred while fetching data</div>;

const NoDataSection = () => <div>No data available</div>;

const StudyCard = ({ dataItem, i }: StudyCardProps) => {
  const { tooltipVisible, closeTooltip } = useTooltip("EditStudy");

  const { data: user } = usePublicUser();

  const {
    data: rankingData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["ranking", dataItem.study_id],
    queryFn: () => getStudyById(dataItem.study_id),
  });

  if (isLoading) return <LoadingSection />;
  if (isError) return <ErrorSection />;
  if (!rankingData || !rankingData.data) return <NoDataSection />;

  return (
    <div key={dataItem.study_id} className="relative z-0">
      <Link
        onClick={(e) => e.stopPropagation()}
        href={`/study/${dataItem.study_id}/manage`}
        className="absolute left-[269px] top-5 flex h-9 w-9 items-center justify-center gap-1 md:left-[312px] md:top-[28px] md:h-[48px] md:w-[48px]"
      >
        <div className="z-10">
          <Image
            src={SeeMoreButton}
            alt="SeeMortButton"
            className="md:h-[48px] md:w-[48px]"
          />
        </div>
      </Link>
      <Link href={`/study/${dataItem.study_id}`} key={dataItem.study_id}>
        <div className="mb-[20px] flex w-full flex-col items-start gap-[12px] self-stretch md:h-[360px] md:w-[388px]">
          <div className="relative h-[266px] w-[327px] overflow-hidden rounded-[24px] bg-[#F1EDE9] md:h-full md:w-full">
            <Image
              key={`design-${dataItem.study_id}`}
              alt="GroupDesign"
              src={GroupDesign}
              className="relative left-[108px] top-[146px] md:hidden"
            />
            <Image
              src={GroupDesignWeb}
              alt="GroupDesignWeb"
              className="relative left-[146.57px] top-[198px]"
            />
          </div>
          <div className="absolute top-[19px] h-[38px] w-[126px] md:top-[28px]">
            <div className="ml-[21px] md:ml-[28px]">
              <ApplyUserIncludeManagerProfileImgList
                studyId={dataItem.study_id}
                key={`profile-${dataItem.study_id}`}
              />
            </div>
          </div>

          <div className="absolute left-[21px] top-[162px] h-[84px] w-[286px] overflow-hidden rounded-2xl bg-[#ffffff80] shadow-[inset_0px_1px_2px_#ffffffcc] backdrop-blur-[10px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(10px)_brightness(100%)] md:left-[28px] md:top-[218px] md:h-[114px] md:w-[332px]">
            <div className="absolute left-5 top-4 flex w-[83px] flex-col items-start gap-1 md:left-[27.14px] md:top-[21.71px]">
              <div className="relative flex w-full items-center gap-0.5 self-stretch">
                <Image
                  key={`chart-${dataItem.study_id}`}
                  alt="ArrowChart"
                  src={ArrowChart}
                  className="relative h-5 w-5 md:h-[27.14px] md:w-[27.14px]"
                />
                <div className="caption relative w-fit whitespace-nowrap text-secondary-600 md:ml-[4px] md:text-[16px]">
                  그룹 점수
                </div>
              </div>
              <div className="relative flex w-full flex-[0_0_auto] items-center gap-1 self-stretch">
                <div className="md:title-24-b title-20-b relative mt-[-1.00px] w-fit whitespace-nowrap text-secondary-900">
                  {dataItem.study_score}
                </div>
                <div className="md:title-18-m body-16-m relative w-fit whitespace-nowrap text-secondary-600">
                  점
                </div>
              </div>
            </div>

            <div className="relative left-[143px] top-[16px] h-[48px] w-[0.5px] bg-secondary-500 opacity-60 md:left-[166.07px] md:top-[21.71px] md:h-[65.14px] md:w-[0.68px]"></div>

            <div className="absolute left-[156px] top-4 flex w-[93px] flex-col items-start gap-1 md:left-[212.07px] md:top-[22.14px]">
              <div className="relative flex w-full flex-[0_0_auto] items-center gap-0.5 self-stretch">
                <Image
                  key={`chart-${dataItem.study_id}`}
                  alt="Chart"
                  src={Chart}
                  className="relative h-5 w-5 md:h-[27.14px] md:w-[27.14px]"
                />
                <div className="relative flex flex-1 grow items-center gap-3">
                  <div className="caption relative mt-[-1.00px] w-fit whitespace-nowrap text-secondary-600 md:pl-[4px] md:text-[16px]">
                    스터디 랭킹
                  </div>
                </div>
              </div>

              <div className="relative flex w-full flex-[0_0_auto] items-center gap-1 self-stretch">
                <div className="title-20-b md:title-24-b relative mt-[-1.00px] w-fit whitespace-nowrap text-black">
                  {rankingData.data.rank}
                </div>
                <div className="body-16-m md:title-18-m relative w-fit whitespace-nowrap text-secondary-600">
                  위
                </div>
              </div>
            </div>
          </div>
          <div className="absolute left-[20px] top-[70px] flex w-[287px] flex-col items-start gap-[12px] md:left-[28px] md:top-[94px] md:h-[92px] md:w-[331px]">
            <div className="flex flex-col gap-[8px] md:h-full md:w-full md:gap-[10px]">
              <div className="md:title-18-m title-18-s text-[#000000]">
                {dataItem.study_name}
              </div>
              <div className="caption flex w-full flex-wrap items-center gap-[4px] self-stretch md:gap-[6px] md:text-[14px]">
                {dataItem.study_category.map((c, i) => (
                  <Badge
                    category={c}
                    idx={i}
                    color="primary"
                    key={`${dataItem.study_id}-${c}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Link>
      {i === 0 && tooltipVisible && dataItem.study_manager === user?.id && (
        <div className="absolute -right-[20px] bottom-[56px] z-10">
          <Tooltip
            message="더보기를 눌러서, 신청 현황과
                스터디원을 관리할 수 있고,
                스터디를 편집할 수 있어요!"
            position="right"
            onClose={closeTooltip}
          />
        </div>
      )}
    </div>
  );
};

export default StudyCard;
