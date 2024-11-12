"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("w-full", className)}
      classNames={{
        months: "flex flex-col w-full",
        month:
          "flex flex-col space-y-[18px] inset-0 absolute justify-center items-center",
        caption:
          "flex  w-full mt-[22px] relative justify-center items-center text-white",
        caption_label: "body-16-r",
        nav: "space-x-1 flex items-center",
        nav_button: "h-2 w-2 bg-transparent opacity-50 hover:opacity-50",
        nav_button_previous: "absolute left-[85px] top-[3px]",
        nav_button_next: "absolute right-[85px] top-[3px]",
        table: "w-full border-collapse",
        head_row:
          "flex items-center justify-center border-b border-[#797272] border-b pb-[14px] mb-3",
        head_cell:
          "text-muted-foreground w-[43px] mt-1 font-medium text-xs leading-[12px] tracking-[-0.24px] text-secondary-200",
        row: "flex w-full justify-center",
        cell: "h-10 w-[43px] text-center flex justify-center items-center relative",
        day: "text-white font-medium text-[12px] caption w-7 h-7 hover:bg-white/10 rounded-full",
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground w-7 h-7 hover:bg-white/10 hover:text-primary-foreground focus:bg-white/10 focus:text-primary-foreground",
        day_today:
          "bg-primary-50 w-7 h-7 text-[#000] rounded-full font-bold hover:bg-white/10 hover:text-white",
        day_outside:
          "day-outside text-muted-foreground text-white/30 text-[12px] aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
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
Calendar.displayName = "Calendar";

export { Calendar };
