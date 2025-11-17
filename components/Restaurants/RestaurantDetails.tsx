type Props = {
  name: string;
};

export default function RestaurantDetails({ name }: Props) {
  return (
    <div className="space-y-4">
      <div className="h-64 bg-gray-200 rounded">[Image Placeholder for {name}]</div>
      <h2 className="text-2xl font-bold">{name}</h2>
      <p className="text-gray-700">Cuisine, ambiance, and location details here.</p>
    </div>
  );
}