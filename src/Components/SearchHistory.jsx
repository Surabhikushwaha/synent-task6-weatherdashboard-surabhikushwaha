function SearchHistory({
  history,
  handleRecentSearch,
  clearHistory,
}) {
  return (
    <>
      {history.length > 0 && (
        <div className="history">
          <div className="history-header">
  <h3>🕒 Recent Searches</h3>

  <button
  className="clear-btn"
  onClick={clearHistory}
>
  🗑️
</button>
</div>

          <div className="history-buttons">
            {history.map((item, index) => (
              <button
                key={index}
                className="history-btn"
                onClick={() => handleRecentSearch(item)}
              >
                📍 {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default SearchHistory;