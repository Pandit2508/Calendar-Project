import React, { useEffect, useState } from "react";
import { format } from "date-fns";

const NotesPanel = ({ startDate, endDate, currentMonth }) => {
  const [notesMap, setNotesMap] = useState({});
  const [input, setInput] = useState("");
  const [isLoaded, setIsLoaded] = useState(false); // 🔥 critical

  //  Generate key
  const getKey = () => {
    if (startDate && endDate) {
      return `${format(startDate, "yyyy-MM-dd")}_${format(endDate, "yyyy-MM-dd")}`;
    }

    if (startDate) {
      return `${format(startDate, "yyyy-MM-dd")}_${format(startDate, "yyyy-MM-dd")}`;
    }

    return format(currentMonth, "yyyy-MM");
  };

  const currentKey = getKey();

  //  Load notes ONCE
  useEffect(() => {
    const saved = localStorage.getItem("calendar_notes_map");
    if (saved) {
      try {
        setNotesMap(JSON.parse(saved));
      } catch {
        setNotesMap({});
      }
    }
    setIsLoaded(true);
  }, []);

  //  Save notes (only after load)
  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem("calendar_notes_map", JSON.stringify(notesMap));
  }, [notesMap, isLoaded]);

  //  Sync input (ONLY after load)
  useEffect(() => {
    if (!isLoaded) return;

    if (notesMap.hasOwnProperty(currentKey)) {
      setInput(notesMap[currentKey]);
    } else {
      setInput("");
    }
  }, [currentKey, notesMap, isLoaded]);

  //  Handle typing
  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);

    setNotesMap((prev) => ({
      ...prev,
      [currentKey]: value,
    }));
  };

  return (
    <div className="h-full flex flex-col">
      
      {/* Header */}
      <h3 className="text-lg font-semibold mb-1">Notes</h3>

      {/* Context */}
      <p className="text-xs text-gray-500 mb-2 font-medium">
        {
          startDate && endDate
            ? startDate.getTime() === endDate.getTime()
              ? `Notes for ${format(startDate, "EEE, dd MMMM yyyy")}`
              : `Notes for ${format(startDate, "EEE, dd MMM")} - ${format(endDate, "EEE, dd MMM yyyy")}`
            : startDate
            ? `Notes for ${format(startDate, "EEE, dd MMMM yyyy")}`
            : `Notes for ${format(currentMonth, "MMMM yyyy")}`
        }
      </p>

      {/* Textarea */}
      <textarea
        placeholder="Write your notes here..."
        value={input}
        onChange={handleChange}
        className="flex-1 resize-none border rounded-lg p-3 outline-none 
                   focus:ring-2 focus:ring-blue-400 
                   shadow-inner bg-gray-50 transition-all duration-200"
      />

      {/* Footer */}
      <p className="text-xs text-gray-400 mt-2">
        Auto-saved locally
      </p>
    </div>
  );
};

export default NotesPanel;