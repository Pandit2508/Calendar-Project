import React, { useEffect, useState } from "react";
import CalendarGrid from "../Calendar/CalendarGrid";
import NotesPanel from "../Notes/NotesPanel";

const CalendarLayout = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [isLoaded, setIsLoaded] = useState(false);

  const [imageUrl, setImageUrl] = useState(
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
  );

  // LOAD
  useEffect(() => {
    const savedMonth = localStorage.getItem("selected_month");
    const savedStart = localStorage.getItem("selected_start");
    const savedEnd = localStorage.getItem("selected_end");

    if (savedMonth) setCurrentMonth(new Date(savedMonth));

    if (savedStart) {
      const start = new Date(savedStart);
      setStartDate(start);

      if (!savedEnd) {
        setEndDate(start);
      }
    }

    if (savedEnd) {
      setEndDate(new Date(savedEnd));
    }

    setIsLoaded(true);
  }, []);

  // 🔥 FIX: reset on month change
  useEffect(() => {
    if (!isLoaded) return;

    setStartDate(null);
    setEndDate(null);
  }, [currentMonth]);

  // SAVE
  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem("selected_month", currentMonth.toISOString());

    if (startDate) {
      localStorage.setItem("selected_start", startDate.toISOString());
    }

    if (endDate) {
      localStorage.setItem("selected_end", endDate.toISOString());
    }

    if (startDate && !endDate) {
      localStorage.setItem("selected_end", startDate.toISOString());
    }
  }, [currentMonth, startDate, endDate, isLoaded]);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden w-full max-w-5xl">

        <div className="relative h-60 md:h-72">
          <img
            src={imageUrl}
            alt="calendar hero"
            className="w-full h-full object-cover transition-all duration-500"
          />

          <div className="absolute bottom-4 right-4 text-white text-right">
            <h2 className="text-2xl md:text-3xl font-bold">
              {currentMonth.toLocaleString("default", { month: "long" })}
            </h2>
            <p className="text-sm opacity-80">
              {currentMonth.getFullYear()}
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row">

          <div className="md:w-1/3 border-r p-4">
            <NotesPanel
              startDate={startDate}
              endDate={endDate}
              currentMonth={currentMonth}
            />
          </div>

          <div className="md:w-2/3 p-4">
            <CalendarGrid
              currentMonth={currentMonth}
              setCurrentMonth={setCurrentMonth}
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarLayout;