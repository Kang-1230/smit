import Link from "next/link";
import React from "react";
import Tooltip from "@/components/common/Tooltip";
import useTooltip from "@/hooks/useTooltip";
import { Tables } from "../../../../database.types";
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
        <div className="relative inline-flex flex-[0_0_auto] items-center gap-1">
          <div className="relative h-[3.33px] w-[3.33px] rounded-[1.67px] bg-[#888888]" />
          <div className="relative h-[3.33px] w-[3.33px] rounded-[1.67px] bg-[#888888]" />
          <div className="relative h-[3.33px] w-[3.33px] rounded-[1.67px] bg-[#888888]" />
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
        <div className="relative mb-[20px] flex w-full flex-[0_0_auto] flex-col items-start gap-5 self-stretch">
          <div className="relative h-[266px] w-[327px] overflow-hidden rounded-3xl bg-[#403E3D]">
            <Image
              key={`design-${dataItem.study_id}`}
              alt="GroupDesignBlack"
              src={GroupDesignBlack}
              className="absolute left-[108px] top-[146px] h-auto w-auto"
            />
          </div>
          <div className="absolute left-5 top-[19px] h-[38px] w-[126px]">
            <div className="absolute top-px ml-[10px] h-9 w-8">
              <ApplyUserIncludeManagerProfileImgList
                studyId={dataItem.study_id}
                key={`profile-${dataItem.study_id}`}
              />
            </div>

            <div className="absolute left-5 top-[70px] flex w-[287px] flex-col items-start gap-2">
              <div className="title-18-b relative mt-[-1.00px] self-stretch text-[#000000]">
                {dataItem.study_name}
              </div>
              <div className="relative flex h-11 w-full flex-wrap items-center gap-[4px_4px] self-stretch">
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
    </div>
  );
};

export default StudyCard;
