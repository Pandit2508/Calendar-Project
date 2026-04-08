import React, { useEffect, useState } from "react";
import CalendarGrid from "../Calendar/CalendarGrid";
import NotesPanel from "../Notes/NotesPanel";

const CalendarLayout = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [isLoaded, setIsLoaded] = useState(false); //

  // LOAD state (only once, safely)
  useEffect(() => {
    const savedMonth = localStorage.getItem("selected_month");
    const savedStart = localStorage.getItem("selected_start");
    const savedEnd = localStorage.getItem("selected_end");

    if (savedMonth) setCurrentMonth(new Date(savedMonth));

    if (savedStart) {
      const start = new Date(savedStart);
      setStartDate(start);

      // if no end saved, treat as single-day selection
      if (!savedEnd) {
        setEndDate(start);
      }
    }

    if (savedEnd) {
      setEndDate(new Date(savedEnd));
    }

    setIsLoaded(true);
  }, []);

  // SAVE state (only after load completes)
  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem("selected_month", currentMonth.toISOString());

    if (startDate) {
      localStorage.setItem("selected_start", startDate.toISOString());
    }

    if (endDate) {
      localStorage.setItem("selected_end", endDate.toISOString());
    }

    // ensure single-date consistency
    if (startDate && !endDate) {
      localStorage.setItem("selected_end", startDate.toISOString());
    }
  }, [currentMonth, startDate, endDate, isLoaded]);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden w-full max-w-5xl">
        
        {/* Hero Image */}
        <div className="relative h-60 md:h-72">
          <img
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
            alt="calendar hero"
            className="w-full h-full object-cover"
          />

          {/* Dynamic Month */}
          <div className="absolute bottom-4 right-4 text-white text-right">
            <h2 className="text-2xl md:text-3xl font-bold">
              {currentMonth.toLocaleString("default", { month: "long" })}
            </h2>
            <p className="text-sm opacity-80">
              {currentMonth.getFullYear()}
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row">
          
          {/* Notes */}
          <div className="md:w-1/3 border-r p-4">
            <NotesPanel
              startDate={startDate}
              endDate={endDate}
              currentMonth={currentMonth}
            />
          </div>

          {/* Calendar */}
          <div className="md:w-2/3 p-4">
            <CalendarGrid
              currentMonth={currentMonth}
              setCurrentMonth={setCurrentMonth}
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarLayout;