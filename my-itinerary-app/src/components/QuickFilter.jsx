import { useState } from "react";

const QuickFilters = ({
  nights,
  tripTypes,
  departurePorts,
  onFilterChange,
}) => {
  const [selectedNights, setSelectedNights] = useState([0, 10]);
  const [selectedTripType, setSelectedTripType] = useState("");
  const [selectedPort, setSelectedPort] = useState("");

  const handleNightsChange = (event) => {
    const value = event.target.value.split(",").map(Number);
    setSelectedNights(value);
    onFilterChange(value, selectedTripType, selectedPort);
  };

  const handleTripTypeChange = (event) => {
    const value = event.target.value;
    setSelectedTripType(value);
    onFilterChange(selectedNights, value, selectedPort);
  };

  const handlePortChange = (event) => {
    const value = event.target.value;
    setSelectedPort(value);
    onFilterChange(selectedNights, selectedTripType, value);
  };

  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold mb-2 text-black dark:text-white">
        Quick Filters
      </h2>
      <div className="flex">
        <select
          value={selectedNights.join(",")}
          onChange={handleNightsChange}
          className="mr-2 border rounded p-1 bg-white dark:bg-gray-700 dark:text-white"
        >
          <option value={[0, 10]}>All Nights</option>
          <option value={[1, 3]}>1-3 Nights</option>
          <option value={[4, 7]}>4-7 Nights</option>
          <option value={[8, 10]}>8-10 Nights</option>
        </select>
        <select
          value={selectedTripType}
          onChange={handleTripTypeChange}
          className="mr-2 border rounded p-1 bg-white dark:bg-gray-700 dark:text-white"
        >
          <option value="">All Trip Types</option>
          {tripTypes.map((tripType) => (
            <option key={tripType} value={tripType}>
              {tripType}
            </option>
          ))}
        </select>
        <select
          value={selectedPort}
          onChange={handlePortChange}
          className="border rounded p-1 bg-white dark:bg-gray-700 dark:text-white"
        >
          <option value="">All Ports</option>
          {departurePorts.map((port) => (
            <option key={port} value={port}>
              {port}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default QuickFilters;
