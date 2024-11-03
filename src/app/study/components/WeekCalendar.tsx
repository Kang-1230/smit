"use client";
import { useState } from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { ChevronRight, Clock, Calendar } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import browserClient from "@/utils/supabase/client";
import { Tables } from "../../../../database.types";

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

      // 유저가 속한 스터디 목록 가져오기 (approved된 것만)
      const { data: userStudies } = await browserClient
        .from("study_applylist")
        .select("study_id")
        .eq("user_id", user.id)
        .eq("is_approved", true);

      if (!userStudies || userStudies.length === 0) return [];

      // 해당 스터디들의 일정 가져오기
      const studyIds = userStudies.map((study) => study.study_id);
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
        .in("study_id", studyIds)
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
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      {/* 달력 헤더 */}
      <div className="p-4 bg-gray-50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">
            {format(selectedDate, "M월", { locale: ko })}
          </h2>
          <button className="p-2 hover:bg-gray-200 rounded-full">
            <Calendar className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2">
          {/* 요일 */}
          <div className="grid grid-cols-7 text-center text-sm text-gray-500">
            {["월", "화", "수", "목", "금", "토", "일"].map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>

          {/* 날짜 */}
          <div className="grid grid-cols-7 text-center text-sm">
            {weekDates.map((date) => {
              const isToday =
                format(date, "yyyy-MM-dd") === format(today, "yyyy-MM-dd");
              const isSelected =
                format(date, "yyyy-MM-dd") ===
                format(selectedDate, "yyyy-MM-dd");
              return (
                <div
                  key={date.toString()}
                  onClick={() => setSelectedDate(date)}
                  className={`cursor-pointer p-1`}
                >
                  <div
                    className={`w-full h-8 flex items-center justify-center hover:bg-gray-100 ${
                      isToday || isSelected
                        ? "bg-blue-500 text-white hover:bg-blue-600"
                        : ""
                    }`}
                  >
                    {format(date, "d")}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 일정 리스트 */}
      <div className="p-4">
        {events.length > 0 ? (
          events.map((event) => (
            <div
              key={event.calendar_id}
              className="mb-4 p-4 bg-white rounded-lg border hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center text-sm text-red-500 mb-2">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>
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
                  <div className="text-xs text-blue-600 mb-1">
                    {event.study?.study_name}
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {event.event_description}
                  </p>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-8">
            등록된 일정이 없습니다
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyScheduleList;
