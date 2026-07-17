function CompareCities({ weather, compareWeather }) {
  if (!weather || !compareWeather) {
    return null;
  }

  return (
    <div className="compare-card">
      <h2>🌍 Compare Cities</h2>

      <div className="compare-container">
        <div className="city-box">
          <h3>{weather.name}</h3>
          <p>🌡️ {weather.main.temp}°C</p>
        </div>

        <div className="city-box">
          <h3>{compareWeather.name}</h3>
          <p>🌡️ {compareWeather.main.temp}°C</p>
        </div>
      </div>
    </div>
  );
}

export default CompareCities;