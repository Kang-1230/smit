import Link from "next/link";
import React from "react";
import Tooltip from "@/components/common/Tooltip";
import useTooltip from "@/hooks/useTooltip";
import { Tables } from "../../../../database.types";
import ExclamationMarkInStudy from "../../../../public/icons/ExclamationMarkInStudy.svg";
import Image from "next/image";
import ApplyUserIncludeManagerProfileImgList from "./ApplyUserIncludeManagerProfileImgList";
import Badge from "@/components/common/Badge";
import GroupDesignBlack from "../../../../public/icons/GroupDesignBlack.svg";

interface StudyCardProps {
  dataItem: Tables<"study">;
  i: number;
}

const StudyCard = ({ dataItem, i }: StudyCardProps) => {
  const { tooltipVisible, closeTooltip } = useTooltip("EditStudy");
  return (
    <div key={dataItem.study_id} className="relative">
      <Link
        onClick={(e) => e.stopPropagation()}
        href={`/study/${dataItem.study_id}/manage`}
        className="absolute left-64 top-5 z-10 flex h-9 w-9 items-center justify-center gap-1 rounded-[20px] bg-[#ffffff99]"
      >
        <div className="inline-flex flex-[0_0_auto] items-center gap-1">
          <div className="h-[3.33px] w-[3.33px] rounded-[1.67px] bg-[#888888]" />
          <div className="h-[3.33px] w-[3.33px] rounded-[1.67px] bg-[#888888]" />
          <div className="h-[3.33px] w-[3.33px] rounded-[1.67px] bg-[#888888]" />
        </div>
        {i === 0 && tooltipVisible && (
          <div className="absolute -right-[20px] bottom-[56px]">
            <Tooltip
              message="더보기를 눌러서, 신청 현황과
                스터디원을 관리할 수 있고,
                스터디를 편집할 수 있어요!"
              position="right"
              onClose={closeTooltip}
            />
          </div>
        )}
      </Link>
      <Link href={`/study/${dataItem.study_id}`} key={dataItem.study_id}>
        <div className="mb-[20px] flex w-full flex-col items-start gap-[12px] self-stretch">
          <div className="relative h-[266px] w-[327px] overflow-hidden rounded-[24px] bg-[#403E3D]">
            <Image
              key={`design-${dataItem.study_id}`}
              alt="GroupDesignBlack"
              src={GroupDesignBlack}
              className="relative left-[108px] top-[161px]"
            />
          </div>
          <div className="absolute top-[19px] h-[38px] w-[126px]">
            <div className="ml-[21px] h-[36px] w-[36px]">
              <ApplyUserIncludeManagerProfileImgList
                studyId={dataItem.study_id}
                key={`profile-${dataItem.study_id}`}
              />
            </div>

            <div className="absolute left-[20px] top-[51px] flex w-[287px] flex-col items-start gap-[8px]">
              <div className="title-18-semibold text-[#ffffff]">
                {dataItem.study_name}
              </div>
              <div className="flex w-full flex-wrap items-center gap-[4px] self-stretch">
                {dataItem.study_category.map((c, i) => (
                  <Badge
                    category={c}
                    idx={i}
                    color="primary"
                    key={`${dataItem.study_id}-${c}`}
                  />
                ))}
              </div>
              <div className="flex w-full">
                <Image
                  src={ExclamationMarkInStudy}
                  alt="ExclamationMarkInStudy"
                />
                <div className="caption justify-center text-secondary-300">
                  앗! 1인 스터디는 점수 집계가 되지 않아요
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default StudyCard;
