'use client';
import RestaurantBookingForm from './RestaurantBookingForm';

type Props = {
  restaurantName: string;
  onBack: () => void;
};

export default function RestaurantBookingView({ restaurantName, onBack }: Props) {
  return (
    <div className="max-w-2xl mx-auto py-8">
      <button onClick={onBack} className="text-green-600 underline mb-4">
        ← Back to Restaurants
      </button>
      <h1 className="text-3xl font-bold mb-6">Reserve Your Table</h1>
      <RestaurantBookingForm restaurantName={restaurantName} />
    </div>
  );
}