function CompareCities({ weather, compareWeather }) {
  if (!weather || !compareWeather) return null;

  return (
    <div>
      <h2>🌍 Compare Cities</h2>

      <p>
        {weather.name} - {weather.main.temp}°C
      </p>

      <p>
        {compareWeather.name} - {compareWeather.main.temp}°C
      </p>
    </div>
  );
}

export default CompareCities;