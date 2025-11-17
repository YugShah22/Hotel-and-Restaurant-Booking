type Props = {
  name: string;
  location: string;
  imageUrl?: string;
  onClick?: () => void;
};

export default function HotelCard({ name, location, imageUrl, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
    >
      <div className="h-48 bg-gray-200">
        <img src={imageUrl || '/placeholder-hotel.jpg'} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-sm text-gray-600">{location}</p>
      </div>
    </div>
  );
}