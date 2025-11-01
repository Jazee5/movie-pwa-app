import { Heart } from "lucide-react";

function MovieCard({ movie, onToggleFavorite, isFavorite, darkMode }) {
  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Prevent movie click event
    onToggleFavorite(movie);
  };

  return (
    <div className={`movie-card ${darkMode ? '' : 'light-mode'} relative`}>
      <button
        onClick={handleFavoriteClick}
        className="absolute top-2 right-2 z-10 p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition"
        title={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart
          className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`}
        />
      </button>

      <img
        src={
          movie.Poster !== "N/A"
            ? movie.Poster
            : "https://via.placeholder.com/300x450?text=No+Image"
        }
        alt={movie.Title}
      />
      <div className="p-3">
        <h2>{movie.Title}</h2>
        <p>{movie.Year}</p>
      </div>
    </div>
  );
}

export default MovieCard;