import { useState, useEffect } from "react";
import { Film } from "lucide-react";

function RelatedMovies({ genre, currentMovieId, onMovieClick, darkMode }) {
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);

const API_URL = "http://www.omdbapi.com?apikey=894c3be2";
  useEffect(() => {
    const fetchRelatedMovies = async () => {
      if (!genre) return;
      
      setLoading(true);
      try {
        // Get the first genre if multiple genres exist
        const primaryGenre = genre.split(',')[0].trim();
        
        const response = await fetch(`${API_URL}&s=${primaryGenre}&type=movie`);
        const data = await response.json();
        
        if (data.Response === 'True') {
          // Filter out current movie and limit to 4 movies
          const filtered = data.Search
            .filter(movie => movie.imdbID !== currentMovieId)
            .slice(0, 4);
          setRelatedMovies(filtered);
        }
      } catch (error) {
        console.error("Error fetching related movies:", error);
      }
      setLoading(false);
    };

    fetchRelatedMovies();
  }, [genre, currentMovieId]);

  if (loading) {
    return (
      <div className={`mt-8 p-6 rounded-xl border ${
        darkMode 
          ? 'bg-gray-800 bg-opacity-50 border-gray-700' 
          : 'bg-white border-gray-300 shadow-lg'
      }`}>
        <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
          Related Movies
        </h2>
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-purple-500"></div>
        </div>
      </div>
    );
  }

  if (relatedMovies.length === 0) {
    return null;
  }

  return (
    <div className={`mt-8 p-6 rounded-xl border ${
      darkMode 
        ? 'bg-gray-800 bg-opacity-50 border-gray-700' 
        : 'bg-white border-gray-300 shadow-lg'
    }`}>
      <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
        Related Movies
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {relatedMovies.map((movie) => (
          <div
            key={movie.imdbID}
            onClick={() => onMovieClick(movie.imdbID)}
            className={`cursor-pointer rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 ${
              darkMode ? 'bg-gray-700' : 'bg-gray-100'
            } shadow-lg hover:shadow-xl`}
          >
            {movie.Poster !== 'N/A' ? (
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="w-full h-64 object-cover"
              />
            ) : (
              <div className={`w-full h-64 flex items-center justify-center ${
                darkMode ? 'bg-gray-800' : 'bg-gray-200'
              }`}>
                <Film className="w-16 h-16 text-gray-400" />
              </div>
            )}
            <div className="p-3">
              <h3 className={`font-semibold text-sm line-clamp-2 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {movie.Title}
              </h3>
              <p className={`text-xs mt-1 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {movie.Year}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RelatedMovies;