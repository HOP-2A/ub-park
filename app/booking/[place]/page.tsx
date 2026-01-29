"use client";

import { useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Booking = {
  id: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
  status: string;
  parkingSpot: {
    number: string;
    place: {
      name: string;
      city: string;
    };
  };
};

export default function BookingPage() {
    // const params = useParams();
    // const placeId = params.place as string;
  const USER_ID = "LjlTwIcZtvsRCPVopkN0U";
  const placeId = "YnqCR-WuU-40s-gC6S5FG"

  // console.log(placeId)

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

   const loadBookings = async () => {
    const res = await fetch(`/api/booking?userId=${USER_ID}`);
    const data = await res.json();
    setBookings(data);
  };

  useEffect(() => {
    loadBookings();
  }, []);

const createBooking = async () => {
  setLoading(true);

  const res = await fetch("/api/booking", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: USER_ID,
      parkingSpotId: placeId,
      startTime,
      endTime
    })
  });

  const data = await res.json();
  console.log("BOOKING RESPONSE:", data);

  await loadBookings();
  setLoading(false);
};



  // cancel booking
//   const cancelBooking = async (id: string) => {
//     await fetch(`/api/bookings/${id}/cancel`, { method: "PATCH" });
//     // await loadBookings();
//   };

  return (
    <div style={{ padding: 24, maxWidth: 600 }}>
      <h1>Parking Booking</h1>

      {/* BOOKING FORM */}
      <div style={{ marginBottom: 24 }}>
        <input
          type="datetime-local"
          value={startTime}
          onChange={e => setStartTime(e.target.value)}
        />
        <input
          type="datetime-local"
          value={endTime}
          onChange={e => setEndTime(e.target.value)}
        />
        <button onClick={createBooking} disabled={loading}>
          {loading ? "Booking..." : "Book"}
        </button>
      </div>

      BOOKINGS LIST
      <h2>My Bookings</h2>
      {bookings.length === 0 && <p>No bookings yet</p>}

      {bookings.map(b => (
        <div
          key={b.id}
          style={{
            border: "1px solid #ccc",
            padding: 12,
            marginBottom: 12
          }}
        >
          <p>
            <strong>{b.parkingSpot.place.name}</strong> –{" "}
            {b.parkingSpot.place.city}
          </p>
          <p>Spot: {b.parkingSpot.number}</p>
          <p>Status: {b.status}</p>
          <p>Price: ${b.totalPrice}</p>
          <p>
            {new Date(b.startTime).toLocaleString()} →{" "}
            {new Date(b.endTime).toLocaleString()}
          </p>
{/* 
          {b.status === "PENDING" && (
            <button onClick={() => cancelBooking(b.id)}>Cancel</button>
          )} */}
        </div>
      ))}
    </div>
  );
}
