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
import { ChevronDown } from "lucide-react";
import Tooltip from "@/components/common/Tooltip";
import useTooltip from "@/hooks/useTooltip";
import Image from "next/image";
import NoApplyStudy from "../../../../public/icons/illust/NoApplyStudy.svg";
import CarouselLeftArrow from "../../../../public/icons/CarouselLeftArrow.svg";
import CarouselRightArrow from "../../../../public/icons/CarouselRightArrow.svg";
import MyStudyFooter from "../../../../public/icons/study/MyStudyFooter.png";

export type ApplyData = {
  id: string;
  is_approved: boolean;
  study: Tables<"study">;
  study_id: string;
  user_id: string;
};

export type JoinPerson = {
  apply_message: string;
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
  const { tooltipVisible, closeTooltip } = useTooltip("MyStudy");
  const { data: applyStudyData } = useGetApplyStudyList(user);
  const { data: joinedStudyData } = useGetJoinedStudyList(user);

  console.log("데이터 확인", applyStudyData);

  const [activeTab, setActiveTab] = useState<
    "UserOwnStudy" | "UserJoinedStudy"
  >("UserOwnStudy");

  const deleteMutation = useDeleteApplyStudy();

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

  return (
    <div>
      <div className="mx-6 my-[52px] flex flex-col gap-[12px] md:w-full md:justify-center">
        <div className="flex w-full items-start justify-center md:hidden">
          <h1 className="title-20-s w-full whitespace-nowrap pl-[4px] text-[#000000] md:flex md:justify-center">
            신청한 스터디
          </h1>
        </div>

        <section>
          {applyStudyData?.length !== 0 ? (
            <div className="md:flex md:w-full md:justify-center">
              <div className="hidden w-[1280px] md:block">
                <div className="flex w-full gap-[36px]">
                  <div className="flex w-full justify-between">
                    <h1 className="title-20-s w-full whitespace-nowrap pl-[20px] text-[#000000] md:flex">
                      신청한 스터디
                    </h1>
                    <div className="flex gap-[12px]">
                      <Image src={CarouselLeftArrow} alt="CarouselLeftArrow" />
                      <Image
                        src={CarouselRightArrow}
                        alt="CarouselRightArrow"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-center gap-[36px]">
                  {applyStudyData?.map((dataItem: ApplyData) => {
                    return (
                      <div
                        key={dataItem.id}
                        className="relative mb-[250px] w-[281px]"
                      >
                        <div className="h-[174px] w-[281px] rounded-[32px]">
                          <Image
                            src={`${dataItem.study.study_imgurl}`}
                            alt={`${dataItem.study.study_id}`}
                            width={281}
                            height={174}
                            className="rounded-t-[32px]"
                          />
                        </div>
                        <div className="absolute -bottom-[148px] h-[201px] w-full rounded-[32px] bg-[#F8F8FA] p-[24px]">
                          <div className="flex h-[111px] flex-col">
                            <div className="title-18-m mb-2">{`${dataItem.study.study_name}`}</div>
                            <div className="flex flex-wrap gap-2">
                              {dataItem.study.study_category.map((Item) => {
                                return (
                                  <div
                                    key={Item}
                                    className={`flex h-[22px] items-center rounded-[19.99px] bg-primary-50 px-3 py-1 text-[14px] text-sm text-white ${Item === dataItem.study.study_category[0] ? "!bg-tertiary-300" : ""}`}
                                  >
                                    {Item}
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          <button
                            onClick={() =>
                              deleteMutation.mutate(dataItem.study.study_id)
                            }
                            className="mt-auto w-full rounded-full bg-black py-2 text-white"
                          >
                            신청 취소하기
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="relative flex w-full flex-col items-center gap-2 self-stretch md:hidden">
                {applyStudyData?.map((dataItem: ApplyData) => {
                  return (
                    <ul
                      key={dataItem.id}
                      className="relative flex w-[327px] items-center gap-2 rounded-[26px] bg-[#f8f8fA] py-2 pl-5 pr-2"
                    >
                      <div className="relative flex flex-1 grow items-center gap-3">
                        <li className="body-16-m relative mt-[-1.00px] flex-1 text-[#000000]">
                          {dataItem.study.study_name}
                        </li>
                      </div>
                      <div className="relative inline-flex h-9 items-center justify-center gap-1 rounded-[18px] bg-[#333333] px-4 py-2">
                        <button
                          onClick={() =>
                            deleteMutation.mutate(dataItem.study.study_id)
                          }
                          className="all-[unset] body-14-s body-14-s relative mt-[-0.50px] box-border w-fit whitespace-nowrap text-white"
                        >
                          취소하기
                        </button>
                      </div>
                    </ul>
                  );
                })}
                {applyStudyData?.length !== 0 ? (
                  <div className="relative inline-flex items-center py-2 pl-1 pr-0">
                    <div className="caption relative w-fit whitespace-nowrap text-secondary-700">
                      더보기
                    </div>

                    <ChevronDown
                      className="!relative !h-5 !w-5"
                      color="#4D4D4D"
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          ) : (
            <div className="flex justify-center pb-[20px] pt-[40px]">
              <Image src={NoApplyStudy} alt="NoApplyStudy" />
            </div>
          )}
        </section>
      </div>
      <div className="md:flex md:w-full md:justify-center">
        <div className="flex w-full flex-col gap-4 px-6 pb-[136px] md:left-[100px] md:mx-auto md:h-[478px] md:max-w-[1280px] md:pb-0">
          <div className="md:ml-[20px] md:mr-[20px]">
            <div className="md:flex md:w-full md:justify-between">
              <div className="flex w-[89px] items-center justify-center gap-2.5 py-0 pl-1 pr-0 md:w-full md:flex-col md:items-start md:justify-between">
                <div className="md:flex md:flex-col md:gap-1">
                  <h1 className="title-20-s ml-[-2.50px] mr-[-2.50px] mt-[-1.00px] w-full whitespace-nowrap text-[#000000]">
                    나의 스터디
                  </h1>

                  <h3 className="body-16-r hidden text-secondary-500 md:block">
                    카드를 선택하면 스터디 룸으로 입장할 수 있어요
                  </h3>
                </div>
              </div>
              {/* <div className="hidden gap-[12px] md:ml-[20px] md:flex">
                <Image src={CarouselLeftArrow} alt="CarouselLeftArrow" />
                <Image src={CarouselRightArrow} alt="CarouselRightArrow" />
              </div> */}
            </div>
            <h3 className="body-16-r pl-[4px] pt-[4px] text-secondary-500 md:hidden">
              카드를 선택하면 스터디 룸으로 입장할 수 있어요
            </h3>
          </div>

          <div className="relative inline-flex w-[327px] flex-col items-start gap-y-[12px]">
            {activeTab === "UserOwnStudy" ? (
              <>
                <div className="flex w-full items-center justify-between self-stretch rounded-[30px] bg-[#f8f8f6] p-1 backdrop-blur-2xl backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(40px)_brightness(100%)] md:ml-[20px]">
                  <div
                    onClick={() => setActiveTab("UserOwnStudy")}
                    className="flex flex-1 grow items-center justify-center gap-2.5 rounded-[29px] bg-secondary-900 px-10 py-2.5"
                  >
                    <div className="body-16-m mt-[-1.00px] w-fit whitespace-nowrap text-white">
                      내가 방장
                    </div>
                  </div>

                  <div
                    onClick={() => setActiveTab("UserJoinedStudy")}
                    className="flex flex-1 grow items-center justify-center gap-2.5 px-8 py-2.5"
                  >
                    <div className="body-16-m mt-[-1.00px] w-fit whitespace-nowrap text-[#000000]">
                      가입한 스터디
                    </div>
                  </div>
                </div>
                {myStudyData ? (
                  <UserOwnStudy myStudyData={myStudyData} />
                ) : (
                  <div>방장인 스터디가 없습니다.</div>
                )}
              </>
            ) : (
              <>
                <div className="flex w-full items-center justify-between self-stretch rounded-[30px] bg-[#f8f8f6] p-1 backdrop-blur-2xl backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(40px)_brightness(100%)]">
                  <div
                    onClick={() => setActiveTab("UserOwnStudy")}
                    className="flex flex-1 grow items-center justify-center gap-2.5 px-8 py-2.5"
                  >
                    <div className="body-16-m mt-[-1.00px] w-fit whitespace-nowrap text-[#000000]">
                      내가 방장
                    </div>
                  </div>

                  <div
                    onClick={() => setActiveTab("UserJoinedStudy")}
                    className="flex flex-1 grow items-center justify-center gap-2.5 rounded-[29px] bg-secondary-900 px-10 py-2.5"
                  >
                    <div className="body-16-m mt-[-1.00px] w-fit whitespace-nowrap text-white">
                      가입한 스터디
                    </div>
                  </div>
                </div>
                <UserJoinedStudy joinedStudyData={joinedStudyData} />
              </>
            )}
            {tooltipVisible && (
              <div className="absolute -top-[100px] left-0 md:left-[20px]">
                <Tooltip
                  message="방장일때만 스터디 룸의 캘린더에 팀의 스터디 일정을 등록할 수 있어요."
                  position="left"
                  onClose={closeTooltip}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="hidden w-full md:block">
        <Image
          src={MyStudyFooter}
          alt="MyStudyFooter"
          className="mt-[128px] w-full md:block"
          width={1920}
          height={400}
        />
      </div>
    </div>
  );
};

export default MyStudyList;
