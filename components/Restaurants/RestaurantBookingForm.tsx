'use client';
import { useState } from 'react';

type Props = {
  restaurantName: string;
};

const amenitiesList = [
  'Outdoor Seating',
  'Live Music',
  'Vegetarian Options',
  'Private Dining',
  'Parking Available',
  'Wheelchair Accessible',
  'Pet Friendly',
];

export default function RestaurantBookingForm({ restaurantName }: Props) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const [guestCount, setGuestCount] = useState<number>(2);
  const [reservationDate, setReservationDate] = useState('');
  const [reservationTime, setReservationTime] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const bookingData = {
      restaurantName,
      guestCount,
      date: reservationDate,
      time: reservationTime,
      selectedAmenities,
    };

    localStorage.setItem('restaurantBooking', JSON.stringify(bookingData));
    window.location.href = '/restaurant/payment';
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-6 rounded-lg shadow-md max-w-xl w-full">
          <h2 className="text-xl font-semibold mb-1">Login Required</h2>
          <p>
            Please log in to reserve a table at{' '}
            <span className="font-bold">{restaurantName}</span>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl w-full space-y-8 bg-gradient-to-br from-white via-gray-50 to-gray-100 p-10 rounded-3xl shadow-2xl border border-gray-200"
      >
        <header>
          <h3 className="text-3xl font-extrabold text-gray-900">
            Reserve a Table at <span className="text-blue-600">{restaurantName}</span>
          </h3>
          <p className="text-gray-600 mt-2 text-lg">
            Customize your experience and let us know your preferences.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Guests</label>
            <input
              type="number"
              min={1}
              value={guestCount}
              onChange={(e) => setGuestCount(Math.max(1, parseInt(e.target.value) || 1))}
              required
              className="border border-gray-300 p-3 rounded-lg shadow-inner focus:ring-2 focus:ring-blue-400 focus:outline-none text-black"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              value={reservationDate}
              onChange={(e) => setReservationDate(e.target.value)}
              required
              className="border border-gray-300 p-3 rounded-lg shadow-inner focus:ring-2 focus:ring-blue-400 focus:outline-none text-black"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Time</label>
            <input
              type="time"
              value={reservationTime}
              onChange={(e) => setReservationTime(e.target.value)}
              required
              className="border border-gray-300 p-3 rounded-lg shadow-inner focus:ring-2 focus:ring-blue-400 focus:outline-none text-black"
            />
          </div>
        </div>

        <div>
          <h4 className="text-xl font-semibold text-gray-800 mb-4">Dining Preferences</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {amenitiesList.map((amenity) => (
              <label
                key={amenity}
                className={`flex items-center space-x-3 p-3 rounded-lg border transition ${
                  selectedAmenities.includes(amenity)
                    ? 'bg-blue-600 text-white border-blue-700'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedAmenities.includes(amenity)}
                  onChange={() => toggleAmenity(amenity)}
                  className="accent-blue-600"
                />
                <span className="text-sm font-medium">{amenity}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 rounded-xl text-lg shadow-lg transition duration-300"
        >
          Confirm Reservation
        </button>
      </form>
    </div>
  );
}