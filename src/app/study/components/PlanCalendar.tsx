"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function PlanCalendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const [numberOfRows, setNumberOfRows] = React.useState<number>(0);

  // 현재 표시되는 달이 변경될 때마다 행 수 계산
  const handleMonthChange = (date: Date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const firstDayOfWeek = firstDay.getDay();
    const totalDays = lastDay.getDate();
    const rows = Math.ceil((firstDayOfWeek + totalDays) / 7);
    setNumberOfRows(rows);
  };
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("w-full md:flex md:h-full md:flex-col", className)}
      onMonthChange={handleMonthChange}
      classNames={{
        months:
          "flex flex-col w-full h-full md:flex-1 md:h-auto md:justify-center",
        month:
          "flex flex-col h-full space-y-4 md:flex-1 md:h-auto md:item-center ",
        caption:
          "flex w-full mt-[8px] relative justify-center items-center text-black md:h-10",
        caption_label:
          "body-16-r md:text-[20px] md:text-secondary-900 md:mt-[12px]",
        nav: "space-x-1 flex items-center",
        nav_button: "h-2 w-2 bg-transparent opacity-50 hover:opacity-50",
        nav_button_previous: "absolute left-[85px] top-[3px]",
        nav_button_next: "absolute right-[85px] top-[3px]",
        table: "w-full md:w-auto flex-1 flex flex-col",
        tbody: cn(
          numberOfRows === 6
            ? "md:space-y-4 md:space-y-2"
            : "mt-[18px] md:mt-[30.97px] md:space-y-4",
        ),
        head_row:
          "flex items-center justify-center md:gap-[28px] border-b border-[#e6e6e6] pb-[14px] mb-2",
        head_cell:
          "w-[43px] md:w-[66px] md:h-[66px] md:items-center md:justify-center md:flex md:text-medium md:text-[16px] caption leading-[12px] tracking-[-0.24px] text-[#BFA28D]",
        row: "flex w-full justify-center h-10 md:gap-[14.5px]",
        cell: "h-10 w-[43px] md:h-[66px] md:w-[66px] text-center flex justify-center items-center relative ",
        day: " text-secondary/900 font-medium text-[12px] caption md:body-16-m w-7 h-7 hover:bg-white/10 rounded-full aria-selected:text-black",
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground w-7 h-7 hover:bg-white/10 md:hover-none hover:text-primary-foreground focus:bg-white/10 focus:text-primary-foreground",
        day_today:
          " w-7 h-7 [&.rdp-button]:text-black rounded-full hover:bg-white/10 hover:text-white md:bg-primary-50 md:rounded-[26px] md:w-[66px] md:h-[66px]",
        day_outside:
          "day-outside text-muted-foreground text-[#B3B3B3] text-[12px] aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      {...props}
    />
  );
}
PlanCalendar.displayName = "PlanCalendar";

export { PlanCalendar };
