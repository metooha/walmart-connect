import * as React from "react";
import { ChevronLeft, ChevronRight } from "@/components/icons";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/Button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

/**
 * @deprecated This component is deprecated. Use DatePickerCalendar from '@/components/ui/DatePickerCalendar' instead.
 * This component will be removed in a future version.
 *
 * The new DatePickerCalendar component:
 * - Follows LD 3.5 design specifications exactly
 * - Has better token usage and styling
 * - Supports week numbers variant
 * - Has improved accessibility
 */
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
        month: "space-y-3",
        caption: "flex justify-center pt-0 pb-3 relative items-center mb-2",
        caption_label: "text-sm font-bold text-foreground",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          "h-7 w-7 bg-transparent p-0 hover:bg-muted rounded inline-flex items-center justify-center",
        ),
        nav_button_previous: "absolute left-0",
        nav_button_next: "absolute right-0",
        table: "w-full border-collapse",
        head_row: "flex mb-2",
        head_cell:
          "text-foreground rounded-md w-9 font-bold text-xs uppercase",
        row: "flex w-full mt-1",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-full [&:has([aria-selected].day-outside)]:bg-primary/10 [&:has([aria-selected])]:bg-primary/10 first:[&:has([aria-selected])]:rounded-full last:[&:has([aria-selected])]:rounded-full focus-within:relative focus-within:z-20",
        day: cn(
          "h-9 w-9 p-0 font-normal text-sm text-foreground hover:bg-muted rounded-full aria-selected:opacity-100",
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-white hover:bg-primary/90 hover:text-white focus:bg-primary focus:text-white rounded-full",
        day_today: "bg-transparent border border-primary text-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-primary/10 aria-selected:text-muted-foreground aria-selected:opacity-50",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-primary/10 aria-selected:text-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: (props) => {
          if (props.orientation === "left") {
            return <ChevronLeft className="h-4 w-4 text-foreground" />;
          }
          return <ChevronRight className="h-4 w-4 text-foreground" />;
        },
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
