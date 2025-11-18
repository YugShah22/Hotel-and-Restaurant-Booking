'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
  hotelName: string;
};

const amenitiesList = [
  'Free Wi-Fi',
  'Breakfast Included',
  'Swimming Pool',
  'Spa Access',
  'Airport Shuttle',
  'Gym Facility',
  'Pet Friendly',
];

export default function HotelBookingForm({ hotelName }: Props) {
  const router = useRouter();
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const [guestCount, setGuestCount] = useState<number>(2);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestCount || !checkInDate || !checkOutDate) {
      alert('Please fill in all required fields.');
      return;
    }

    const bookingData = {
      hotelName,
      guestCount,
      checkInDate,
      checkOutDate,
      selectedAmenities,
    };

    localStorage.setItem('hotelBooking', JSON.stringify(bookingData));
    router.push('/hotel/payment');
  };

  if (!token) {
    return (
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-1">Login Required</h2>
        <p>
          Please log in to book your stay at <span className="font-bold">{hotelName}</span>.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto space-y-8 bg-gradient-to-br from-white via-gray-50 to-gray-100 p-10 rounded-3xl shadow-2xl border border-gray-200"
    >
      <header>
        <h3 className="text-3xl font-extrabold text-gray-900">
          Book Your Stay at <span className="text-blue-600">{hotelName}</span>
        </h3>
        <p className="text-gray-600 mt-2 text-lg">
          Customize your experience and select your preferred amenities.
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
            className="border border-gray-300 p-3 rounded-lg shadow-inner focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Check-in</label>
          <input
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            required
            className="border border-gray-300 p-3 rounded-lg shadow-inner focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Check-out</label>
          <input
            type="date"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            required
            className="border border-gray-300 p-3 rounded-lg shadow-inner focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <h4 className="text-xl font-semibold text-gray-800 mb-4">Select Amenities</h4>
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
        Proceed With Payment
      </button>
    </form>
  );
}