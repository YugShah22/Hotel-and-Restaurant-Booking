'use client';
import { useEffect, useState } from 'react';
import RestaurantCard from './RestaurantCard';

type Restaurant = {
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

export default function RestaurantList({ onSelect, filters }: Props) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:4000/api/restaurants')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch restaurants');
        return res.json();
      })
      .then((data: Restaurant[]) => {
        const filtered = data.filter((restaurant) => {
          const matchesCity = filters.city ? restaurant.location.toLowerCase().includes(filters.city.toLowerCase()) : true;
          const matchesSearch = filters.search ? restaurant.name.toLowerCase().includes(filters.search.toLowerCase()) : true;
          return matchesCity && matchesSearch;
        });
        setRestaurants(filtered);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching restaurants:', err);
        setError('Could not load restaurants');
        setLoading(false);
      });
  }, [filters]);

  if (loading) return <p className="text-center text-gray-500">Loading restaurants...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
  <div className='px-4 sm:px-6 lg:px-8 p-10'>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {restaurants.map((restaurant, i) => (
        <RestaurantCard
          key={i}
          name={restaurant.name}
          location={restaurant.location}
          imageUrl={restaurant.imageUrl}
          onClick={() => onSelect(restaurant.name)}
        />
      ))}
    </div>
  </div>
  );
}