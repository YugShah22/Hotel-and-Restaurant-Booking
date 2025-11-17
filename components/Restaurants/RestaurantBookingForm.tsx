'use client';
type Props = {
  restaurantName: string;
};

export default function RestaurantBookingForm({ restaurantName }: Props) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  if (!token) {
    return (
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded">
        <p className="font-semibold">Login required</p>
        <p>Please log in to book <span className="font-medium">{restaurantName}</span>.</p>
      </div>
    );
  }

  return (
    <form className="space-y-4">
      <h3 className="text-xl font-bold">Reserve: {restaurantName}</h3>
      <input type="number" placeholder="Guests" className="w-full border p-2 rounded" />
      <input type="date" placeholder="Reservation Date" className="w-full border p-2 rounded" />
      <input type="time" placeholder="Time" className="w-full border p-2 rounded" />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Book Table</button>
    </form>
  );
}