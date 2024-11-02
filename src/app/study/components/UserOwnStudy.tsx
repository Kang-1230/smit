import Link from "next/link";
import { Tables } from "../../../../database.types";
import ApplyUserIncludeManagerProfileImgList from "./ApplyUserIncludeManagerProfileImgList";

const UserOwnStudy = ({
  myStudyData,
}: {
  myStudyData: Tables<"study">[] | undefined;
}) => {
  return (
    <section className="flex-col gap-5 scroll-py-2">
      {myStudyData?.map((dataItem: Tables<"study">) => {
        return (
          <div
            key={dataItem.study_id}
            className="relative w-[312px] h-[282px] bg-[#e6e6e6] rounded-3xl m-3"
          >
            <Link
              href={`/study/${dataItem.study_id}/manage`}
              className="flex w-9 h-9 items-center justify-center gap-1 absolute top-5 left-64 bg-[#ffffff99] rounded-[20px]"
            >
              <div className="inline-flex items-center gap-1 relative flex-[0_0_auto]">
                <div className="relative w-[3.33px] h-[3.33px] bg-[#888888] rounded-[1.67px]" />
                <div className="relative w-[3.33px] h-[3.33px] bg-[#888888] rounded-[1.67px]" />
                <div className="relative w-[3.33px] h-[3.33px] bg-[#888888] rounded-[1.67px]" />
              </div>
            </Link>

            <div className="absolute w-[126px] h-[38px] top-[19px] left-5">
              <div className="absolute w-8 h-9 top-px">
                <ApplyUserIncludeManagerProfileImgList
                  studyId={dataItem.study_id}
                />
              </div>
              {/* <div className="flex w-[38px] h-[38px] items-center justify-center gap-2.5 p-2.5 absolute top-0 left-[88px] bg-[#ececec] rounded-[18px] border-2 border-solid border-[#cccccc]">
                <div className="relative w-fit [font-family:'Pretendard-Medium',Helvetica] font-medium text-[#444444] text-xs tracking-[-0.24px] leading-[normal] whitespace-nowrap">
                  +5
                </div>
              </div> */}
            </div>

            <div className="pt-20">
              <div>{dataItem.study_name}</div>
              <div>{dataItem.study_category}</div>
            </div>

            <div>
              <div>그룹 점수</div>
              <div>{dataItem.study_score}점</div>
            </div>

            <div>
              <div>우리 스터디 랭킹</div>
              <div>+ 100위</div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default UserOwnStudy;
