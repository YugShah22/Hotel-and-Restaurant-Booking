'use client';
import { useState } from 'react';
import HeroSection from './Home/HeroSection';
import SectionToggle from './Home/SectionToggle';
import SectionWrapper from './Home/SectionWrapper';

export default function Everything() {
  const [activeSection, setActiveSection] = useState<'hotels' | 'restaurants'>('hotels');

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <HeroSection />
      <SectionToggle active={activeSection} onChange={setActiveSection} />
      <SectionWrapper active={activeSection} />
    </main>
  );
}