'use client';
import { useEffect, useState } from 'react';

export default function BookingConfirmationPage() {
  const [booking, setBooking] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem('hotelBooking');
    if (stored) setBooking(JSON.parse(stored));
  }, []);

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-lg text-black">
        Loading confirmation details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-5xl w-full p-12 bg-white rounded-3xl shadow-2xl border border-gray-200 text-center space-y-8">
        <h2 className="text-4xl font-bold text-green-600">Booking Confirmed!</h2>
        <p className="text-xl text-gray-700">
          Your stay at <span className="font-semibold text-blue-600">{booking.hotelName}</span> is confirmed.
        </p>

        <div className="grid grid-cols-2 gap-6 text-left text-gray-700 text-lg bg-gray-50 p-6 rounded-xl border border-gray-100">
          <p><strong>Guests:</strong> {booking.guestCount}</p>
          <p><strong>Check-in:</strong> {booking.checkInDate}</p>
          <p><strong>Check-out:</strong> {booking.checkOutDate}</p>
          <p className="col-span-2">
            <strong>Amenities:</strong>{' '}
            {booking.selectedAmenities.length > 0
              ? booking.selectedAmenities.join(', ')
              : 'None selected'}
          </p>
        </div>

        <button
          onClick={() => window.location.href = '/'}
          className="mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 rounded-xl font-bold hover:brightness-110 transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}