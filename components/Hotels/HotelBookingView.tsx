'use client';
import HotelBookingForm from './HotelBookingForm';

type Props = {
  hotelName: string;
  onBack: () => void;
};

export default function HotelBookingView({ hotelName, onBack }: Props) {
  return (
    <div className="max-w-2xl mx-auto py-8">
      <button onClick={onBack} className="text-green-600 underline mb-4">
        ← Back to Hotels
      </button>
      <h1 className="text-3xl font-bold mb-6">Reserve Your Table</h1>
      <HotelBookingForm hotelName={hotelName} />
    </div>
  );
}