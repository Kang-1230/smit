"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

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
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center text-white",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-50",
        ),
        nav_button_previous: "absolute left-2",
        nav_button_next: "absolute right-0",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground w-10 font-normal text-[0.8rem] text-tertiary-75",
        row: "flex w-full flex mt-2",
        cell: "h-[30px] w-10 text-center p-0 flex justify-center items-center relative",
        day: "h-9 w-9 p-0 text-white font-medium caption w-[20px] h-[20px] hover:bg-white/10 rounded-full",
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground w-[20px] h-[20px] hover:bg-white/10 hover:text-primary-foreground focus:bg-white/10 focus:text-primary-foreground",
        day_today:
          "bg-primary-50 text-[#000] w-[20px] h-[20px] rounded-full font-bold hover:bg-white/10 hover:text-white",
        day_outside:
          "day-outside text-muted-foreground text-secondary-200 text-xs aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className="h-4 w-4" />,
        IconRight: () => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
