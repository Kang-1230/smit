"use client";
import { useState } from "react";
import { eachMonthOfInterval, format } from "date-fns";
import { enUS } from "date-fns/locale";
import { useQuery } from "@tanstack/react-query";
import browserClient from "@/utils/supabase/client";
import { Tables } from "../../../../database.types";
import ScheduleStatusIndicator from "../../../../public/icons/ScheduleStatusIndicator.svg";
import ArrowTopRight from "../../../../public/icons/ArrowTopRight.svg";
import miniCalender from "../../../../public/icons/Study/WeekCalenderImg.svg";
import NoPlan from "../../../../public/icons/illust/NoPlan.svg";
import LaterPlan from "../../../../public/icons/laterPlan.svg";
import ArrowTopRightBlack from "../../../../public/icons/ArrowTopRightBlack.svg";
import Image from "next/image";
import ModalOverlay from "@/components/common/ModalOverlay";
import WeekCalendarModal from "./WeekCalendarModal";
import Link from "next/link";
import WeekCalenderDropdown from "../[id]/components/WeekCalenderDropdown";

export interface EventWithStudy extends Tables<"calendar"> {
  study: {
    study_name: string;
  };
}

const StudyScheduleList = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calenderModalOpen, setCalenderModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const getEveryMonth = eachMonthOfInterval({
    start: new Date(2024, 1, 1),
    end: new Date(2024, 12, 31),
  });

  console.log("월", getEveryMonth);

  // 이번 주의 날짜들을 계산하는 함수
  const getCurrentWeekDates = (date: Date) => {
    const curr = new Date(date);
    const week = [];

    curr.setDate(curr.getDate() - curr.getDay());

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

      console.log("모든스터디id", allStudyIds);

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

  const { data: allEvents = [] } = useQuery({
    queryKey: ["all-schedules-calendar"],
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

      console.log("모든스터디id", allStudyIds);

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
        .order("start_time", { ascending: true });

      if (error) throw error;
      return schedules as EventWithStudy[];
    },
  });

  console.log("이벤트", events);

  const weekDates = getCurrentWeekDates(selectedDate);
  const today = new Date();

  if (isLoading) return <div>로딩중...</div>;

  return (
    <div>
      <div className="relative flex w-full flex-col items-center overflow-hidden bg-[#f8f8fA] px-6 pb-7 pt-[64px]">
        {/* 달력 헤더 */}
        <div className="flex w-full flex-col items-center pb-[20px]">
          <div className="flex w-[313px] items-center justify-between">
            <div className="relative left-[14px] inline-flex items-center gap-[7px] py-[9px]">
              <WeekCalenderDropdown
                setDropdownOpen={setDropdownOpen}
                dropdownOpen={dropdownOpen}
              />
            </div>
            <div className="flex h-[40px] w-[40px] items-center justify-center">
              <Image
                onClick={() => setCalenderModalOpen(true)}
                src={miniCalender}
                alt="miniCalender"
              />
            </div>

            {calenderModalOpen && (
              <ModalOverlay
                onClick={() => setCalenderModalOpen(!calenderModalOpen)}
              >
                <WeekCalendarModal events={allEvents} />
              </ModalOverlay>
            )}
          </div>
          <div className="space-y-0">
            {" "}
            {/* 날짜 */}
            <div className="grid grid-cols-7 text-center">
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
                    className="flex w-full flex-[0_0_auto] items-center justify-between"
                  >
                    <div
                      className={`caption mt-[-1.00px] self-stretch text-center text-secondary-500 ${
                        isToday ? "!rounded-[22px] !text-primary-50" : ""
                      }${isSelected ? "!rounded-[22px] !bg-primary-50 !text-black" : ""} ${isToday && isSelected ? "!rounded-[22px] !text-black" : ""}`}
                    >
                      <div className="flex h-11 w-11 cursor-pointer flex-col items-center rounded px-3 pb-[5px] pt-1.5">
                        <span className="caption mb-1">{dayOfWeek}</span>
                        <span className="body-16-m">{format(date, "d")}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 일정 리스트 */}
        <div className="w-full">
          {events.length > 0 ? (
            events.map((event: EventWithStudy) => (
              <div className="pb-[20px]" key={event.calendar_id}>
                <Link href={`/study/${event.study_id}`}>
                  <div
                    className={`flex h-[169px] w-full flex-col items-start rounded-[20px] bg-secondary-900 px-[20px] pt-[20px] ${event.start_time !== events[0].start_time ? "!bg-white" : ""}`}
                  >
                    <div className="flex w-full flex-col items-start self-stretch">
                      <div className="relative flex w-full flex-[0_0_auto] items-start justify-between self-stretch">
                        <div className="relative inline-flex flex-[0_0_auto] items-center justify-center gap-2 rounded-3xl backdrop-blur-[10px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(10px)_brightness(100%)]">
                          {event.start_time === events[0].start_time ? (
                            <Image
                              className="h-[24px] w-[24px]"
                              alt="ScheduleStatusIndicator"
                              src={ScheduleStatusIndicator}
                            />
                          ) : (
                            <Image
                              src={LaterPlan}
                              alt="LaterPlan"
                              className="h-[24px] w-[24px]"
                            />
                          )}

                          <span className="body-14-m w-full text-secondary-200">
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
                        <div
                          className={`flex items-center justify-center rounded-[24px] bg-secondary-700 ${event.start_time === events[0].start_time ? "" : "!bg-tertiary-75"} p-[8px] backdrop-blur-[10px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(10px)_brightness(100%)]`}
                        >
                          {event.start_time === events[0].start_time ? (
                            <Image
                              className="h-[24px] w-[24px]"
                              alt="ArrowTopRight"
                              src={ArrowTopRight}
                            />
                          ) : (
                            <Image
                              className="h-[24px] w-[24px]"
                              alt="ArrowTopRightBlack"
                              src={ArrowTopRightBlack}
                            />
                          )}
                        </div>
                      </div>
                      <div
                        className={`text-[18px] font-medium text-white ${event.start_time === events[0].start_time ? "" : "!text-secondary-900"}`}
                      >
                        {event.study?.study_name}
                      </div>
                    </div>
                    <div className="flex max-h-[57px] w-full pt-[8px]">
                      <p
                        className={`body-14-m text-secondary-200 ${event.start_time === events[0].start_time ? "" : "text-secondary-500"}`}
                      >
                        {event.event_description}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="flex w-full justify-center rounded-[20px] bg-white pb-[8px] text-center text-gray-500">
              <Image src={NoPlan} alt="NoPlan" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudyScheduleList;
