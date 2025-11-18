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
    <div className="bg-gradient-to-br from-white via-gray-50 to-gray-100 p-6 rounded-2xl shadow-xl border border-gray-200 mb-20 mx-4 sm:mx-6 lg:mx-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Search by Name</label>
          <input
            type="text"
            placeholder="e.g. Taj Palace"
            className="border border-gray-300 px-4 py-3 rounded-lg shadow-inner focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Filter by Area</label>
          <input
            type="text"
            placeholder="e.g. BKC"
            className="border border-gray-300 px-4 py-3 rounded-lg shadow-inner focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Price Range</label>
          <select
            className="border border-gray-300 px-4 py-3 rounded-lg shadow-inner focus:ring-2 focus:ring-blue-400 focus:outline-none"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          >
            <option value="">Select</option>
            <option value="low">Low</option>
            <option value="mid">Mid</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={handleUpdate}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg shadow-lg transition duration-300"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}