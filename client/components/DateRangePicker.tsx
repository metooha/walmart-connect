import { useState, useRef, useEffect } from "react";
import styles from "./DateRangePicker.module.css";

interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

interface DateRangePickerProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
  onCancel: () => void;
}

const PRESETS = [
  { label: "Last 7 days", days: 7 },
  { label: "Last 30 days", days: 30 },
  { label: "Last month", days: -1, type: "lastMonth" },
  { label: "This month", days: -1, type: "thisMonth" },
  { label: "Last two years", days: 730 },
  { label: "Custom range", days: -1, type: "custom" },
];

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function getMonthStart(year: number, month: number): Date {
  return new Date(year, month, 1);
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function addMonths(date: Date, count: number): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() + count);
  d.setDate(1);
  return d;
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

function isToday(d: Date): boolean {
  return isSameDay(d, new Date());
}

function formatDate(d: Date): string {
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
}

function parseDate(str: string): Date | null {
  const parts = str.split("/");
  if (parts.length !== 3) return null;
  const [mm, dd, yyyy] = parts.map(Number);
  if (isNaN(mm) || isNaN(dd) || isNaN(yyyy)) return null;
  return new Date(yyyy, mm - 1, dd);
}

function computePreset(type: string, days: number): DateRange {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (type === "lastMonth") {
    const start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const end = new Date(today.getFullYear(), today.getMonth(), 0);
    return { startDate: start, endDate: end };
  }
  if (type === "thisMonth") {
    const start = new Date(today.getFullYear(), today.getMonth(), 1);
    return { startDate: start, endDate: today };
  }
  if (type === "custom") {
    return { startDate: null, endDate: null };
  }
  const end = new Date(today);
  const start = new Date(today);
  start.setDate(start.getDate() - (days - 1));
  return { startDate: start, endDate: end };
}

function MonthCalendar({
  year,
  month,
  startDate,
  endDate,
  hoverDate,
  onDayClick,
  onDayHover,
}: {
  year: number;
  month: number;
  startDate: Date | null;
  endDate: Date | null;
  hoverDate: Date | null;
  onDayClick: (d: Date) => void;
  onDayHover: (d: Date | null) => void;
}) {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfWeek = getMonthStart(year, month).getDay();

  const rangeEnd = endDate || hoverDate;

  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstDayOfWeek; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));

  function isInRange(d: Date): boolean {
    if (!startDate || !rangeEnd) return false;
    const low = startDate < rangeEnd ? startDate : rangeEnd;
    const high = startDate < rangeEnd ? rangeEnd : startDate;
    return d > low && d < high;
  }

  function isStart(d: Date): boolean {
    return !!startDate && isSameDay(d, startDate);
  }

  function isEnd(d: Date): boolean {
    return !!rangeEnd && isSameDay(d, rangeEnd);
  }

  return (
    <div className={styles.calendar}>
      <div className={styles.calendarHeader}>
        {MONTHS[month]} {year}
      </div>
      <div className={styles.daysOfWeek}>
        {DAYS_OF_WEEK.map(d => <span key={d}>{d}</span>)}
      </div>
      <div className={styles.daysGrid}>
        {cells.map((d, i) => {
          if (!d) return <span key={i} />;
          const start = isStart(d);
          const end = isEnd(d);
          const inRange = isInRange(d);
          const today = isToday(d);
          return (
            <button
              key={i}
              type="button"
              className={[
                styles.dayCell,
                start ? styles.dayStart : "",
                end ? styles.dayEnd : "",
                inRange ? styles.dayInRange : "",
                today ? styles.dayToday : "",
              ].filter(Boolean).join(" ")}
              onClick={() => onDayClick(d)}
              onMouseEnter={() => onDayHover(d)}
              onMouseLeave={() => onDayHover(null)}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function DateRangePicker({ value, onChange, onCancel }: DateRangePickerProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const initialLeft = value.startDate
    ? new Date(value.startDate.getFullYear(), value.startDate.getMonth(), 1)
    : addMonths(today, -1);

  const [leftMonth, setLeftMonth] = useState<Date>(initialLeft);
  const [startDate, setStartDate] = useState<Date | null>(value.startDate);
  const [endDate, setEndDate] = useState<Date | null>(value.endDate);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [activePreset, setActivePreset] = useState<string>("Custom range");
  const [compareEnabled, setCompareEnabled] = useState(false);
  const [startInput, setStartInput] = useState(value.startDate ? formatDate(value.startDate) : "");
  const [endInput, setEndInput] = useState(value.endDate ? formatDate(value.endDate) : "");
  const [selecting, setSelecting] = useState<"start" | "end">("start");

  const rightMonth = addMonths(leftMonth, 1);

  function handlePresetClick(preset: typeof PRESETS[0]) {
    setActivePreset(preset.label);
    const range = computePreset(preset.type || "", preset.days);
    setStartDate(range.startDate);
    setEndDate(range.endDate);
    setStartInput(range.startDate ? formatDate(range.startDate) : "");
    setEndInput(range.endDate ? formatDate(range.endDate) : "");
    if (range.startDate) {
      setLeftMonth(new Date(range.startDate.getFullYear(), range.startDate.getMonth(), 1));
    }
    setSelecting("start");
  }

  function handleDayClick(d: Date) {
    if (selecting === "start") {
      setStartDate(d);
      setEndDate(null);
      setStartInput(formatDate(d));
      setEndInput("");
      setSelecting("end");
      setActivePreset("Custom range");
    } else {
      if (startDate && d < startDate) {
        setEndDate(startDate);
        setStartDate(d);
        setStartInput(formatDate(d));
        setEndInput(formatDate(startDate));
      } else {
        setEndDate(d);
        setEndInput(formatDate(d));
      }
      setSelecting("start");
      setActivePreset("Custom range");
    }
  }

  function handleStartInputBlur() {
    const d = parseDate(startInput);
    if (d) {
      setStartDate(d);
      setLeftMonth(new Date(d.getFullYear(), d.getMonth(), 1));
    }
  }

  function handleEndInputBlur() {
    const d = parseDate(endInput);
    if (d) setEndDate(d);
  }

  function handleApply() {
    onChange({ startDate, endDate });
  }

  function jumpToToday() {
    setLeftMonth(addMonths(today, -1));
  }

  return (
    <div className={styles.pickerContainer}>
      {/* Left sidebar */}
      <div className={styles.sidebar}>
        {/* Compare toggle */}
        <div className={styles.compareSection}>
          <div className={styles.compareRow}>
            <button
              type="button"
              role="switch"
              aria-checked={compareEnabled}
              onClick={() => setCompareEnabled(!compareEnabled)}
              className={[styles.toggle, compareEnabled ? styles.toggleOn : ""].filter(Boolean).join(" ")}
            >
              <span className={styles.toggleThumb} />
            </button>
            <span className={styles.compareLabel}>Compare</span>
          </div>
          <p className={styles.compareDesc}>
            Compare performance data across date ranges. Date ranges must be same length.
          </p>
        </div>

        {/* Presets */}
        <div className={styles.presets}>
          {PRESETS.map(preset => (
            <button
              key={preset.label}
              type="button"
              className={[styles.presetBtn, activePreset === preset.label ? styles.presetActive : ""].filter(Boolean).join(" ")}
              onClick={() => handlePresetClick(preset)}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Right: calendars + inputs */}
      <div className={styles.calendarSection}>
        {/* Date inputs */}
        <div className={styles.dateInputRow}>
          <div className={styles.dateInputGroup}>
            <label className={styles.dateInputLabel}>Start date</label>
            <input
              type="text"
              value={startInput}
              placeholder="mm/dd/yyyy"
              onChange={e => setStartInput(e.target.value)}
              onBlur={handleStartInputBlur}
              className={[styles.dateInput, selecting === "start" ? styles.dateInputActive : ""].filter(Boolean).join(" ")}
            />
          </div>
          <div className={styles.dateInputGroup}>
            <label className={styles.dateInputLabel}>End date</label>
            <input
              type="text"
              value={endInput}
              placeholder="mm/dd/yyyy"
              onChange={e => setEndInput(e.target.value)}
              onBlur={handleEndInputBlur}
              className={[styles.dateInput, selecting === "end" ? styles.dateInputActive : ""].filter(Boolean).join(" ")}
            />
          </div>
        </div>

        {/* Dual calendars */}
        <div className={styles.calendarsRow}>
          {/* Prev arrow */}
          <button type="button" className={styles.navArrow} onClick={() => setLeftMonth(addMonths(leftMonth, -1))}>
            <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
              <path d="M7 1L2 6L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
            </svg>
          </button>

          <MonthCalendar
            year={leftMonth.getFullYear()}
            month={leftMonth.getMonth()}
            startDate={startDate}
            endDate={endDate}
            hoverDate={hoverDate}
            onDayClick={handleDayClick}
            onDayHover={setHoverDate}
          />

          <MonthCalendar
            year={rightMonth.getFullYear()}
            month={rightMonth.getMonth()}
            startDate={startDate}
            endDate={endDate}
            hoverDate={hoverDate}
            onDayClick={handleDayClick}
            onDayHover={setHoverDate}
          />

          {/* Next arrow */}
          <button type="button" className={styles.navArrow} onClick={() => setLeftMonth(addMonths(leftMonth, 1))}>
            <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
              <path d="M1 1L6 6L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
            </svg>
          </button>
        </div>

        {/* Jump to today */}
        <div className={styles.jumpRow}>
          <button type="button" className={styles.jumpLink} onClick={jumpToToday}>
            Jump to today
          </button>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <div className={styles.timezone}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={styles.timezoneIcon}>
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2"/>
              <ellipse cx="8" cy="8" rx="2.5" ry="6.5" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M1.5 8H14.5" stroke="currentColor" strokeWidth="1.2"/>
            </svg>
            <span>Pacific Standard Time</span>
          </div>
          <div className={styles.footerButtons}>
            <button type="button" className={styles.cancelBtn} onClick={onCancel}>
              Cancel
            </button>
            <button
              type="button"
              className={styles.applyBtn}
              onClick={handleApply}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
