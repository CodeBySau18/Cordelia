import { useState } from "react";

const DateFilter = ({ onDateChange }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isRange, setIsRange] = useState(false); // State to toggle between single date and date range

  const handleSubmit = (event) => {
    event.preventDefault();
    // Update the parent component with the selected dates
    onDateChange({ startDate, endDate });
  };

  const handleToggleRange = () => {
    setIsRange((prev) => !prev);
    setStartDate("");
    setEndDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h2 className="text-xl font-bold mb-2">Filter by Date</h2>
      <div className="flex items-center mb-2">
        <label className="mr-2">
          <input
            type="checkbox"
            checked={isRange}
            onChange={handleToggleRange}
          />
          &nbsp; Select a date range
        </label>
      </div>
      <div className="flex">
        {isRange ? (
          <>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mr-2 border rounded p-1"
              required
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border rounded p-1"
              required
            />
          </>
        ) : (
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mr-2 border rounded p-1"
            required
          />
        )}
        <button
          type="submit"
          className="ml-2 bg-blue-500 text-white rounded px-4 py-1"
        >
          Apply
        </button>
      </div>
    </form>
  );
};

export default DateFilter;
