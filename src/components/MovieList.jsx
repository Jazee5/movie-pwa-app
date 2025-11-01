import MovieCard from "./MovieCard";

function MovieList({ movies, onMovieClick, onToggleFavorite, isFavorite, darkMode }) {
  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <div className="text-6xl mb-4">🎬</div>
        <p className={`text-2xl font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          No movies found
        </p>
        <p className={darkMode ? 'text-gray-500' : 'text-gray-600'}>
          Try searching for a different title
        </p>
      </div>
    );
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
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
  );
}

export default MovieList;