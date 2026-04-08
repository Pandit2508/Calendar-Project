import React, { useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  format,
} from "date-fns";
import DayCell from "./DayCell";
import { useImageTheme } from "../../hooks/useImageTheme";
import { getHoliday } from "../utils/isHoliday";
import HolidayModal from "../HolidayModal"; 

const CalendarGrid = ({
  currentMonth,
  setCurrentMonth,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) => {
  const imageUrl =
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb";

  const { primary, secondary, accent } = useImageTheme(imageUrl);

  //modal state
  const [selectedHoliday, setSelectedHoliday] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const generateDays = () => {
    const start = startOfWeek(startOfMonth(currentMonth));
    const end = endOfWeek(endOfMonth(currentMonth));

    const days = [];
    let day = start;

    while (day <= end) {
      days.push(day);
      day = addDays(day, 1);
    }

    return days;
  };

  const days = generateDays();

  const handleDateClick = (date) => {
    const holiday = getHoliday(date);

    
    if (holiday) {
      setSelectedHoliday(holiday);
      setSelectedDate(date);
      return;
    }

    
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else {
      if (date < startDate) {
        setEndDate(startDate);
        setStartDate(date);
      } else {
        setEndDate(date);
      }
    }
  };

  return (
    <div
      className="p-4 rounded-xl"
      style={{
        background: `linear-gradient(135deg, ${primary}, ${secondary})`,
        color: "white",
        transition: "all 0.4s ease",
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="px-3 py-1 rounded"
          style={{
            backgroundColor: secondary,
            border: `1px solid ${accent}`,
            color: "white",
          }}
        >
          ←
        </button>

        <h2
          className="text-lg font-semibold"
          style={{ color: accent }}
        >
          {format(currentMonth, "MMMM yyyy")}
        </h2>

        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="px-3 py-1 rounded"
          style={{
            backgroundColor: secondary,
            border: `1px solid ${accent}`,
            color: "white",
          }}
        >
          →
        </button>
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 text-center font-medium mb-2">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <div key={day} style={{ color: accent }}>
            {day}
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, idx) => (
          <DayCell
            key={idx}
            day={day}
            currentMonth={currentMonth}
            startDate={startDate}
            endDate={endDate}
            onDateClick={handleDateClick}
            accent={accent}
            secondary={secondary}
          />
        ))}
      </div>

      {/* Holiday Modal */}
      <HolidayModal
        holiday={selectedHoliday}
        date={selectedDate}
        onClose={() => setSelectedHoliday(null)}
      />
    </div>
  );
};

export default CalendarGrid;