import Link from "next/link";
import React from "react";
import { Tables } from "../../../../database.types";
import ExclamationMarkInStudy from "../../../../public/icons/ExclamationMarkInStudy.svg";
import SeeMoreButtonBlack from "../../../../public/icons/SeeMoreButtonBlack.svg";
import Image from "next/image";
import ApplyUserIncludeManagerProfileImgList from "./ApplyUserIncludeManagerProfileImgList";
import Badge from "@/components/common/Badge";
import GroupDesignBlack from "../../../../public/icons/GroupDesignBlack.svg";
import GroupDesignWebBlack from "../../../../public/icons/GroupDesignWebBlack.svg";

interface StudyCardProps {
  dataItem: Tables<"study">;
}

const StudyCard = ({ dataItem }: StudyCardProps) => {
  return (
    <div key={dataItem.study_id} className="relative">
      <Link
        onClick={(e) => e.stopPropagation()}
        href={`/study/${dataItem.study_id}/manage`}
        className="absolute left-[269px] top-5 flex h-9 w-9 items-center justify-center gap-1 md:left-[312px] md:top-[28px] md:h-[48px] md:w-[48px]"
      >
        <div className="left-[269px] z-10">
          <Image
            src={SeeMoreButtonBlack}
            alt="SeeMoreButtonBlack"
            className="md:h-[48px] md:w-[48px]"
          />
        </div>
      </Link>
      <Link href={`/study/${dataItem.study_id}`} key={dataItem.study_id}>
        <div className="mb-[20px] flex w-full flex-col items-start gap-[12px] self-stretch md:h-[360px] md:w-[388px]">
          <div className="relative h-[266px] w-[327px] overflow-hidden rounded-[24px] bg-[#403E3D] md:h-full md:w-full">
            <Image
              alt="GroupDesignBlack"
              src={GroupDesignBlack}
              className="relative left-[108px] top-[161px] md:left-[146.57px] md:top-[198px] md:hidden"
            />
            <Image
              src={GroupDesignWebBlack}
              alt="GroupDesignWebBlack"
              className="relative left-[145.21px] top-[218.5px] hidden md:block"
            />
          </div>
          <div className="absolute top-[19px] h-[38px] w-[126px] md:top-[28px]">
            <div className="ml-[21px] md:ml-[28px]">
              <ApplyUserIncludeManagerProfileImgList
                studyId={dataItem.study_id}
              />
            </div>

            <div className="absolute left-[20px] top-[51px] flex w-[287px] flex-col items-start gap-[12px] md:left-[28px] md:top-[64px] md:h-[92px] md:w-[388px]">
              <div className="flex flex-col gap-[8px] md:h-full md:w-full md:gap-[10px]">
                <div className="title-18-s md:title-18-m text-[#ffffff]">
                  {dataItem.study_name}
                </div>
                <div className="flex w-full flex-wrap items-center gap-[4px] md:gap-[6px]">
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
              <div className="flex w-full items-center gap-1">
                <Image
                  src={ExclamationMarkInStudy}
                  alt="ExclamationMarkInStudy"
                />
                <div className="caption content-center justify-center text-secondary-300 md:text-[14px]">
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
