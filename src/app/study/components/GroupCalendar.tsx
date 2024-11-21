"use client";

import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { useCalendarByStudy } from "../[id]/hooks/useCalendar";
import { DayContentProps } from "react-day-picker";
import Image from "next/image";
import Tooltip from "@/components/common/Tooltip";
import useTooltip from "@/hooks/useTooltip";

const GroupCalendar = ({
  studyId,
  isModalOpen,
}: {
  studyId: string;
  isModalOpen: boolean;
}) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const { data } = useCalendarByStudy(studyId);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const dateParam = searchParams.get("date");
    setDate(dateParam ? new Date(dateParam) : undefined);
  }, [searchParams]);

  const handleDateClick = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      setDate(selectedDate);

      const params = new URLSearchParams(searchParams);
      params.set("date", formattedDate);
      params.set("modal", "calendar");
      router.push(`?${params.toString()}`);
    }
  };

  const eventDates = data?.map((event) => new Date(event.event_date)) || [];

  const { tooltipVisible, closeTooltip } = useTooltip("Calender");

  return (
    <div
      className={`relative my-4 h-[362px] w-[327px] rounded-[20px] border ${isModalOpen ? "xl:border-primary-50" : "border-[#797272]"} xl:my-0 xl:h-[474px] xl:w-[408px]`}
      style={{
        background:
          "radial-gradient(64.61% 66.48% at 20.51% 9.53%, rgba(255, 153, 69, 0.11) 20%, rgba(255, 153, 69, 0.00) 100%), linear-gradient(180deg, rgba(47, 47, 47, 0.50) 0%, rgba(103, 103, 103, 0.30) 100%)",
      }}
    >
      <div className="relative ml-4 mt-4 flex items-center gap-1 xl:ml-5 xl:mt-6">
        <Image
          src={"/icons/CalenderMonthGray.svg"}
          alt="calendar"
          width={16}
          height={16}
          className="h-4 w-4 xl:h-5 xl:w-5"
        />
        <span className="caption xl:body-14-r font-medium text-secondary-300">
          일정 잡기
        </span>
      </div>
      <div className="flex h-[calc(100%-48px)]">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateClick}
          formatters={{
            formatCaption: (date: Date) => {
              return `${date.getFullYear()}. ${String(
                date.getMonth() + 1,
              ).padStart(2, "0")}`;
            },
            formatWeekdayName: (date: Date) => {
              return date.toLocaleDateString("en-US", { weekday: "narrow" });
            },
          }}
          className="flex w-full items-center justify-center rounded-md"
          classNames={{
            nav_button_previous:
              "absolute left-[85px] top-[3px] !w-3 !h-3 xl:left-[122px]",
            nav_button_next:
              "absolute right-[85px] top-[3px] !w-3 !h-3 xl:right-[122px]",
            nav_button: "!p-0 bg-transparent opacity-50 hover:opacity-50",
          }}
          modifiers={{ hasEvent: eventDates }}
          components={{
            DayContent: (props: DayContentProps) => (
              <div className="relative flex h-full w-full items-center justify-center">
                {props.date.getDate()}
                {props.activeModifiers.hasEvent &&
                  !props.activeModifiers.today && (
                    <div className="absolute right-0.5 top-0.5 h-1 w-1 rounded-full bg-[#FF9945]" />
                  )}
              </div>
            ),
          }}
        />
      </div>
      {tooltipVisible && (
        <div className="absolute -top-[70px] left-0 md:-top-[60px]">
          <Tooltip
            onClose={closeTooltip}
            message="날짜를 클릭해서 팀 스터디 일정을 등록할 수 있어요! "
            position="max-left"
          />
        </div>
      )}
    </div>
  );
};

export default GroupCalendar;
