"use client";

import {
  useDeleteApplyStudy,
  useGetApplyStudyList,
  useGetJoinedStudyList,
} from "@/hooks/useApplyStudyList";
// import { useGetJoinedStudyPeople } from "@/hooks/useJoinedStudy";
import { User } from "@supabase/supabase-js";
import ApplyUserProfileImgList from "./ApplyUserProfileImgList";
import Link from "next/link";

export type ApplyData = {
  id: string;
  is_approved: boolean;
  study: Study;
  study_id: string;
  user_id: string;
};

export type Study = {
  study_category: string;
  study_createtime: string;
  study_id: string;
  study_manager: string;
  study_max_people: number;
  study_name: string;
  study_period: string;
  study_score: number;
};

export type JoinPerson = {
  id: string;
  is_approved: boolean;
  study_id: string;
  user_id: string;
};

const ApplyStudyList = ({ user }: { user: User | null }) => {
  const { data: applyStudyData } = useGetApplyStudyList(user);
  const { data: joinedStudyData } = useGetJoinedStudyList(user);

  const deleteMutation = useDeleteApplyStudy();

  return (
    <div className="flex flex flex-col">
      <div className=" mx-6 my-4			">
        <h1>신청한 스터디</h1>
        <section className="bg-slate-100 rounded-lg p-5">
          {applyStudyData?.map((dataItem: ApplyData) => {
            return (
              <div key={dataItem.id}>
                <ul className="flex gap-8">
                  <li>{dataItem.study.study_name}</li>
                  <button
                    onClick={() =>
                      deleteMutation.mutate(dataItem.study.study_id)
                    }
                    className="bg-slate-400	text-white rounded-lg m-1 w-20 h-8	"
                  >
                    취소하기
                  </button>
                </ul>
                <hr className="border-b-1 border-slate-400 w-full my-2 " />
              </div>
            );
          })}
        </section>
      </div>

      <div className=" mx-6 my-4">
        <div>
          <h1>나의 스터디</h1>
        </div>

        <section className="flex-col gap-5 scroll-py-2">
          {joinedStudyData?.map((dataItem: ApplyData) => {
            return (
              <div
                key={dataItem.id}
                className="relative w-[312px] h-[282px] bg-[#e6e6e6] rounded-3xl m-3"
              >
                <Link
                  href={`/study/${dataItem.study_id}`}
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
                    <ApplyUserProfileImgList studyId={dataItem.study_id} />
                  </div>
                  {/* <div className="flex w-[38px] h-[38px] items-center justify-center gap-2.5 p-2.5 absolute top-0 left-[88px] bg-[#ececec] rounded-[18px] border-2 border-solid border-[#cccccc]">
                    <div className="relative w-fit [font-family:'Pretendard-Medium',Helvetica] font-medium text-[#444444] text-xs tracking-[-0.24px] leading-[normal] whitespace-nowrap">
                      +5
                    </div>
                  </div> */}
                </div>

                <div className="pt-20">
                  <div>{dataItem.study.study_name}</div>
                  <div>{dataItem.study.study_category}</div>
                </div>

                <div>
                  <div>그룹 점수</div>
                  <div>{dataItem.study.study_score}점</div>
                </div>

                <div>
                  <div>우리 스터디 랭킹</div>
                  <div>+ 100위</div>
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
};

export default ApplyStudyList;
