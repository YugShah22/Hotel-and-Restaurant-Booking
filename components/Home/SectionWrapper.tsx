'use client';
import { useState } from 'react';
import HotelList from '../Hotels/HotelList';
import RestaurantList from '../Restaurants/RestaurantList';
import HotelBookingView from '../Hotels/HotelBookingView';
import RestaurantBookingView from '../Restaurants/RestaurantBookingView';

import FilterPanel from '../Shared/FilterPanel';

type Props = {
  active: 'hotels' | 'restaurants';
};

export default function SectionWrapper({ active }: Props) {
  const [selectedHotel, setSelectedHotel] = useState<string | null>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);
  const [filters, setFilters] = useState({ city: '', price: '', search: '' });

  if (active === 'hotels') {
    if (selectedHotel) {
      return <HotelBookingView hotelName={selectedHotel} onBack={() => setSelectedHotel(null)} />;
    }

    return (
      <>
        <FilterPanel onChange={setFilters} />
        <section id="hotels">
          <HotelList filters={filters} onSelect={setSelectedHotel} />
        </section>
      </>
    );
  }

  if (selectedRestaurant) {
    return (
      <RestaurantBookingView
        restaurantName={selectedRestaurant}
        onBack={() => setSelectedRestaurant(null)}
      />
    );
  }

  return (
    <>
      <FilterPanel onChange={setFilters} />
      <RestaurantList filters={filters} onSelect={setSelectedRestaurant} />
    </>
  );
}