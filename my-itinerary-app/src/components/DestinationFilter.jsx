import { useState } from "react";

function DestinationFilter({ destinations, onFilterChange }) {
  const [selectedDestinations, setSelectedDestinations] = useState([]);

  const handleSelect = (event) => {
    const { value, checked } = event.target;
    const updatedDestinations = checked
      ? [...selectedDestinations, value]
      : selectedDestinations.filter((destination) => destination !== value);

    setSelectedDestinations(updatedDestinations);
    onFilterChange(updatedDestinations);
  };

  return (
    <div className="mb-4 w-full sm:w-auto">
      <h2 className="font-semibold text-lg text-gray-800 dark:text-white">
        Filter by Starting Port
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-2">
        {destinations.map((destination) => (
          <label
            key={destination}
            className="flex items-center text-gray-700 dark:text-gray-300"
          >
            <input
              type="checkbox"
              value={destination}
              checked={selectedDestinations.includes(destination)}
              onChange={handleSelect}
              className="mr-2 rounded focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
            />
            {destination}
          </label>
        ))}
      </div>
    </div>
  );
}

export default DestinationFilter;
