import React from "react";
import { ApplyData } from "./MyStudyList";
// import ApplyUserProfileImgList from "./ApplyUserProfileImgList";
// import Link from "next/link";
// import Chart from "../../../../public/icons/Chart.svg";
// import ArrowChart from "../../../../public/icons/ArrowChart.svg";
// import GroupDesign from "../../../../public/icons/GroupDesign.svg";
// import Image from "next/image";
import StudyCard from "./StudyCard";

const UserJoinedStudy = ({
  joinedStudyData,
}: {
  joinedStudyData: ApplyData[] | undefined;
}) => {
  return (
    <section className="scroll-py-2 flex-col gap-5">
      {joinedStudyData?.map((dataItem: ApplyData, i) => {
        if (!joinedStudyData) return null;
        return (
          <StudyCard key={dataItem.study_id} dataItem={dataItem.study} i={i} />
          // <Link href={`/study/${dataItem.study_id}`} key={dataItem.id}>
          //   <div className="relative mb-[20px] flex w-full flex-[0_0_auto] flex-col items-start gap-5 self-stretch">
          //     <div className="relative h-[266px] w-[327px] overflow-hidden rounded-3xl bg-[#f1ece9]">
          //       <div className="absolute bottom-0 right-0">
          //         <Image
          //           key={`design-${dataItem.id}`}
          //           alt="GroupDesign"
          //           src={GroupDesign}
          //           className="h-auto w-auto"
          //         />
          //       </div>
          //       <div className="absolute left-5 top-[19px] h-[38px] w-[126px]">
          //         <div className="absolute top-px ml-[10px] h-9 w-8">
          //           <ApplyUserProfileImgList studyId={dataItem.study_id} />
          //         </div>
          //         {/* <div className="flex w-[38px] h-[38px] items-center justify-center gap-2.5 p-2.5 absolute top-0 left-[88px] bg-[#ececec] rounded-[18px] border-2 border-solid border-[#cccccc]">
          //           <div className="relative w-fit [font-family:'Pretendard-Medium',Helvetica] font-medium text-[#444444] text-xs tracking-[-0.24px] leading-[normal] whitespace-nowrap">
          //             +5
          //           </div>
          //         </div> */}
          //       </div>
          //       <div className="absolute left-[21px] top-[162px] h-[84px] w-[286px] overflow-hidden rounded-2xl bg-[#ffffff80] shadow-[inset_0px_1px_2px_#ffffffcc] backdrop-blur-[10px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(10px)_brightness(100%)]">
          //         <div className="absolute left-5 top-4 flex w-[83px] flex-col items-start gap-1">
          //           <div className="relative flex w-full flex-[0_0_auto] items-center gap-0.5 self-stretch">
          //             <Image
          //               key={`chart-${dataItem.id}`}
          //               alt="ArrowChart"
          //               src={ArrowChart}
          //               className="!relative !h-5 !w-5"
          //             />
          //             <div className="caption relative w-fit whitespace-nowrap">
          //               그룹 점수
          //             </div>
          //           </div>
          //           <div className="relative flex w-full flex-[0_0_auto] items-center gap-1 self-stretch">
          //             <div className="title-20-b relative mt-[-1.00px] w-fit whitespace-nowrap text-secondary-900">
          //               {dataItem.study.study_score}
          //             </div>
          //             <div className="body-16-m relative w-fit whitespace-nowrap text-secondary-600">
          //               점
          //             </div>
          //           </div>
          //         </div>

          //         <div className="absolute left-[156px] top-4 flex w-[93px] flex-col items-start gap-1">
          //           <div className="relative flex w-full flex-[0_0_auto] items-center gap-0.5 self-stretch">
          //             <Image
          //               key={`chart-${dataItem.id}`}
          //               alt="Chart"
          //               src={Chart}
          //               className="!relative !h-5 !w-5"
          //             />
          //             <div className="relative flex flex-1 grow items-center gap-3">
          //               <div className="caption relative mt-[-1.00px] w-fit whitespace-nowrap text-secondary-600">
          //                 스터디 랭킹
          //               </div>
          //             </div>
          //           </div>

          //           <div className="relative flex w-full flex-[0_0_auto] items-center gap-1 self-stretch">
          //             <div className="title-20-b relative mt-[-1.00px] w-fit whitespace-nowrap text-black">
          //               100
          //             </div>
          //             <div className="body-16-m relative w-fit whitespace-nowrap text-secondary-600">
          //               위
          //             </div>
          //           </div>
          //         </div>
          //       </div>

          //       <div className="absolute left-5 top-[70px] flex w-[287px] flex-col items-start gap-2">
          //         <div className="title-18-b relative mt-[-1.00px] self-stretch text-[#000000]">
          //           {dataItem.study.study_name}
          //         </div>
          //         <div className="relative flex h-11 w-full flex-wrap items-center gap-[4px_4px] self-stretch">
          //           {Array.isArray(dataItem.study.study_category) ? (
          //             dataItem.study.study_category.map((category, index) => (
          //               <div
          //                 key={`${dataItem.study_id}-category-${index}`}
          //                 className="relative inline-flex flex-[0_0_auto] items-center justify-center gap-1.5 rounded-[15px] bg-primary-50 px-2.5 py-1"
          //               >
          //                 <div className="caption relative mt-[-1.00px] w-fit whitespace-nowrap text-white">
          //                   {category}
          //                 </div>
          //               </div>
          //             ))
          //           ) : (
          //             <div className="relative inline-flex flex-[0_0_auto] items-center justify-center gap-1.5 rounded-[15px] bg-primary-50 px-2.5 py-1">
          //               <div className="caption relative mt-[-1.00px] w-fit whitespace-nowrap text-white">
          //                 {dataItem.study.study_category}
          //               </div>
          //             </div>
          //           )}
          //         </div>
          //       </div>
          //     </div>
          //   </div>
          // </Link>
        );
      })}
    </section>
  );
};

export default UserJoinedStudy;
