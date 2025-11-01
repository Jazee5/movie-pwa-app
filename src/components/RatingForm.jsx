import { useState } from "react";
import { Star, Send } from "lucide-react";

function RatingForm({ movieId, movieTitle, darkMode }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Get existing ratings from localStorage
    const existingRatings = JSON.parse(localStorage.getItem("movieRatings")) || {};
    
    // Add new rating
    existingRatings[movieId] = {
      movieTitle,
      rating,
      feedback,
      date: new Date().toISOString()
    };
    
    // Save to localStorage
    localStorage.setItem("movieRatings", JSON.stringify(existingRatings));
    
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setRating(0);
      setFeedback("");
    }, 3000);
  };

  return (
    <div className={`mt-6 p-6 rounded-xl border ${
      darkMode 
        ? 'bg-gray-800 bg-opacity-50 border-gray-700' 
        : 'bg-white border-gray-300 shadow-lg'
    }`}>
      <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
        Rate & Review This Movie
      </h2>

      {submitted ? (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">✅</div>
          <p className={`text-xl font-semibold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
            Thank you for your feedback!
          </p>
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
            Your rating has been saved.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Star Rating */}
          <div className="mb-6">
            <label className={`block text-sm font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Your Rating
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transform transition hover:scale-110"
                >
                  <Star
                    className={`w-10 h-10 ${
                      star <= (hoverRating || rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : darkMode
                        ? 'text-gray-600'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
              {rating > 0 && (
                <span className={`ml-3 text-lg font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {rating} / 5
                </span>
              )}
            </div>
          </div>

          {/* Feedback Textarea */}
          <div className="mb-6">
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Your Review (Optional)
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Share your thoughts about this movie..."
              rows="4"
              className={`w-full px-4 py-3 rounded-lg ${
                darkMode
                  ? 'bg-gray-700 text-white placeholder-gray-400 border-gray-600'
                  : 'bg-gray-50 text-gray-900 placeholder-gray-500 border-gray-300'
              } border focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none`}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={rating === 0}
            className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${
              rating === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg transform hover:scale-105'
            }`}
          >
            <Send className="w-5 h-5" />
            Submit Rating
          </button>
        </form>
      )}
    </div>
  );
}

export default RatingForm;