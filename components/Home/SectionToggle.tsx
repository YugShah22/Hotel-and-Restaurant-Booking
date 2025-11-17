type Props = {
  active: 'hotels' | 'restaurants';
  onChange: (section: 'hotels' | 'restaurants') => void;
};

export default function SectionToggle({ active, onChange }: Props) {
  return (
    <div className="flex justify-center gap-4 my-6">
      <button
        onClick={() => onChange('hotels')}
        className={`px-4 py-2 rounded ${active === 'hotels' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
      >
        Hotels
      </button>
      <button
        onClick={() => onChange('restaurants')}
        className={`px-4 py-2 rounded ${active === 'restaurants' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
      >
        Restaurants
      </button>
    </div>
  );
}