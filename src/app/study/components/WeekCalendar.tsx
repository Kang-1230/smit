"use client";
import { useState } from "react";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { useQuery } from "@tanstack/react-query";
import browserClient from "@/utils/supabase/client";
import { Tables } from "../../../../database.types";
import DownArrow from "../../../../public/icons/DownArrowInMyStudy.svg";
import ScheduleStatusIndicator from "../../../../public/icons/ScheduleStatusIndicator.svg";
import ArrowTopRight from "../../../../public/icons/ArrowTopRight.svg";
import Image from "next/image";

interface EventWithStudy extends Tables<"calendar"> {
  study: {
    study_name: string;
  };
}

const StudyScheduleList = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // 이번 주의 날짜들을 계산하는 함수
  const getCurrentWeekDates = (date: Date) => {
    const curr = new Date(date);
    const week = [];

    curr.setDate(curr.getDate() - (curr.getDay() || 7) + 1);

    for (let i = 0; i < 7; i++) {
      week.push(new Date(curr));
      curr.setDate(curr.getDate() + 1);
    }

    return week;
  };

  // 현재 유저의 스터디 일정 모두 가져오기
  const { data: events = [], isLoading } = useQuery({
    queryKey: ["all-schedules", format(selectedDate, "yyyy-MM-dd")],
    queryFn: async () => {
      // 현재 유저 정보 가져오기
      const {
        data: { user },
      } = await browserClient.auth.getUser();
      if (!user) throw new Error("로그인이 필요합니다.");

      // 1. 내가 멤버인 스터디 목록 가져오기
      const { data: userStudies } = await browserClient
        .from("study_applylist")
        .select("study_id")
        .eq("user_id", user.id)
        .eq("is_approved", true);

      // 2. 내가 방장인 스터디 목록 가져오기
      const { data: managedStudies } = await browserClient
        .from("study")
        .select("study_id")
        .eq("study_manager", user.id);

      // 두 목록 합치기
      const allStudyIds = [
        ...(userStudies?.map((study: { study_id: string }) => study.study_id) ||
          []),
        ...(managedStudies?.map(
          (study: { study_id: string }) => study.study_id,
        ) || []),
      ];

      if (allStudyIds.length === 0) return [];

      // 모든 스터디의 일정 가져오기
      const { data: schedules, error } = await browserClient
        .from("calendar")
        .select(
          `
          *,
          study:study_id (
            study_name
          )
        `,
        )
        .in("study_id", allStudyIds)
        .eq("event_date", format(selectedDate, "yyyy-MM-dd"))
        .order("start_time", { ascending: true });

      if (error) throw error;
      return schedules as EventWithStudy[];
    },
  });

  const weekDates = getCurrentWeekDates(selectedDate);
  const today = new Date();

  if (isLoading) return <div>로딩중...</div>;

  return (
    <div>
      <div className="relative flex w-[375px] flex-col items-center overflow-hidden bg-[#f6f6f4] px-6 pb-7 pt-[68px]">
        {/* 달력 헤더 */}
        <div className="relative flex w-full flex-[0_0_auto] flex-col items-center bg-[#f6f6f4] pb-[20px]">
          <div className="relative flex w-[313px] flex-[0_0_auto] items-center justify-between">
            <div className="relative left-[14px] inline-flex flex-[0_0_auto] items-center gap-[7px]">
              <h2 className="body-16-m relative mt-[-1.00px] w-fit whitespace-nowrap text-secondary-700">
                {format(selectedDate, "MMMM", { locale: enUS })}
              </h2>
              <Image
                className="!relative !h-4 !w-4"
                src={DownArrow}
                alt="DownArrow"
              />
            </div>

            <button className="rounded-full p-2 hover:bg-primary-50">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.5 12.5762C12.5 12.9904 12.1642 13.3262 11.75 13.3262C11.3358 13.3262 11 12.9904 11 12.5762C11 12.162 11.3358 11.8262 11.75 11.8262C12.1642 11.8262 12.5 12.162 12.5 12.5762Z"
                  fill="#808080"
                />
                <path
                  d="M11.75 17.3262C12.1642 17.3262 12.5 16.9904 12.5 16.5762C12.5 16.162 12.1642 15.8262 11.75 15.8262C11.3358 15.8262 11 16.162 11 16.5762C11 16.9904 11.3358 17.3262 11.75 17.3262Z"
                  fill="#808080"
                />
                <path
                  d="M8.5 16.5762C8.5 16.9904 8.16421 17.3262 7.75 17.3262C7.33579 17.3262 7 16.9904 7 16.5762C7 16.162 7.33579 15.8262 7.75 15.8262C8.16421 15.8262 8.5 16.162 8.5 16.5762Z"
                  fill="#808080"
                />
                <path
                  d="M15.75 13.3262C16.1642 13.3262 16.5 12.9904 16.5 12.5762C16.5 12.162 16.1642 11.8262 15.75 11.8262C15.3358 11.8262 15 12.162 15 12.5762C15 12.9904 15.3358 13.3262 15.75 13.3262Z"
                  fill="#808080"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.14998 3.82578C8.14998 3.4668 7.85896 3.17578 7.49998 3.17578C7.14099 3.17578 6.84998 3.4668 6.84998 3.82578V4.82617H5C4.44772 4.82617 4 5.27389 4 5.82617V19.8262C4 20.3785 4.44772 20.8262 5 20.8262H19C19.5523 20.8262 20 20.3785 20 19.8262V5.82617C20 5.27389 19.5523 4.82617 19 4.82617H17.15V3.82578C17.15 3.4668 16.859 3.17578 16.5 3.17578C16.141 3.17578 15.85 3.4668 15.85 3.82578V4.82617H8.14998V3.82578ZM5.3 9.97578V19.5262H18.7V9.97578H5.3ZM18.7 8.67578V6.12617H5.3V8.67578H18.7Z"
                  fill="#808080"
                />
              </svg>
            </button>
          </div>
          <div className="space-y-0">
            {" "}
            {/* 날짜 */}
            <div className="grid grid-cols-7 text-center text-sm">
              {weekDates.map((date) => {
                const isToday =
                  format(date, "yyyy-MM-dd") === format(today, "yyyy-MM-dd");
                const isSelected =
                  format(date, "yyyy-MM-dd") ===
                  format(selectedDate, "yyyy-MM-dd");
                const dayOfWeek = format(date, "EEEEE", { locale: enUS }); // 한 글자 요일

                return (
                  <div
                    key={date.toString()}
                    onClick={() => setSelectedDate(date)}
                    className="relative flex w-full flex-[0_0_auto] items-center justify-between self-stretch"
                  >
                    <div
                      className={`caption relative mt-[-1.00px] self-stretch text-center text-secondary-500 ${
                        isToday || isSelected
                          ? "text-primary-50"
                          : "rounded-full hover:bg-primary-50"
                      }`}
                    >
                      <div className="relative flex h-11 w-11 cursor-pointer flex-col items-center rounded px-3 pb-[5px] pt-1.5">
                        <span className="mb-1 text-xs">{dayOfWeek}</span>
                        <span>{format(date, "d")}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 일정 리스트 */}
        <div>
          {events.length > 0 ? (
            events.map((event: EventWithStudy) => (
              <div key={event.calendar_id}>
                <div className="relative flex h-[169px] w-[326px] flex-[0_0_auto] flex-col items-start rounded-[20px] bg-secondary-900 p-5">
                  <div className="relative flex w-full flex-col items-start gap-2 self-stretch rounded-[20px]">
                    <div className="relative flex w-full flex-[0_0_auto] items-start justify-between self-stretch">
                      <div className="relative inline-flex flex-[0_0_auto] items-center justify-center gap-2 rounded-3xl backdrop-blur-[10px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(10px)_brightness(100%)]">
                        <Image
                          className="!relative !h-6 !w-6"
                          alt="ScheduleStatusIndicator"
                          src={ScheduleStatusIndicator}
                        />
                        <span className="body-14-m relative w-fit whitespace-nowrap text-secondary-200">
                          {format(
                            new Date(`2000-01-01 ${event.start_time}`),
                            "HH:mm",
                          )}{" "}
                          -{" "}
                          {format(
                            new Date(`2000-01-01 ${event.end_time}`),
                            "HH:mm",
                          )}
                        </span>
                      </div>
                      <div className="relative inline-flex flex-[0_0_auto] items-center justify-center gap-2 rounded-3xl bg-secondary-700 p-2 backdrop-blur-[10px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(10px)_brightness(100%)]">
                        <Image
                          className="!relative !h-6 !w-6"
                          alt="ArrowTopRight"
                          src={ArrowTopRight}
                        />
                      </div>
                    </div>
                    <div className="font-title-18px-medium relative self-stretch pb-[8px] text-[length:var(--title-18px-medium-font-size)] font-[number:var(--title-18px-medium-font-weight)] leading-[var(--title-18px-medium-line-height)] tracking-[var(--title-18px-medium-letter-spacing)] text-white [font-style:var(--title-18px-medium-font-style)]">
                      {event.study?.study_name}
                    </div>
                  </div>
                  <div className="relative flex w-full flex-[0_0_auto] items-center gap-1 self-stretch">
                    <p className="body-14-m relative mt-[-1.00px] flex-1 overflow-hidden text-ellipsis text-secondary-200 [-webkit-box-orient:vertical] [-webkit-line-clamp:3] [display:-webkit-box]">
                      {event.event_description}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-gray-500">
              등록된 일정이 없습니다
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudyScheduleList;
