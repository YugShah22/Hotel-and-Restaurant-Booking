import { useEffect, useState } from 'react';
import HotelCard from './HotelCard';

type Hotel = {
  name: string;
  location: string;
  imageUrl?: string;
};

type Filters = {
  city: string;
  price: string;
  search: string;
};

type Props = {
  onSelect: (name: string) => void;
  filters: Filters;
};

export default function HotelList({ onSelect, filters }: Props) {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:4000/api/hotels')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch hotels');
        return res.json();
      })
      .then((data: Hotel[]) => {
        const filtered = data.filter((hotel) => {
          const matchesCity = filters.city ? hotel.location.toLowerCase().includes(filters.city.toLowerCase()) : true;
          const matchesSearch = filters.search ? hotel.name.toLowerCase().includes(filters.search.toLowerCase()) : true;
          return matchesCity && matchesSearch;
        });
        setHotels(filtered);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching hotels:', err);
        setError('Could not load hotels');
        setLoading(false);
      });
  }, [filters]);

  if (loading) return <p className="text-center text-gray-500">Loading hotels...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {hotels.map((hotel, i) => (
        <HotelCard
          key={i}
          name={hotel.name}
          location={hotel.location}
          imageUrl={hotel.imageUrl}
          onClick={() => onSelect(hotel.name)}
        />
      ))}
    </div>
  );
}