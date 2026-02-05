import React, { useState } from "react";

export function Calendar({ label, value, onChange }) {
  const [selectedDate, setSelectedDate] = useState(() => {
    const d = value || new Date();
    d.setMinutes(0, 0, 0); // Ensure minutes and seconds are 0
    return d;
  });

  // Update parent when internal date changes
  const handleDateChange = (e) => {
    const newDate = new Date(selectedDate);
    newDate.setFullYear(e.target.valueAsDate.getFullYear());
    newDate.setMonth(e.target.valueAsDate.getMonth());
    newDate.setDate(e.target.valueAsDate.getDate());
    newDate.setMinutes(0, 0, 0); // Reset minutes & seconds
    setSelectedDate(newDate);
    onChange(newDate);
  };

  const handleHourChange = (e) => {
    const newDate = new Date(selectedDate);
    newDate.setHours(parseInt(e.target.value, 10), 0, 0, 0); // Reset minutes & seconds
    setSelectedDate(newDate);
    onChange(newDate);
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      <div className="flex gap-2">
        {/* Date Picker */}
        <input
          type="date"
          value={selectedDate.toISOString().split("T")[0]}
          onChange={handleDateChange}
          className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Hour Selector */}
        <select
          value={selectedDate.getHours()}
          onChange={handleHourChange}
          className="border rounded px-3 py-2 w-28 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {Array.from({ length: 24 }, (_, i) => (
            <option key={i} value={i}>
              {i}:00
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
