import { useState, useEffect } from "react";
import Header from "./components/Header";
import HeroBanner from "./components/HeroBanner";
import SearchAndFilter from "./components/SearchAndFilter";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import Footer from "./components/Footer";
import FavoritesPage from "./components/FavoritesPage";

const API_URL = "https://www.omdbapi.com?apikey=894c3be2";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("Avengers");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [darkMode, setDarkMode] = useState(true);
  const [searchHistory, setSearchHistory] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [filters, setFilters] = useState({
    genre: "All",
    year: "All",
    type: "All"
  });

  // Load favorites, theme, and search history from localStorage
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const savedTheme = localStorage.getItem("darkMode");
    const savedHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    
    setFavorites(savedFavorites);
    setDarkMode(savedTheme === null ? true : savedTheme === "true");
    setSearchHistory(savedHistory);
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Save theme to localStorage
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // Save search history to localStorage
  useEffect(() => {
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }, [searchHistory]);

const fetchMovies = async (term = searchTerm, appliedFilters = filters) => {
    // Determine what to search for
    let searchQuery = term;
    
    // If no search term and no filters, fetch multiple popular movies
    if (!term && appliedFilters.genre === "All" && appliedFilters.year === "All" && appliedFilters.type === "All") {
      // Fetch movies from different popular searches and mix them
      const popularSearches = ["Avengers", "Batman", "Inception", "Titanic", "Jurassic", "Matrix"];
      const allMovies = [];
      
      try {
        // Fetch from multiple searches to get variety
        for (let i = 0; i < 3; i++) {
          const query = popularSearches[i];
          const response = await fetch(`${API_URL}&s=${query}`);
          const data = await response.json();
          if (data.Response === 'True' && data.Search) {
            // Take 3-4 movies from each search
            allMovies.push(...data.Search.slice(0, 3));
          }
        }
        
        // Remove duplicates based on imdbID
        const uniqueMovies = Array.from(
          new Map(allMovies.map(m => [m.imdbID, m])).values()
        );
        
        // Keep consistent order (no shuffling)
        setMovies(uniqueMovies.slice(0, 10));
        setHasSearched(true);
        return;
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    }
    
    // If no search term but filters are applied, use genre as search
    if (!term && appliedFilters.genre !== "All") {
      searchQuery = appliedFilters.genre;
    }
    // If still no search query, use a default
    else if (!term) {
      searchQuery = "movie";
    }
    
    let url = `${API_URL}&s=${searchQuery}`;
    
    // Apply type filter (movie, series, episode)
    if (appliedFilters.type !== "All") {
      url += `&type=${appliedFilters.type}`;
    }
    
    // Apply year filter
    if (appliedFilters.year !== "All") {
      url += `&y=${appliedFilters.year}`;
    }
    
    const response = await fetch(url);
    const data = await response.json();
    const results = data.Search || [];
    
    setMovies(results);
    setHasSearched(true);
    
    // Add to search history only if user explicitly searched
    if (term && !searchHistory.includes(term)) {
      const newHistory = [term, ...searchHistory].slice(0, 5);
      setSearchHistory(newHistory);
    }
  };

  
  useEffect(() => {
    fetchMovies();
  }, []);

  const handleApplyFilters = (appliedFilters) => {
    setFilters(appliedFilters);
    fetchMovies(searchTerm, appliedFilters);
  };

  const toggleFavorite = (movie) => {
    const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);
    if (isFavorite) {
      setFavorites(favorites.filter((fav) => fav.imdbID !== movie.imdbID));
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  const isFavorite = (imdbID) => {
    return favorites.some((fav) => fav.imdbID === imdbID);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const handleHistoryClick = (term) => {
    setSearchTerm(term);
    fetchMovies(term);
  };

  const clearHistory = () => {
    setSearchHistory([]);
  };

  if (selectedMovie) {
    return (
      <MovieDetails
        imdbID={selectedMovie}
        onBack={() => setSelectedMovie(null)}
        onMovieClick={(id) => setSelectedMovie(id)}
        onToggleFavorite={toggleFavorite}
        isFavorite={isFavorite(selectedMovie)}
        darkMode={darkMode}
      />
    );
  }

  if (showFavorites) {
    return (
      <FavoritesPage
        favorites={favorites}
        onMovieClick={(id) => setSelectedMovie(id)}
        onBack={() => setShowFavorites(false)}
        onToggleFavorite={toggleFavorite}
        darkMode={darkMode}
      />
    );
  }

  const bgClass = darkMode
    ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white"
    : "bg-gradient-to-br from-gray-100 via-white to-gray-200 text-gray-900";

  return (
    <div className={`min-h-screen flex flex-col ${bgClass}`}>
      <Header
        darkMode={darkMode}
        toggleTheme={toggleTheme}
        onShowFavorites={() => setShowFavorites(true)}
        favoritesCount={favorites.length}
      />

      <main className="flex-1 flex flex-col">
        <HeroBanner darkMode={darkMode} />
        
        <SearchAndFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={() => fetchMovies()}
          searchHistory={searchHistory}
          onHistoryClick={handleHistoryClick}
          onClearHistory={clearHistory}
          filters={filters}
          setFilters={setFilters}
          onApplyFilters={handleApplyFilters}
          darkMode={darkMode}
        />

        <div className="w-full max-w-6xl mx-auto px-6 flex-1">
          <MovieList
            movies={movies}
            onMovieClick={(id) => setSelectedMovie(id)}
            onToggleFavorite={toggleFavorite}
            isFavorite={isFavorite}
            darkMode={darkMode}
          />
        </div>
      </main>

      <Footer darkMode={darkMode} />
    </div>
  );
}

export default App;