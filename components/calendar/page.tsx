import React, { ChangeEvent, useState } from "react";

type CalendarProps = {
  label?: string;
  value?: Date;
  onChange?: (date: Date) => void;
};

export function Calendar({ label, value, onChange }: CalendarProps) {
  const [selectedDate, setSelectedDate] = useState(() => {
    const d = value || new Date();
    d.setMinutes(0, 0, 0); // Ensure minutes and seconds are 0
    return d;
  });

  // Update parent when internal date changes
  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputDate = e.target.valueAsDate;
    if (!inputDate) return; // exit if the input is empty

    const newDate = new Date(selectedDate ?? new Date());
    newDate.setFullYear(inputDate.getFullYear());
    newDate.setMonth(inputDate.getMonth());
    newDate.setDate(inputDate.getDate());
    newDate.setMinutes(0, 0, 0); // reset time

    setSelectedDate(newDate);
    if (onChange) onChange(newDate);
  };
  const handleHourChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (!e.target.value) return;

    const newDate = new Date(selectedDate ?? new Date());
    newDate.setHours(parseInt(e.target.value, 10), 0, 0, 0); // Set hours, reset minutes & seconds

    setSelectedDate(newDate);
    if (onChange) onChange(newDate);
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      <div className="flex gap-2">
        {/* Date Picker */}
        <input
          type="date"
          value={selectedDate.toISOString().split("T")[0] ?? ""}
          onChange={handleDateChange}
          className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Hour Selector */}
        <select
          value={selectedDate?.getHours() ?? 0}
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
