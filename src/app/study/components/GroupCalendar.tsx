"use client";

import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { useCalendarByStudy } from "../[id]/hooks/useCalendar";
import { DayContentProps } from "react-day-picker";
import Image from "next/image";
import CalendarMonth from "../../../../public/icons/CalenderMonth.svg";

const GroupCalendar = ({ studyId }: { studyId: string }) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const { data } = useCalendarByStudy(studyId);
  const router = useRouter();

  const handleDateClick = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      setDate(selectedDate);
      router.push(`/study/${studyId}/${formattedDate}`);
    }
  };

  const eventDates = data?.map((event) => new Date(event.event_date)) || [];

  return (
    <div
      className="relative my-6 h-[362px] w-[327px] rounded-[20px] border border-[#797272]"
      style={{
        background:
          "radial-gradient(64.61% 66.48% at 20.51% 9.53%, rgba(255, 153, 69, 0.11) 20%, rgba(255, 153, 69, 0.00) 100%), linear-gradient(180deg, rgba(47, 47, 47, 0.50) 0%, rgba(103, 103, 103, 0.30) 100%)",
      }}
    >
      <div className="ml-4 mt-4 flex items-center gap-1">
        <Image src={CalendarMonth} alt="calendar" width={16} height={16} />
        <span className="caption font-medium text-secondary-300">
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
            nav_button_previous: "absolute left-[85px] top-[3px] !w-3 !h-3",
            nav_button_next: "absolute right-[85px] top-[3px] !w-3 !h-3",
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
    </div>
  );
};

export default GroupCalendar;
