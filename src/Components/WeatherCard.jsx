function WeatherCard({
  weather,
  addToFavorites,
  unit,
}){
  return (
    <div className="weather-card">
     <div className="hero-card">
  <div className="hero-left">
    <h2>
      📍 {weather.name}, {weather.sys.country}
    </h2>

    <p className="hero-date">
      {new Date().toLocaleDateString()} |{" "}
      {new Date().toLocaleTimeString()}
    </p>

    <h1 className="hero-temp">
  {unit === "C"
    ? Math.round(weather.main.temp)
    : Math.round(
        (weather.main.temp * 9) / 5 + 32
      )}
  °{unit}
</h1>

    <p className="hero-desc">
      {weather.weather[0].description}
    </p>

    <p className="hero-feels">
  Feels like{" "}
  {Math.round(weather.main.feels_like)}°C
</p>

    <button
      className="favorite-btn"
      onClick={addToFavorites}
    >
      ❤️ Add to Favorites
    </button>
  </div>

  <div className="hero-right">
    <img
      src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
      alt="Weather Icon"
    />
  </div>
</div>
      <div className="weather-details">
        <div className="detail-box">
          <h4>🌡️ Feels Like</h4>
          <p>
  {unit === "C"
    ? Math.round(weather.main.feels_like)
    : Math.round(
        (weather.main.feels_like * 9) / 5 + 32
      )}
  °{unit}
</p>
        </div>

        <div className="detail-box">
          <h4>💧 Humidity</h4>
          <p>{weather.main.humidity}%</p>
        </div>

        <div className="detail-box">
          <h4>🌬️ Wind Speed</h4>
          <p>{weather.wind.speed} m/s</p>
        </div>

        <div className="detail-box">
          <h4>📈 Pressure</h4>
          <p>{weather.main.pressure} hPa</p>
        </div>

        <div className="detail-box">
          <h4>👁️ Visibility</h4>
          <p>{weather.visibility / 1000} km</p>
        </div>

        <div className="detail-box">
          <h4>🌅 Sunrise</h4>
          <p>
            {new Date(
              weather.sys.sunrise * 1000
            ).toLocaleTimeString()}
          </p>
        </div>
        <div className="detail-box">
          <h4>🌇 Sunset</h4>
          <p>
            {new Date(
              weather.sys.sunset * 1000
            ).toLocaleTimeString()}
          </p>
        </div>

        <div className="detail-box">
          <h4>🔥 Max Temp</h4>
          <p>
  {unit === "C"
    ? Math.round(weather.main.temp_max)
    : Math.round(
        (weather.main.temp_max * 9) / 5 + 32
      )}
  °{unit}
</p>
        </div>

        <div className="detail-box">
          <h4>❄️ Min Temp</h4>
          <p>
  {unit === "C"
    ? Math.round(weather.main.temp_min)
    : Math.round(
        (weather.main.temp_min * 9) / 5 + 32
      )}
  °{unit}
</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;