"use client";

import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { useCalendarByStudy } from "../[id]/hooks/useCalendar";
import { DayContentProps } from "react-day-picker";

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
    <Calendar
      mode="single"
      selected={date}
      onSelect={handleDateClick}
      className="rounded-md w-full p-4 flex justify-center items-center"
      modifiers={{ hasEvent: eventDates }} // 일정이 있는 날짜들 표시
      components={{
        DayContent: (props: DayContentProps) => (
          <div className="relative w-full h-full flex items-center justify-center">
            {props.date.getDate()}
            {props.activeModifiers.hasEvent && (
              <div className="absolute w-1 h-1 bg-[#FF9945] rounded-full right-2 top-2" />
            )}
          </div>
        ),
      }}
      classNames={{
        day_today: "bg-black text-white font-bold hover:bg-gray-800",
      }}
    />
  );
};

export default GroupCalendar;
