
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { format } from "date-fns";
import { Search } from "lucide-react";
import { type DateRange } from "react-day-picker";

import { DateRangePicker } from "./date-range-picker";
import { MAX_INFANTS } from "@/lib/booking-rules";
import { toValidDate } from "@/lib/date-utils";

type HomeSearchBarProps = {
  initialLocation?: string;
  initialGuests?: string;
  initialAdults?: string;
  initialChildren?: string;
  initialInfants?: string;
  initialCheckIn?: string;
  initialCheckOut?: string;
};

function SearchSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-70 md:w-auto"
    >
      <Search className="h-4 w-4 shrink-0" />
      {pending ? "Searching..." : "Search"}
    </button>
  );
}

export function HomeSearchBar({
  initialLocation,
  initialGuests,
  initialAdults,
  initialChildren,
  initialInfants,
  initialCheckIn,
  initialCheckOut,
}: HomeSearchBarProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [activePanel, setActivePanel] = useState<
    "where" | "when" | "who" | null
  >(null);

  const [location, setLocation] = useState(initialLocation ?? "");

  const [adults, setAdults] = useState(
    Number(initialAdults || initialGuests || 1)
  );

  const [children, setChildren] = useState(
    Number(initialChildren || 0)
  );

  const [infants, setInfants] = useState(
    Number(initialInfants || 0)
  );

  const [range, setRange] = useState<DateRange | undefined>({
    from: toValidDate(initialCheckIn),
    to: toValidDate(initialCheckOut),
  });

  const [isDesktopViewport, setIsDesktopViewport] = useState(false);

  const totalGuests = adults + children + infants;

  const whenLabel = useMemo(() => {
    if (!range?.from && !range?.to) {
      return "Add dates";
    }

    if (range?.from && !range?.to) {
      return `${format(range.from, "MMM d")} - Add`;
    }

    if (range?.from && range?.to) {
      return `${format(range.from, "MMM d")} - ${format(
        range.to,
        "MMM d"
      )}`;
    }

    return "Add dates";
  }, [range]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const syncViewport = () => {
      setIsDesktopViewport(mediaQuery.matches);
    };

    syncViewport();

    mediaQuery.addEventListener("change", syncViewport);

    return () => {
      mediaQuery.removeEventListener("change", syncViewport);
    };
  }, []);

  useEffect(() => {
    function onMouseDown(event: MouseEvent) {
      if (!containerRef.current) return;

      const target = event.target as Node;

      if (!containerRef.current.contains(target)) {
        setActivePanel(null);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActivePanel(null);
      }
    }

    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative z-10 w-full rounded-2xl bg-surface p-2 shadow-sm sm:rounded-3xl sm:p-3 md:rounded-[32px] md:border md:border-ink-200 md:p-4"
    >
      {/* Background Overlay */}
      {activePanel && (
        <button
          type="button"
          aria-label="Close search panel"
          className="fixed inset-0 z-10 cursor-default bg-ink-900/20 backdrop-blur-[1px]"
          onClick={() => setActivePanel(null)}
        />
      )}

      <form
        action="/"
        method="GET"
        className="relative z-10 rounded-2xl border border-ink-300 p-2 shadow-sm sm:p-3 md:rounded-full md:p-1.5"
      >
        {/* Mobile Search */}
        <div className="space-y-2 md:hidden">
          {/* Where */}
          <button
            type="button"
            aria-expanded={activePanel === "where"}
            onClick={() =>
              setActivePanel(activePanel === "where" ? null : "where")
            }
            className={`w-full min-w-0 rounded-xl border px-4 py-3 text-left transition sm:rounded-2xl ${
              activePanel === "where"
                ? "border-brand-400 bg-brand-50"
                : "border-ink-200 bg-surface hover:bg-ink-100"
            }`}
          >
            <span className="block text-xs font-semibold text-ink-900">
              Where
            </span>

            <span className="block truncate text-sm text-ink-600">
              {location || "Choose a destination"}
            </span>
          </button>

          {/* When */}
          <button
            type="button"
            aria-expanded={activePanel === "when"}
            onClick={() =>
              setActivePanel(activePanel === "when" ? null : "when")
            }
            className={`w-full rounded-xl border px-4 py-3 text-left transition sm:rounded-2xl ${
              activePanel === "when"
                ? "border-brand-400 bg-brand-50"
                : "border-ink-200 bg-surface hover:bg-ink-100"
            }`}
          >
            <span className="block text-xs font-semibold text-ink-900">
              When
            </span>

            <span className="block text-sm text-ink-600">
              {whenLabel}
            </span>
          </button>

          {/* Who */}
          <button
            type="button"
            aria-expanded={activePanel === "who"}
            onClick={() =>
              setActivePanel(activePanel === "who" ? null : "who")
            }
            className={`w-full rounded-xl border px-4 py-3 text-left transition sm:rounded-2xl ${
              activePanel === "who"
                ? "border-brand-400 bg-brand-50"
                : "border-ink-200 bg-surface hover:bg-ink-100"
            }`}
          >
            <span className="block text-xs font-semibold text-ink-900">
              Who
            </span>

            <span className="block text-sm text-ink-600">
              {totalGuests > 0
                ? `${totalGuests} guest${totalGuests > 1 ? "s" : ""}`
                : "Add travelers"}
            </span>
          </button>

          <div className="pt-1">
            <SearchSubmitButton />
          </div>
        </div>

        {/* Desktop Search */}
        <div className="hidden min-w-0 items-center gap-1 md:grid md:grid-cols-[minmax(0,1.5fr)_minmax(0,1.5fr)_minmax(0,1fr)_auto]">
          {/* Where */}
          <button
            type="button"
            aria-expanded={activePanel === "where"}
            onClick={() =>
              setActivePanel(activePanel === "where" ? null : "where")
            }
            className={`min-w-0 rounded-full border border-transparent px-3 py-2 text-left transition lg:px-4 ${
              activePanel === "where"
                ? "bg-ink-100"
                : "hover:bg-ink-100"
            }`}
          >
            <span className="block text-xs font-semibold text-ink-900">
              Where
            </span>

            <span className="block truncate text-sm text-ink-600">
              {location || "Choose a destination"}
            </span>
          </button>

          {/* When */}
          <button
            type="button"
            aria-expanded={activePanel === "when"}
            onClick={() =>
              setActivePanel(activePanel === "when" ? null : "when")
            }
            className={`min-w-0 rounded-full border border-transparent px-3 py-2 text-left transition lg:px-4 ${
              activePanel === "when"
                ? "bg-ink-100"
                : "hover:bg-ink-100"
            }`}
          >
            <span className="block text-xs font-semibold text-ink-900">
              When
            </span>

            <span className="block truncate text-sm text-ink-600">
              {whenLabel}
            </span>
          </button>

          {/* Who */}
          <button
            type="button"
            aria-expanded={activePanel === "who"}
            onClick={() =>
              setActivePanel(activePanel === "who" ? null : "who")
            }
            className={`min-w-0 rounded-full border border-transparent px-3 py-2 text-left transition lg:px-4 ${
              activePanel === "who"
                ? "bg-ink-100"
                : "hover:bg-ink-100"
            }`}
          >
            <span className="block text-xs font-semibold text-ink-900">
              Who
            </span>

            <span className="block truncate text-sm text-ink-600">
              {totalGuests > 0
                ? `${totalGuests} guest${totalGuests > 1 ? "s" : ""}`
                : "Add travelers"}
            </span>
          </button>

          <SearchSubmitButton />
        </div>

        {/* Search Parameters */}
        <input type="hidden" name="location" value={location} />
        <input type="hidden" name="guests" value={totalGuests} />
        <input type="hidden" name="adults" value={adults} />
        <input type="hidden" name="children" value={children} />
        <input type="hidden" name="infants" value={infants} />

        <input
          type="hidden"
          name="checkIn"
          value={range?.from ? format(range.from, "yyyy-MM-dd") : ""}
        />

        <input
          type="hidden"
          name="checkOut"
          value={range?.to ? format(range.to, "yyyy-MM-dd") : ""}
        />
      </form>

      {/* Destination Panel */}
      {activePanel === "where" && (
        <div
          className="fixed inset-0 z-20 flex items-center justify-center p-3 sm:p-4 md:absolute md:inset-auto md:left-3 md:top-[88px] md:block md:w-[min(420px,calc(100vw-2rem))]"
          onClick={() => setActivePanel(null)}
        >
          <div
            className="max-h-[calc(100dvh-2rem)] w-full overflow-y-auto rounded-2xl border border-ink-200 bg-surface p-4 shadow-xl sm:rounded-3xl sm:p-5"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="mb-3 text-sm font-semibold text-ink-900">
              Popular destinations
            </p>

            <div className="space-y-1">
              {[
                "New York, United States",
                "Los Angeles, United States",
                "Miami, United States",
                "Chicago, United States",
                "San Francisco, United States",
              ].map((city) => (
                <button
                  key={city}
                  type="button"
                  className="block min-h-11 w-full rounded-xl px-3 py-2 text-left text-sm text-ink-700 transition hover:bg-ink-100"
                  onClick={() => {
                    setLocation(city);
                    setActivePanel(null);
                  }}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Date Panel */}
      {activePanel === "when" && (
        <div
          className="fixed inset-0 z-20 flex items-center justify-center p-2 sm:p-4 md:absolute md:inset-auto md:left-1/2 md:top-[88px] md:block md:w-[min(960px,calc(100vw-2rem))] md:-translate-x-1/2"
          onClick={() => setActivePanel(null)}
        >
          <div
            className="max-h-[calc(100dvh-1rem)] w-full max-w-md overflow-auto rounded-2xl border border-ink-200 bg-surface p-3 shadow-xl sm:max-h-[calc(100dvh-2rem)] sm:rounded-3xl sm:p-4 md:max-h-[calc(100dvh-7rem)] md:max-w-none md:rounded-[32px] md:p-5"
            onClick={(event) => event.stopPropagation()}
          >
            <DateRangePicker
              selected={range}
              onSelect={setRange}
              numberOfMonths={isDesktopViewport ? 2 : 1}
            />
          </div>
        </div>
      )}

      {/* Guest Panel */}
      {activePanel === "who" && (
        <div
          className="fixed inset-0 z-20 flex items-center justify-center p-3 sm:p-4 md:absolute md:inset-auto md:right-3 md:top-[88px] md:block md:w-[min(360px,calc(100vw-2rem))]"
          onClick={() => setActivePanel(null)}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-ink-200 bg-surface p-4 shadow-xl sm:rounded-3xl sm:p-5 md:max-w-none"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Adults */}
            <div className="flex items-center justify-between gap-3 border-b border-ink-200 py-3">
              <div>
                <p className="font-semibold text-ink-900">Adults</p>
                <p className="text-sm text-ink-500">Ages 13 or above</p>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <button
                  type="button"
                  aria-label="Decrease adults"
                  disabled={adults <= 1}
                  className="h-9 w-9 rounded-full border border-ink-300 text-ink-700 transition hover:bg-ink-100 disabled:opacity-40"
                  onClick={() =>
                    setAdults((prev) => Math.max(1, prev - 1))
                  }
                >
                  -
                </button>

                <span className="w-5 text-center tabular-nums">
                  {adults}
                </span>

                <button
                  type="button"
                  aria-label="Increase adults"
                  className="h-9 w-9 rounded-full border border-ink-300 text-ink-700 transition hover:bg-ink-100"
                  onClick={() => setAdults((prev) => prev + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Children */}
            <div className="flex items-center justify-between gap-3 border-b border-ink-200 py-3">
              <div>
                <p className="font-semibold text-ink-900">Children</p>
                <p className="text-sm text-ink-500">Ages 2 to 12</p>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <button
                  type="button"
                  aria-label="Decrease children"
                  disabled={children <= 0}
                  className="h-9 w-9 rounded-full border border-ink-300 text-ink-700 transition hover:bg-ink-100 disabled:opacity-40"
                  onClick={() =>
                    setChildren((prev) => Math.max(0, prev - 1))
                  }
                >
                  -
                </button>

                <span className="w-5 text-center tabular-nums">
                  {children}
                </span>

                <button
                  type="button"
                  aria-label="Increase children"
                  className="h-9 w-9 rounded-full border border-ink-300 text-ink-700 transition hover:bg-ink-100"
                  onClick={() => setChildren((prev) => prev + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Infants */}
            <div className="flex items-center justify-between gap-3 py-3">
              <div>
                <p className="font-semibold text-ink-900">Infants</p>
                <p className="text-sm text-ink-500">Under 2</p>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <button
                  type="button"
                  aria-label="Decrease infants"
                  disabled={infants <= 0}
                  className="h-9 w-9 rounded-full border border-ink-300 text-ink-700 transition hover:bg-ink-100 disabled:opacity-40"
                  onClick={() =>
                    setInfants((prev) => Math.max(0, prev - 1))
                  }
                >
                  -
                </button>

                <span className="w-5 text-center tabular-nums">
                  {infants}
                </span>

                <button
                  type="button"
                  aria-label="Increase infants"
                  disabled={infants >= MAX_INFANTS}
                  className="h-9 w-9 rounded-full border border-ink-300 text-ink-700 transition hover:bg-ink-100 disabled:opacity-40"
                  onClick={() =>
                    setInfants((prev) =>
                      Math.min(MAX_INFANTS, prev + 1)
                    )
                  }
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
