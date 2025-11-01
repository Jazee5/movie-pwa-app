import { useEffect, useState } from "react";
import { ArrowLeft, Star, Calendar, Clock, Film, Play, Heart } from "lucide-react";
import RatingForm from "./RatingForm";
import RelatedMovies from "./RelatedMovies";

function MovieDetails({ imdbID, onBack, onMovieClick, onToggleFavorite, isFavorite, darkMode }) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = "https://www.omdbapi.com?apikey=894c3be2";

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}&i=${imdbID}&plot=full`);
        const data = await response.json();
        if (data.Response === 'True') {
          setMovie(data);
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
      setLoading(false);
    };
    fetchMovieDetails();
  }, [imdbID]);

  const handleToggleFavorite = () => {
    if (movie) {
      onToggleFavorite({
        imdbID: movie.imdbID,
        Title: movie.Title,
        Year: movie.Year,
        Poster: movie.Poster
      });
    }
  };

  if (loading) {
    return (
      <div className={`flex justify-center items-center min-h-screen ${
        darkMode ? 'bg-gray-900' : 'bg-gray-100'
      }`}>
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
          <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Loading details...
          </p>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
      }`}>
        <div className="text-center">
          <p className="text-2xl mb-4">Movie not found</p>
          <button 
            onClick={onBack} 
            className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg transition text-white"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const getYouTubeTrailer = (title, year) => {
    const query = encodeURIComponent(`${title} ${year} official trailer`);
    return `https://www.youtube.com/results?search_query=${query}`;
  };

  const bgClass = darkMode ? 'bg-gray-900' : 'bg-gray-100';
  const textClass = darkMode ? 'text-white' : 'text-gray-900';

  return (
    <div className={`${bgClass} min-h-screen ${textClass}`}>
      {/* Backdrop Banner */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <div className="absolute top-4 left-4 z-20 flex gap-2">
          <button
            onClick={onBack}
            className={`${
              darkMode ? 'bg-black' : 'bg-white'
            } bg-opacity-70 hover:bg-opacity-90 p-2 md:p-3 rounded-full transition backdrop-blur-sm`}
          >
            <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          
          <button
            onClick={handleToggleFavorite}
            className={`${
              darkMode ? 'bg-black' : 'bg-white'
            } bg-opacity-70 hover:bg-opacity-90 p-2 md:p-3 rounded-full transition backdrop-blur-sm`}
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart
              className={`w-5 h-5 md:w-6 md:h-6 ${
                isFavorite ? 'fill-red-500 text-red-500' : ''
              }`}
            />
          </button>
        </div>
        
        {movie.Poster !== 'N/A' ? (
          <>
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="w-full h-full object-cover blur-md opacity-40"
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${
              darkMode 
                ? 'from-gray-900 via-gray-900/50' 
                : 'from-gray-100 via-gray-100/50'
            } to-transparent`}></div>
          </>
        ) : (
          <div className={`w-full h-full ${
            darkMode ? 'bg-gray-800' : 'bg-gray-300'
          } flex items-center justify-center`}>
            <Film className="w-24 h-24 text-gray-600" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 -mt-24 md:-mt-40 relative z-10 pb-12">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* Poster */}
          {movie.Poster !== 'N/A' && (
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <img
                src={movie.Poster}
                alt={movie.Title}
                className={`w-40 md:w-56 lg:w-64 rounded-xl shadow-2xl border-4 ${
                  darkMode ? 'border-gray-800' : 'border-white'
                }`}
              />
            </div>
          )}
          
          {/* Details */}
          <div className="flex-1 space-y-4">
            <div>
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2">{movie.Title}</h1>
              {movie.Tagline && (
                <p className={`text-sm md:text-base italic ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>{movie.Tagline}</p>
              )}
            </div>
            
            {/* Info Badges */}
            <div className="flex flex-wrap gap-3">
              {movie.imdbRating !== 'N/A' && (
                <div className="flex items-center gap-1.5 bg-yellow-500 text-black px-3 py-1.5 rounded-full font-bold">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{movie.imdbRating}</span>
                </div>
              )}
              {movie.Year !== 'N/A' && (
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${
                  darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-300 text-gray-800'
                }`}>
                  <Calendar className="w-4 h-4" />
                  <span>{movie.Year}</span>
                </div>
              )}
              {movie.Runtime !== 'N/A' && (
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${
                  darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-300 text-gray-800'
                }`}>
                  <Clock className="w-4 h-4" />
                  <span>{movie.Runtime}</span>
                </div>
              )}
            </div>

            {/* Genre */}
            {movie.Genre !== 'N/A' && (
              <div className="flex flex-wrap gap-2">
                {movie.Genre.split(', ').map((genre, index) => (
                  <span 
                    key={index} 
                    className="bg-purple-600 bg-opacity-30 border border-purple-500 text-purple-300 px-3 py-1 rounded-full text-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            )}

            {/* Watch Trailer Button */}
            <div>
              <a 
                href={getYouTubeTrailer(movie.Title, movie.Year)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition transform active:scale-95 shadow-lg text-white"
              >
                <Play className="w-5 h-5" />
                Watch Trailer
              </a>
            </div>

            {/* Plot */}
            {movie.Plot !== 'N/A' && (
              <div className={`p-4 md:p-6 rounded-xl border ${
                darkMode 
                  ? 'bg-gray-800 bg-opacity-50 border-gray-700' 
                  : 'bg-white border-gray-300 shadow-lg'
              }`}>
                <h2 className={`text-xl md:text-2xl font-bold mb-3 ${
                  darkMode ? 'text-purple-400' : 'text-purple-600'
                }`}>Overview</h2>
                <p className={`leading-relaxed text-sm md:text-base ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>{movie.Plot}</p>
              </div>
            )}

            {/* Additional Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {movie.Director !== 'N/A' && (
                <div className={`p-4 rounded-lg border ${
                  darkMode 
                    ? 'bg-gray-800 bg-opacity-50 border-gray-700' 
                    : 'bg-white border-gray-300 shadow'
                }`}>
                  <h3 className={`font-semibold mb-1 text-sm ${
                    darkMode ? 'text-purple-400' : 'text-purple-600'
                  }`}>Director</h3>
                  <p className={`text-sm ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>{movie.Director}</p>
                </div>
              )}
              {movie.Writer !== 'N/A' && (
                <div className={`p-4 rounded-lg border ${
                  darkMode 
                    ? 'bg-gray-800 bg-opacity-50 border-gray-700' 
                    : 'bg-white border-gray-300 shadow'
                }`}>
                  <h3 className={`font-semibold mb-1 text-sm ${
                    darkMode ? 'text-purple-400' : 'text-purple-600'
                  }`}>Writer</h3>
                  <p className={`text-sm ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>{movie.Writer}</p>
                </div>
              )}
              {movie.Actors !== 'N/A' && (
                <div className={`p-4 rounded-lg border md:col-span-2 ${
                  darkMode 
                    ? 'bg-gray-800 bg-opacity-50 border-gray-700' 
                    : 'bg-white border-gray-300 shadow'
                }`}>
                  <h3 className={`font-semibold mb-1 text-sm ${
                    darkMode ? 'text-purple-400' : 'text-purple-600'
                  }`}>Cast</h3>
                  <p className={`text-sm ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>{movie.Actors}</p>
                </div>
              )}
              {movie.Language !== 'N/A' && (
                <div className={`p-4 rounded-lg border ${
                  darkMode 
                    ? 'bg-gray-800 bg-opacity-50 border-gray-700' 
                    : 'bg-white border-gray-300 shadow'
                }`}>
                  <h3 className={`font-semibold mb-1 text-sm ${
                    darkMode ? 'text-purple-400' : 'text-purple-600'
                  }`}>Language</h3>
                  <p className={`text-sm ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>{movie.Language}</p>
                </div>
              )}
              {movie.Country !== 'N/A' && (
                <div className={`p-4 rounded-lg border ${
                  darkMode 
                    ? 'bg-gray-800 bg-opacity-50 border-gray-700' 
                    : 'bg-white border-gray-300 shadow'
                }`}>
                  <h3 className={`font-semibold mb-1 text-sm ${
                    darkMode ? 'text-purple-400' : 'text-purple-600'
                  }`}>Country</h3>
                  <p className={`text-sm ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>{movie.Country}</p>
                </div>
              )}
              {movie.Released !== 'N/A' && (
                <div className={`p-4 rounded-lg border ${
                  darkMode 
                    ? 'bg-gray-800 bg-opacity-50 border-gray-700' 
                    : 'bg-white border-gray-300 shadow'
                }`}>
                  <h3 className={`font-semibold mb-1 text-sm ${
                    darkMode ? 'text-purple-400' : 'text-purple-600'
                  }`}>Released</h3>
                  <p className={`text-sm ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>{movie.Released}</p>
                </div>
              )}
              {movie.BoxOffice !== 'N/A' && (
                <div className={`p-4 rounded-lg border ${
                  darkMode 
                    ? 'bg-gray-800 bg-opacity-50 border-gray-700' 
                    : 'bg-white border-gray-300 shadow'
                }`}>
                  <h3 className={`font-semibold mb-1 text-sm ${
                    darkMode ? 'text-purple-400' : 'text-purple-600'
                  }`}>Box Office</h3>
                  <p className={`text-sm ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>{movie.BoxOffice}</p>
                </div>
              )}
              {movie.Awards !== 'N/A' && (
                <div className={`p-4 rounded-lg border md:col-span-2 ${
                  darkMode 
                    ? 'bg-gray-800 bg-opacity-50 border-gray-700' 
                    : 'bg-white border-gray-300 shadow'
                }`}>
                  <h3 className={`font-semibold mb-1 text-sm ${
                    darkMode ? 'text-purple-400' : 'text-purple-600'
                  }`}>Awards</h3>
                  <p className={`text-sm ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>{movie.Awards}</p>
                </div>
              )}
            </div>

            {/* Rating Form */}
            <RatingForm 
              movieId={movie.imdbID}
              movieTitle={movie.Title}
              darkMode={darkMode}
            />

            {/* Related Movies */}
            <RelatedMovies 
              genre={movie.Genre}
              currentMovieId={movie.imdbID}
              onMovieClick={onMovieClick}
              darkMode={darkMode}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;