import { Clock, Filter, X } from "lucide-react";

function SearchAndFilter({ 
  searchTerm, 
  setSearchTerm, 
  onSearch, 
  searchHistory, 
  onHistoryClick, 
  onClearHistory,
  filters,
  setFilters,
  onApplyFilters,
  darkMode 
}) {
  const genres = [
    "All", "Action", "Adventure", "Animation", "Comedy", "Crime", 
    "Documentary", "Drama", "Family", "Fantasy", "Horror", 
    "Mystery", "Romance", "Sci-Fi", "Thriller", "War", "Western"
  ];

  const years = ["All", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015"];
  const types = ["All", "movie", "series", "episode"];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onApplyFilters(newFilters);
  };

  const clearFilters = () => {
    const resetFilters = { genre: "All", year: "All", type: "All" };
    setFilters(resetFilters);
    onApplyFilters(resetFilters);
  };

  const hasActiveFilters = filters.genre !== "All" || filters.year !== "All" || filters.type !== "All";

 return (
    <div className="w-full max-w-6xl px-4 mx-auto">
      {/* Main Search and Filter Bar */}
      <div className={`p-4 rounded-xl mt-8 mb-6 ${darkMode ? 'bg-gray-800 bg-opacity-50' : 'bg-white shadow-lg'}`}>
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Section */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center gap-3 lg:flex-1"
          >
            <input
              type="text"
              placeholder="Search for a movie..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full px-4 py-2 rounded-full ${
                darkMode
                  ? 'bg-gray-700 text-white placeholder-gray-400 focus:ring-purple-500'
                  : 'bg-gray-50 text-gray-900 placeholder-gray-500 focus:ring-purple-400'
              } focus:ring-2 focus:outline-none border ${
                darkMode ? 'border-gray-600' : 'border-gray-300'
              }`}
            />

            <button
              type="submit"
              className="px-6 py-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-lg transition btn-glow whitespace-nowrap"
            >
              Search
            </button>
          </form>

          {/* Filter Section */}
          <div className="flex flex-col sm:flex-row items-center gap-3 lg:flex-1">
            <div className="flex items-center gap-2 whitespace-nowrap">
              <Filter className="w-5 h-5" />
              <span className="font-semibold text-sm hidden sm:inline">Filters:</span>
            </div>

            <select
              value={filters.genre}
              onChange={(e) => handleFilterChange("genre", e.target.value)}
              className={`w-full sm:flex-1 px-3 py-2 rounded-lg text-sm ${
                darkMode
                  ? 'bg-gray-700 text-white border-gray-600'
                  : 'bg-gray-50 text-gray-900 border-gray-300'
              } border focus:ring-2 focus:ring-purple-500 focus:outline-none`}
            >
              <option value="All">All Genres</option>
              {genres.slice(1).map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>

            <select
              value={filters.year}
              onChange={(e) => handleFilterChange("year", e.target.value)}
              className={`w-full sm:w-32 px-3 py-2 rounded-lg text-sm ${
                darkMode
                  ? 'bg-gray-700 text-white border-gray-600'
                  : 'bg-gray-50 text-gray-900 border-gray-300'
              } border focus:ring-2 focus:ring-purple-500 focus:outline-none`}
            >
              <option value="All">All Years</option>
              {years.slice(1).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            <select
              value={filters.type}
              onChange={(e) => handleFilterChange("type", e.target.value)}
              className={`w-full sm:w-32 px-3 py-2 rounded-lg text-sm ${
                darkMode
                  ? 'bg-gray-700 text-white border-gray-600'
                  : 'bg-gray-50 text-gray-900 border-gray-300'
              } border focus:ring-2 focus:ring-purple-500 focus:outline-none`}
            >
              {types.map((type) => (
                <option key={type} value={type}>
                  {type === "All" ? "All" : type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-sm text-red-500 hover:text-red-400 transition whitespace-nowrap px-3 py-2"
                title="Clear all filters"
              >
                <X className="w-4 h-4" />
                <span className="hidden sm:inline">Clear</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Search History */}
      {searchHistory.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Recent Searches
            </span>
            <button
              onClick={onClearHistory}
              className={`text-xs ${darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-500'} ml-2`}
            >
              Clear
            </button>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {searchHistory.map((term, index) => (
              <button
                key={index}
                onClick={() => onHistoryClick(term)}
                className={`px-3 py-1 rounded-full text-sm ${
                  darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                } transition`}
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchAndFilter;