
"use client";

import { useState } from "react";
import { addDays, addMonths } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  DayPicker,
  type DateRange,
  type Matcher,
} from "react-day-picker";

type DateRangePickerProps = {
  selected?: DateRange;
  onSelect: (range: DateRange | undefined) => void;
  disabled?: Matcher | Matcher[];
  numberOfMonths?: number;
  className?: string;
};

export function DateRangePicker({
  selected,
  onSelect,
  disabled,
  numberOfMonths = 2,
  className = "hero-daypicker mx-auto w-full max-w-full",
}: DateRangePickerProps) {
  const [month, setMonth] = useState<Date>(
    selected?.from ?? new Date()
  );

  const disabledDates: Matcher[] = [
    { before: addDays(new Date(), -1) },
    ...(Array.isArray(disabled)
      ? disabled
      : disabled
        ? [disabled]
        : []),
  ];

  return (
    <div className="w-full min-w-0">
      {/* Calendar Navigation */}
      <div className="mb-4 flex items-center justify-center gap-3">
        <button
          type="button"
          aria-label="Previous month"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-300 text-ink-700 transition hover:bg-ink-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300"
          onClick={() =>
            setMonth((previous) => addMonths(previous, -1))
          }
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <button
          type="button"
          aria-label="Next month"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-300 text-ink-700 transition hover:bg-ink-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300"
          onClick={() =>
            setMonth((previous) => addMonths(previous, 1))
          }
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Date Range Calendar */}
      <div className="w-full min-w-0 overflow-x-auto">
        <DayPicker
          mode="range"
          selected={selected}
          onSelect={onSelect}
          numberOfMonths={numberOfMonths}
          month={month}
          onMonthChange={setMonth}
          className={className}
          classNames={{
            months:
              "mx-auto flex w-full flex-col items-center gap-6 md:flex-row md:justify-center md:gap-8",
            month: "mx-auto w-full min-w-0 max-w-[320px]",
            month_caption:
              "relative flex items-center justify-center pb-3 pt-1",
            caption_label: "text-sm font-semibold text-ink-900",
            nav: "hidden",
            weekdays: "mx-auto w-full",
            weekday:
              "w-10 text-center text-xs font-medium text-ink-500",
            week: "mx-auto w-full",
            day: "h-10 w-10 p-0 text-center text-sm",
            day_button:
              "flex h-10 w-10 items-center justify-center rounded-full text-sm transition hover:bg-ink-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300",
            disabled: "text-ink-300 line-through opacity-70",
            selected: "bg-brand-500 text-white hover:bg-brand-600",
            range_middle: "bg-brand-50 text-ink-900",
            range_start: "rounded-l-full bg-brand-500 text-white",
            range_end: "rounded-r-full bg-brand-500 text-white",
            today: "font-semibold text-brand-700",
            outside: "text-ink-300 opacity-50",
          }}
          disabled={disabledDates}
          excludeDisabled
        />
      </div>
    </div>
  );
}
