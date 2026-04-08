import React from "react";
import { getHoliday } from "../utils/isHoliday";
import {
  format,
  isSameDay,
  isWithinInterval,
  isToday,
} from "date-fns";

const DayCell = ({
  day,
  currentMonth,
  startDate,
  endDate,
  onDateClick,
}) => {
  const holiday = getHoliday(day);

  const isStart = startDate && isSameDay(day, startDate);
  const isEnd = endDate && isSameDay(day, endDate);

  const isInRange =
    startDate &&
    endDate &&
    isWithinInterval(day, { start: startDate, end: endDate });

  const isCurrentMonth = day.getMonth() === currentMonth.getMonth();

  const isWeekend = day.getDay() === 6;

  let baseStyles = `
    relative
    p-2 text-center rounded-lg cursor-pointer text-sm
    transform transition-all duration-200 ease-out
    active:scale-95
  `;

  let stateStyles = "";

  if (isStart || isEnd) {
    stateStyles = "bg-blue-600 text-white shadow-lg scale-105 z-10";
  } else if (isInRange) {
    stateStyles = "bg-blue-100";
  } else {
    stateStyles =
      "hover:bg-gray-200 hover:scale-105 hover:shadow-md";
  }

  return (
    <div
      onClick={() => onDateClick(day)}
      title={holiday ? holiday.name : ""}
      className={`
        ${baseStyles}
        ${!isCurrentMonth ? "opacity-40" : ""}
        ${isWeekend && isCurrentMonth ? "text-blue-400" : ""}
        ${isToday(day) ? "border border-blue-500" : ""}
        ${
          holiday && isCurrentMonth && !(isStart || isEnd)
            ? "ring-1 ring-slate-50"
            : ""
        }
        ${stateStyles}
      `}
    >
      <span className="inline-block w-8 h-8 leading-8 rounded-full">
        {format(day, "d")}
      </span>

      {holiday && isCurrentMonth && !(isStart || isEnd) && (
        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mx-auto mt-1 animate-pulse" />
      )}
    </div>
  );
};

export default DayCell;