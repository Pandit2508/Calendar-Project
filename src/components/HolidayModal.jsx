import React from "react";
import { format } from "date-fns";

const HolidayModal = ({ holiday, date, onClose }) => {
  if (!holiday) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-6 w-80 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-2">
          🎉 {holiday.name}
        </h2>

        <p className="text-gray-600 mb-4">
          {format(date, "PPP")}
        </p>

        <button
          onClick={onClose}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default HolidayModal;