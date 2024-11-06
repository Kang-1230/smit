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
      className="my-6 w-[327px] h-[340px] rounded-[20px] border border-[#797272] relative"
      style={{
        background:
          "radial-gradient(64.61% 66.48% at 20.51% 9.53%, rgba(255, 153, 69, 0.11) 20%, rgba(255, 153, 69, 0.00) 100%), linear-gradient(180deg, rgba(47, 47, 47, 0.50) 0%, rgba(103, 103, 103, 0.30) 100%)",
      }}
    >
      <div className="flex items-center gap-1 mt-4 ml-4">
        <Image src={CalendarMonth} alt="calendar" width={16} height={16} />
        <span className="text-secondary-300 caption font-medium">일정잡기</span>
      </div>
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
        className="rounded-md w-full flex justify-center items-center"
        classNames={{
          nav_button_previous: "absolute left-[85px] top-[3px] !w-3 !h-3",
          nav_button_next: "absolute right-[85px] top-[3px] !w-3 !h-3",
          nav_button: "!p-0 bg-transparent opacity-50 hover:opacity-50",
        }}
        modifiers={{ hasEvent: eventDates }}
        components={{
          DayContent: (props: DayContentProps) => (
            <div className="relative w-full h-full flex items-center justify-center">
              {props.date.getDate()}
              {props.activeModifiers.hasEvent &&
                !props.activeModifiers.today && (
                  <div className="absolute w-1 h-1 bg-[#FF9945] rounded-full right-0.5 top-0.5" />
                )}
            </div>
          ),
        }}
      />
    </div>
  );
};

export default GroupCalendar;
