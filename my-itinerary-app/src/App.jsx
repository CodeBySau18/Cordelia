import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DestinationFilter from "./components/DestinationFilter";
import ItineraryCard from "./components/ItineraryCard";
import DateFilter from "./components/DateFilter";
import QuickFilters from "./components/QuickFilter";
import ReactPaginate from "react-paginate";
import Loading from "./components/Loading";
import { useTheme } from "./components/ThemeContext";

const fetchItineraries = async () => {
  const response = await fetch(
    "https://staging.cordeliacruises.com/api/v2/itineraries?pagination=false"
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data.itineraries;
};

function App() {
  const { toggleTheme } = useTheme();

  const {
    data: itineraries = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["itineraries"],
    queryFn: fetchItineraries,
  });

  const [filteredItineraries, setFilteredItineraries] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [departurePorts, setDeparturePorts] = useState([]);
  const [tripTypes, setTripTypes] = useState([]);
  const [nightRange] = useState([0, 10]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    if (itineraries.length > 0) {
      setFilteredItineraries(itineraries);
      setDestinations([
        ...new Set(itineraries.map((it) => it.starting_port.name)),
      ]);
      setDeparturePorts([
        ...new Set(itineraries.map((it) => it.starting_port.name)),
      ]);
      setTripTypes([...new Set(itineraries.map((it) => it.trip_type))]);
    }
  }, [itineraries]);

  const applyFilters = (
    selectedDestinations = [],
    dateRange = { startDate: null, endDate: null },
    nightRange = [0, 10],
    selectedTripType = "",
    selectedPort = ""
  ) => {
    let filtered = itineraries;
    if (selectedDestinations.length > 0) {
      filtered = filtered.filter((itinerary) =>
        selectedDestinations.includes(itinerary.starting_port.name)
      );
    }
    if (dateRange.startDate && dateRange.endDate) {
      filtered = filtered.filter((itinerary) => {
        const itineraryStartDate = new Date(itinerary.start_date);
        const itineraryEndDate = new Date(itinerary.end_date);
        const selectedStartDate = new Date(dateRange.startDate);
        const selectedEndDate = new Date(dateRange.endDate);
        return (
          itineraryStartDate <= selectedEndDate &&
          itineraryEndDate >= selectedStartDate
        );
      });
    } else if (dateRange.startDate) {
      filtered = filtered.filter((itinerary) => {
        const itineraryStartDate = new Date(itinerary.start_date);
        const selectedStartDate = new Date(dateRange.startDate);
        return itineraryStartDate >= selectedStartDate;
      });
    }
    if (nightRange) {
      filtered = filtered.filter(
        (itinerary) =>
          itinerary.nights >= nightRange[0] && itinerary.nights <= nightRange[1]
      );
    }
    if (selectedTripType) {
      filtered = filtered.filter(
        (itinerary) => itinerary.trip_type === selectedTripType
      );
    }
    if (selectedPort) {
      filtered = filtered.filter(
        (itinerary) => itinerary.starting_port.name === selectedPort
      );
    }
    setFilteredItineraries(filtered);
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const displayedItineraries = filteredItineraries.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  if (isLoading) {
    return (
      <div className="text-center w-screen">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div className="text-center">Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-blue-600 dark:text-white-400 text-center">
        Cruise Itineraries
      </h1>

      <div className="w-full max-w-7xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 lg:px-10">
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleTheme}
            className="p-2 bg-gray-200 dark:bg-gray-600 rounded-lg"
          >
            Toggle Dark Mode
          </button>
        </div>
        <div className="space-y-4 lg:flex lg:space-y-0 lg:space-x-4 mb-6">
          <DestinationFilter
            destinations={destinations}
            onFilterChange={applyFilters}
          />
          <DateFilter
            onDateChange={(dateRange) =>
              applyFilters([], dateRange, nightRange, "", "")
            }
          />
          <QuickFilters
            nights={nightRange}
            tripTypes={tripTypes}
            departurePorts={departurePorts}
            onFilterChange={(nightRange, tripType, port) =>
              applyFilters([], {}, nightRange, tripType, port)
            }
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          {displayedItineraries.length > 0 ? (
            displayedItineraries.map((itinerary) => (
              <ItineraryCard
                key={itinerary.itinerary_id}
                itinerary={itinerary}
              />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500 dark:text-gray-300">
              No itineraries found.
            </p>
          )}
        </div>

        {filteredItineraries.length > itemsPerPage && (
          <ReactPaginate
            previousLabel={"< Previous"}
            nextLabel={"Next >"}
            breakLabel={"..."}
            pageCount={Math.ceil(filteredItineraries.length / itemsPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"flex justify-center mt-4"}
            pageClassName={"mx-1"}
            activeClassName={"font-bold text-blue-600 dark:text-blue-400"}
            previousClassName={"mx-2"}
            nextClassName={"mx-2"}
          />
        )}
      </div>
    </div>
  );
}

export default App;
