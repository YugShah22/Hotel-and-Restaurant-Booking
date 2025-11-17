'use client';
import { useState } from 'react';

type Props = {
  onChange: (filters: { city: string; price: string; search: string }) => void;
};

export default function FilterBar({ onChange }: Props) {
  const [city, setCity] = useState('');
  const [price, setPrice] = useState('');
  const [search, setSearch] = useState('');

  const handleUpdate = () => {
    onChange({ city, price, search });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <input
        type="text"
        placeholder="Search by name"
        className="border px-3 py-2 rounded w-full sm:w-1/3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <input
        type="text"
        placeholder="Filter by city"
        className="border px-3 py-2 rounded w-full sm:w-1/3"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <select
        className="border px-3 py-2 rounded w-full sm:w-1/3"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      >
        <option value="">Price range</option>
        <option value="low">Low</option>
        <option value="mid">Mid</option>
        <option value="high">High</option>
      </select>
      <button
        onClick={handleUpdate}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Apply
      </button>
    </div>
  );
}