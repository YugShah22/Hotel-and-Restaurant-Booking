'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RestaurantPaymentPage() {
  const router = useRouter();
  const [booking, setBooking] = useState<any>(null);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('restaurantBooking');
    if (stored) setBooking(JSON.parse(stored));
  }, []);

  const handlePayment = () => {
    if (!cardNumber || !expiry || !cvv) {
      alert('Please fill in all payment fields.');
      return;
    }
    router.push('/restaurant/confirmation');
  };

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-lg text-black">
        Loading booking details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-5xl w-full p-12 bg-white rounded-3xl shadow-2xl space-y-8">
        <h2 className="text-4xl font-bold text-gray-800 text-center">
          Payment for <span className="font-semibold text-blue-600">{booking.restaurantName}</span>
        </h2>

        <div className="grid grid-cols-2 gap-6 text-gray-700 text-lg">
          <p><strong>Guests:</strong> {booking.guestCount}</p>
          <p><strong>Date:</strong> {booking.date}</p>
          <p><strong>Time:</strong> {booking.time}</p>
        </div>

        <input
          type="text"
          placeholder="Card Number"
          value={cardNumber}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, '').slice(0, 12);
            setCardNumber(value);
          }}
          pattern="\d{12}"
          required
          className="w-full border border-gray-300 p-4 rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
        />

        <div className="grid grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="MM/YY"
            value={expiry}
            onChange={(e) => {
              let value = e.target.value.replace(/\D/g, '').slice(0, 4);
              if (value.length >= 3) value = value.slice(0, 2) + '/' + value.slice(2);
              setExpiry(value);
            }}
            pattern="\d{2}/\d{2}"
            required
            className="border border-gray-300 p-4 rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
          />
          <input
            type="text"
            placeholder="CVV"
            value={cvv}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '').slice(0, 3);
              setCvv(value);
            }}
            pattern="\d{3}"
            required
            className="border border-gray-300 p-4 rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>

        <button
          onClick={handlePayment}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold hover:brightness-110 transition"
        >
          Confirm Payment
        </button>
      </div>
    </div>
  );
}