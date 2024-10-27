function ItineraryCard({ itinerary }) {
  const {
    destination_port,
    start_date,
    end_date,
    nights,
    starting_fare,
    inclusions,
    offers_available,
    image_url,
  } = itinerary;

  return (
    <div className="border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow bg-white dark:bg-gray-800 cursor-pointer">
      <img
        src={image_url}
        alt={destination_port?.name || "Unknown destination"}
        className="w-full h-48 object-cover rounded"
      />
      <h3 className="text-lg font-semibold mt-2 text-gray-800 dark:text-white">
        {destination_port?.name || "Unknown destination"}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {start_date} - {end_date} ({nights} nights)
      </p>
      <p className="text-lg font-bold my-2 text-gray-800 dark:text-white">
        ₹{starting_fare} per person
      </p>
      <ul className="text-sm text-gray-800 dark:text-gray-300">
        {inclusions.map((inclusion, index) => (
          <li key={index} className="list-disc ml-4">
            {inclusion}
          </li>
        ))}
      </ul>
      {offers_available.length > 0 && (
        <p className="text-xs text-green-500 dark:text-green-300 mt-2">
          Special Offers: {offers_available.join(", ")}
        </p>
      )}
    </div>
  );
}

export default ItineraryCard;
