function Favorites({
  favorites,
  handleRecentSearch,
  removeFavorite,
}) {
  return (
    <div className="favorites">
      <h3>⭐ Favorite Cities</h3>

      <div className="history-buttons">
        {favorites.map((city, index) => (
          <div key={index} className="favorite-item">
  <button
    className="favorite-city-btn"
    onClick={() => handleRecentSearch(city)}
  >
    <span>⭐ {city}</span>

    <span
      className="remove-icon"
      onClick={(e) => {
        e.stopPropagation();
        removeFavorite(city);
      }}
    >
      ✕
    </span>
  </button>
</div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;