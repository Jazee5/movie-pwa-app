import { Film, Moon, Sun, Heart } from "lucide-react";

function Header({ darkMode, toggleTheme, onShowFavorites, favoritesCount }) {
  return (
    <header className={`w-full ${darkMode ? 'bg-gradient-to-r from-purple-600 to-blue-600' : 'bg-gradient-to-r from-purple-400 to-blue-400'} text-white py-4 px-6 shadow-md sticky top-0 z-50`}>
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Film className="w-8 h-8 text-white drop-shadow-md" />
          <h1 className="text-2xl md:text-3xl font-bold tracking-wide">
            Movie List App
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Favorites Button */}
          <button
            onClick={onShowFavorites}
            className="relative p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition"
            title="My Favorites"
          >
            <Heart className="w-6 h-6" />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition"
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;