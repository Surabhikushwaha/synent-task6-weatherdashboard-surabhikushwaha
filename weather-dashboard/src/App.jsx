import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dateTime, setDateTime] = useState(new Date());
  const [darkMode, setDarkMode] = useState(false);

  const API_KEY = "e51fbda9fc678673c9ca499c6b14d611";

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getWeather = async () => {
    if (city === "") {
      setError("Please enter a city name");
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      const data = await response.json();

      if (data.cod === "404") {
        setError("City not found");
        return;
      }

      setWeather(data);
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={darkMode ? "container dark" : "container"}>
      <button
        className="theme-btn"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      <h1>🌤️ Weather Dashboard</h1>

      <p className="date">
        {dateTime.toLocaleDateString()} |{" "}
        {dateTime.toLocaleTimeString()}
      </p>

      <p className="subtitle">
        Get real-time weather updates from anywhere in the world
      </p>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button onClick={getWeather}>Search</button>
      </div>

      {loading && <p className="loading">Loading...</p>}

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>

          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
            alt="Weather Icon"
          />

          <h3>{weather.main.temp}°C</h3>

          <p>{weather.weather[0].description}</p>

          <p>🌡️ Feels Like: {weather.main.feels_like}°C</p>

          <p>💧 Humidity: {weather.main.humidity}%</p>

          <p>🌬️ Wind Speed: {weather.wind.speed} m/s</p>

          <p>📈 Pressure: {weather.main.pressure} hPa</p>

          <p>👁️ Visibility: {weather.visibility / 1000} km</p>
        </div>
      )}

      <footer>
        Developed by Surabhi Kushwaha | React + OpenWeather API
      </footer>
    </div>
  );
}

export default App;