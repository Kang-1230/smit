import Link from "next/link";
import { Tables } from "../../../../database.types";
import ApplyUserIncludeManagerProfileImgList from "./ApplyUserIncludeManagerProfileImgList";
import Chart from "../../../../public/icons/Chart.svg";
import ArrowChart from "../../../../public/icons/ArrowChart.svg";
import GroupDesign from "../../../../public/icons/GroupDesign.svg";

import Image from "next/image";
import Badge from "@/components/common/Badge";
import Tooltip from "@/components/common/Tooltip";
import useTooltip from "@/hooks/useTooltip";

const UserOwnStudy = ({
  myStudyData,
}: {
  myStudyData: Tables<"study">[] | undefined;
}) => {
  const { tooltipVisible, closeTooltip } = useTooltip("EditStudy");
  return (
    <section className="scroll-py-2 flex-col gap-5">
      {myStudyData?.map((dataItem: Tables<"study">, i) => {
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
                <div className="relative h-[266px] w-[327px] overflow-hidden rounded-3xl bg-[#f1ece9]">
                  <Image
                    key={`design-${dataItem.study_id}`}
                    alt="GroupDesign"
                    src={GroupDesign}
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
                  {/* <div className="flex w-[38px] h-[38px] items-center justify-center gap-2.5 p-2.5 absolute top-0 left-[88px] bg-[#ececec] rounded-[18px] border-2 border-solid border-[#cccccc]">
                    <div className="relative w-fit [font-family:'Pretendard-Medium',Helvetica] font-medium text-[#444444] text-xs tracking-[-0.24px] leading-[normal] whitespace-nowrap">
                      +5
                    </div>
                  </div> */}
                </div>

                <div className="absolute left-[21px] top-[162px] h-[84px] w-[286px] overflow-hidden rounded-2xl bg-[#ffffff80] shadow-[inset_0px_1px_2px_#ffffffcc] backdrop-blur-[10px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(10px)_brightness(100%)]">
                  <div className="absolute left-5 top-4 flex w-[83px] flex-col items-start gap-1">
                    <div className="relative flex w-full flex-[0_0_auto] items-center gap-0.5 self-stretch">
                      <Image
                        key={`chart-${dataItem.study_id}`}
                        alt="ArrowChart"
                        src={ArrowChart}
                        className="!relative !h-5 !w-5"
                      />
                      <div className="caption relative w-fit whitespace-nowrap">
                        그룹 점수
                      </div>
                    </div>
                    <div className="relative flex w-full flex-[0_0_auto] items-center gap-1 self-stretch">
                      <div className="title-20-b relative mt-[-1.00px] w-fit whitespace-nowrap text-secondary-900">
                        {dataItem.study_score}
                      </div>
                      <div className="body-16-m relative w-fit whitespace-nowrap text-secondary-600">
                        점
                      </div>
                    </div>
                  </div>

                  <div className="absolute left-[156px] top-4 flex w-[93px] flex-col items-start gap-1">
                    <div className="relative flex w-full flex-[0_0_auto] items-center gap-0.5 self-stretch">
                      <Image
                        key={`chart-${dataItem.study_id}`}
                        alt="Chart"
                        src={Chart}
                        className="!relative !h-5 !w-5"
                      />
                      <div className="relative flex flex-1 grow items-center gap-3">
                        <div className="caption relative mt-[-1.00px] w-fit whitespace-nowrap text-secondary-600">
                          스터디 랭킹
                        </div>
                      </div>
                    </div>

                    <div className="relative flex w-full flex-[0_0_auto] items-center gap-1 self-stretch">
                      <div className="title-20-b relative mt-[-1.00px] w-fit whitespace-nowrap text-black">
                        100
                      </div>
                      <div className="body-16-m relative w-fit whitespace-nowrap text-secondary-600">
                        위
                      </div>
                    </div>
                  </div>
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
            </Link>
          </div>
        );
      })}
    </section>
  );
};

export default UserOwnStudy;
