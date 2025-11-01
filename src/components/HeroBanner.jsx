import { Film, Sparkles } from "lucide-react";

function HeroBanner({ darkMode }) {
  return (
    <div className={`w-full ${darkMode ? 'bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900' : 'bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400'} py-12 px-6 mb-8`}>
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Sparkles className="w-8 h-8 text-yellow-300" />
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          Discover Your Next Favorite Movie
        </h1>
        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
          Search through thousands of movies, save your favorites, and explore detailed information about every film
        </p>
        <div className="mt-6 flex flex-wrap gap-4 justify-center text-white">
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold">🎬</span>
            <span className="text-sm">Thousands of Movies</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold">⭐</span>
            <span className="text-sm">Detailed Information</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold">❤️</span>
            <span className="text-sm">Save Favorites</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroBanner;