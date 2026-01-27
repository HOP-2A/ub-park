"use client";

import { useState } from "react";

export default function AddParkingLot() {
  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    latitude: "",
    longitude: "",
    spotCount: 10,
    pricePerHour: 5,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generateSpots = () => {
    return Array.from({ length: Number(form.spotCount) }, (_, i) => ({
      number: `${i + 1}`,
      pricePerHour: Number(form.pricePerHour),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      address: form.address,
      city: form.city,
      latitude: Number(form.latitude),
      longitude: Number(form.longitude),
      ownerId: "Agg1r9uD8GQ_hUHMK9-jV",
      spots: generateSpots(),
    };

    const res = await fetch("/api/owner", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      alert("Failed to create parking lot");
      return;
    }

    alert("Parking lot created 🚗");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Parking Lot</h2>

      <input name="name" placeholder="Name" onChange={handleChange} required />
      <input name="address" placeholder="Address" onChange={handleChange} required />
      <input name="city" placeholder="City" onChange={handleChange} required />

      <input
        name="latitude"
        type="number"
        step="any"
        placeholder="Latitude"
        onChange={handleChange}
        required
      />

      <input
        name="longitude"
        type="number"
        step="any"
        placeholder="Longitude"
        onChange={handleChange}
        required
      />

      <input
        name="spotCount"
        type="number"
        min="1"
        placeholder="Number of spots"
        onChange={handleChange}
      />

      <input
        name="pricePerHour"
        type="number"
        min="0"
        step="0.5"
        placeholder="Price per hour"
        onChange={handleChange}
      />

      <button type="submit">Create Parking Lot</button>
    </form>
  );
}
