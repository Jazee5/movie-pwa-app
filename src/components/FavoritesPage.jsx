import { ArrowLeft, Heart } from "lucide-react";
import MovieCard from "./MovieCard";

function FavoritesPage({ favorites, onMovieClick, onBack, onToggleFavorite, darkMode }) {
  const isFavorite = (imdbID) => {
    return favorites.some((fav) => fav.imdbID === imdbID);
  };

  const bgClass = darkMode
    ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white"
    : "bg-gradient-to-br from-gray-100 via-white to-gray-200 text-gray-900";

  return (
    <div className={`min-h-screen ${bgClass}`}>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className={`p-2 rounded-full ${
              darkMode
                ? 'bg-gray-800 hover:bg-gray-700'
                : 'bg-white hover:bg-gray-100'
            } transition shadow-lg`}
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-3">
            <Heart className="w-8 h-8 text-red-500 fill-red-500" />
            <h1 className="text-3xl font-bold">My Favorites</h1>
            <span className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              ({favorites.length})
            </span>
          </div>
        </div>

        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
            <Heart className="w-24 h-24 text-gray-400 mb-4" />
            <p className={`text-2xl font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              No favorites yet
            </p>
            <p className={darkMode ? 'text-gray-500' : 'text-gray-600'}>
              Start adding movies to your favorites list!
            </p>
          </div>
        ) : (
          <div className="movie-grid">
            {favorites.map((movie) => (
              <div
                key={movie.imdbID}
                onClick={() => onMovieClick(movie.imdbID)}
                className="cursor-pointer"
              >
                <MovieCard
                  movie={movie}
                  onToggleFavorite={onToggleFavorite}
                  isFavorite={isFavorite(movie.imdbID)}
                  darkMode={darkMode}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FavoritesPage;