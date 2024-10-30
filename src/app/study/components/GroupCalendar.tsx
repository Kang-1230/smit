"use client";

import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

const GroupCalendar = ({ studyId }: { studyId: string }) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const router = useRouter();

  const handleDateClick = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      setDate(selectedDate);
      router.push(`/study/${studyId}/${formattedDate}`);
    }
  };

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={handleDateClick}
      className="rounded-md w-full p-4 flex justify-center items-center"
      classNames={{
        day_today: "bg-black text-white font-bold hover:bg-gray-800",
      }}
    />
  );
};

export default GroupCalendar;
