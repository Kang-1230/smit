"use client";

import {
  useDeleteApplyStudy,
  useGetApplyStudyList,
  useGetJoinedStudyList,
} from "@/hooks/useApplyStudyList";
import { User } from "@supabase/supabase-js";
import browserClient from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Tables } from "../../../../database.types";
import UserOwnStudy from "./UserOwnStudy";
import UserJoinedStudy from "./UserJoinedStudy";
import { useState } from "react";

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

export type JoinPersonWithManager = {
  apply_message: string;
  id: string;
  is_approved: boolean;
  study: Tables<"study">;
  user: Tables<"user">;
  user_id: string;
};

const MyStudyList = ({ user }: { user: User | null }) => {
  const { data: applyStudyData } = useGetApplyStudyList(user);
  const { data: joinedStudyData } = useGetJoinedStudyList(user);

  const [activeTab, setActiveTab] = useState<
    "UserOwnStudy" | "UserJoinedStudy"
  >("UserJoinedStudy");

  const deleteMutation = useDeleteApplyStudy();

  console.log("유저 정보", user);

  //내가 방장인 스터디

  const myStudy = async (user: User | null) => {
    const { data: myStudyData, error } = await browserClient
      .from("study")
      .select(`*`)
      .eq("study_manager", user?.id);
    if (!myStudyData || error) {
      throw new Error("스터디 가입 정보를 불러오지 못했습니다.");
    }
    return myStudyData as Tables<"study">[];
  };

  const useMyStudy = (user: User | null) => {
    return useQuery({
      queryKey: ["study_mine", user?.id],
      queryFn: () => myStudy(user),
      enabled: !!user,
    });
  };

  const { data: myStudyData, isLoading, error } = useMyStudy(user);

  if (isLoading) return <div>로딩중</div>;
  if (error) return <div>에러 발생</div>;

  console.log("내가 방장인 스터디", myStudyData);

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

      <div className=" w-full flex flex-col gap-4 p-4">
        <div>
          <h1>나의 스터디</h1>
        </div>
        {activeTab === "UserOwnStudy" ? (
          <div className="flex flex-col	gap-4">
            <div className="flex h-11 items-center justify-between px-2 py-0 relative rounded-[99px] border border-solid border-[#888888]">
              <div
                onClick={() => setActiveTab("UserOwnStudy")}
                className="inline-flex h-8 px-10 py-2.5 flex-[0_0_auto] bg-[#979797] rounded-2xl items-center justify-center gap-2.5 relative"
              >
                <div className="mt-[-1.00px] ml-[-5.50px] mr-[-5.50px] text-[#ffffff] relative w-fit [font-family:'Pretendard-Medium',Helvetica] font-medium text-base tracking-[-0.32px] leading-[normal] whitespace-nowrap">
                  내가 방장
                </div>
              </div>

              <div
                onClick={() => setActiveTab("UserJoinedStudy")}
                className="flex w-[138px] px-8 py-2.5 items-center justify-center gap-2.5 relative"
              >
                <div className="mt-[-4.50px] mb-[-2.50px] text-[#000000] relative w-fit [font-family:'Pretendard-Medium',Helvetica] font-medium text-base tracking-[-0.32px] leading-[normal] whitespace-nowrap">
                  가입한 스터디
                </div>
              </div>
            </div>
            {myStudyData ? (
              <UserOwnStudy myStudyData={myStudyData} />
            ) : (
              <div>방장인 스터디가 없습니다.</div>
            )}
          </div>
        ) : (
          <div className="flex flex-col	gap-4">
            <div className="flex h-11 items-center justify-between px-2 py-0 relative rounded-[99px] border border-solid border-[#888888]">
              <div
                onClick={() => setActiveTab("UserOwnStudy")}
                className="flex w-[138px] px-8 py-2.5 items-center justify-center gap-2.5 relative"
              >
                <div className="mt-[-4.50px] mb-[-2.50px] text-[#000000] relative w-fit [font-family:'Pretendard-Medium',Helvetica] font-medium text-base tracking-[-0.32px] leading-[normal] whitespace-nowrap">
                  내가 방장
                </div>
              </div>

              <div
                onClick={() => setActiveTab("UserJoinedStudy")}
                className="inline-flex h-8 px-10 py-2.5 flex-[0_0_auto] bg-[#979797] rounded-2xl items-center justify-center gap-2.5 relative"
              >
                <div className="mt-[-1.00px] ml-[-5.50px] mr-[-5.50px] text-[#ffffff] relative w-fit [font-family:'Pretendard-Medium',Helvetica] font-medium text-base tracking-[-0.32px] leading-[normal] whitespace-nowrap">
                  가입한 스터디
                </div>
              </div>
            </div>
            <UserJoinedStudy joinedStudyData={joinedStudyData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MyStudyList;
