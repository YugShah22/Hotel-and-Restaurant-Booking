type Props = {
  active: 'hotels' | 'restaurants';
  onChange: (section: 'hotels' | 'restaurants') => void;
};

export default function SectionToggle({ active, onChange }: Props) {
  return (
    <div className="flex justify-center my-8">
      <div className="inline-flex bg-gray-100 rounded-full p-1 shadow-inner border border-gray-200">
        {['hotels', 'restaurants'].map((section) => (
          <button
            key={section}
            onClick={() => onChange(section as 'hotels' | 'restaurants')}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              active === section
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}