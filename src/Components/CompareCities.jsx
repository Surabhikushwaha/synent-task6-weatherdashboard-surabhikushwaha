function CompareCities({ weather, compareWeather }) {
  if (!weather || !compareWeather) {
    return null;
  }

  return (
    <div className="compare-container">
  <div className="city-box">
    <h3>{weather.name}</h3>

    <p>🌡️ {Math.round(weather.main.temp)}°C</p>

    <p>💧 {weather.main.humidity}%</p>

    <p>🌬️ {weather.wind.speed} m/s</p>
  </div>

  <div className="city-box">
    <h3>{compareWeather.name}</h3>

    <p>🌡️ {Math.round(compareWeather.main.temp)}°C</p>

    <p>💧 {compareWeather.main.humidity}%</p>

    <p>🌬️ {compareWeather.wind.speed} m/s</p>
  </div>
</div>
  );
}

export default CompareCities;