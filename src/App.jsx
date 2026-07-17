import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import "./App.css";
import WeatherCard from "./components/WeatherCard";
import SearchHistory from "./components/SearchHistory";
import Forecast from "./components/Forecast";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AQI from "./components/AQI";
import WeatherChart from "./components/WeatherChart";
import WeatherMap from "./components/WeatherMap";
import Favorites from "./components/Favorites";



function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dateTime, setDateTime] = useState(new Date());
  const [darkMode, setDarkMode] = useState(false);
  const [history, setHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [unit, setUnit] = useState("C");
  
   const [aqi, setAqi] = useState(null);
  const handleRecentSearch = (cityName) => {
  setCity(cityName);
 
  

  fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
)
  .then((response) => response.json())
  .then((data) => {
    setWeather(data);
    getForecast(cityName);
    getAQI(data.coord.lat, data.coord.lon);
  })
  .catch(() => setError("Something went wrong"));
};

  const API_KEY = import.meta.env.VITE_API_KEY;

  const getCurrentLocationWeather = () => {
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
        );

        const data = await response.json();

        setWeather(data);
        getForecast(data.name);
        getAQI(data.coord.lat, data.coord.lon);
        
      
      } catch (error) {
        setError("Unable to fetch location weather");
      }
    },
    () => {
      setError("Location permission denied");
    }
  );
};

useEffect(() => {
  getCurrentLocationWeather();

  const timer = setInterval(() => {
    setDateTime(new Date());
  }, 1000);

  return () => clearInterval(timer);
}, []);
useEffect(() => {
  const savedHistory =
    JSON.parse(localStorage.getItem("history")) || [];

  setHistory(savedHistory);
}, []);
useEffect(() => {
  localStorage.setItem(
    "history",
    JSON.stringify(history)
  );
}, [history]);
useEffect(() => {
  const savedFavorites =
    JSON.parse(localStorage.getItem("favorites")) || [];

  setFavorites(savedFavorites);
}, []);

useEffect(() => {
  localStorage.setItem(
    "favorites",
    JSON.stringify(favorites)
  );
}, [favorites]);


const getForecast = async (cityName) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
    );
    

    const data = await response.json();

    const dailyForecast = data.list.filter(
      (item) => item.dt_txt.includes("12:00:00")
    );

    setForecast(dailyForecast);
  } catch (error) {
    console.log(error);
  }
};
const getAQI = async (lat, lon) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );

    const data = await response.json();

    setAqi(data.list[0]);
  } catch (error) {
    console.log("AQI error:", error);
  }
};

const getWeather = async (searchCity = city) => {
  if (searchCity === "") {
    setError("Search any city in the world");
    return;
  }

  setLoading(true);
  setError("");
  setWeather(null);

  getForecast(searchCity);

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}&units=metric`
    );

    const data = await response.json();

    if (data.cod === "404") {
      setError("City not found");
      return;
    }

    setWeather(data);

    getAQI(data.coord.lat, data.coord.lon);

   setHistory((prev) => [
  searchCity,
  ...prev.filter(
    (item) => item !== searchCity
  ),
]);
  } catch (err) {
    setError("Something went wrong");
  } finally {
    setLoading(false);
  }
};
 
const addToFavorites = () => {
  if (
    weather &&
    !favorites.includes(weather.name)
  ) {
    setFavorites([...favorites, weather.name]);
  }
};
const removeFavorite = (cityName) => {
  setFavorites(
    favorites.filter(
      (city) => city !== cityName
    )
  );
};
const clearHistory = () => {
  setHistory([]);
  localStorage.removeItem("history");
};
  const weatherCondition = weather?.weather[0]?.main;

 let backgroundClass = "cloudy";


if (weatherCondition === "Clear") {
  backgroundClass = "sunny";
} else if (weatherCondition === "Clouds") {
  backgroundClass = "cloudy";
} else if (weatherCondition === "Rain") {
  backgroundClass = "rainy";
} else if (weatherCondition === "Snow") {
  backgroundClass = "snowy";
} else if (weatherCondition === "Thunderstorm") {
  backgroundClass = "stormy";
}

console.log(weatherCondition);
return (
     
<div
  className={`container ${backgroundClass} ${
    darkMode ? "dark" : ""
  }`}
>
  <div className="weather-animation"></div>
      <Navbar
  darkMode={darkMode}
  setDarkMode={setDarkMode}
/>

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
    placeholder="🔍 Search city (Delhi, Mumbai, London...)"
    value={city}
    onChange={(e) => setCity(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        getWeather();
      }
    }}
  />
  

  <button onClick={getWeather}>
    <FaSearch /> Search
  </button>
  
</div>
<div className="unit-toggle">
  <button
    className={unit === "C" ? "active-unit" : ""}
    onClick={() => setUnit("C")}
  >
    °C
  </button>

  <button
    className={unit === "F" ? "active-unit" : ""}
    onClick={() => setUnit("F")}
  >
    °F
  </button>
</div>
      
<button
  className="location-btn"
  onClick={getCurrentLocationWeather}
>
  📍 Use My Current Location
</button>

      

      {error && <p className="error">{error}</p>}

     {weather && (
  <WeatherCard
    weather={weather}
    addToFavorites={addToFavorites}
    unit={unit}
  />
)}
      {aqi && <AQI aqi={aqi} />}

{<SearchHistory
  history={history}
  handleRecentSearch={handleRecentSearch}
  clearHistory={clearHistory}
/>}
<Favorites
  favorites={favorites}
  handleRecentSearch={handleRecentSearch}
  removeFavorite={removeFavorite}
/>
<Forecast forecast={forecast} />
<div className="analytics-section">
  <h1 className="section-title">
    📊 Weather Analytics
  </h1>

  <div className="bottom-row">
    <div className="chart-section">
      {forecast.length > 0 && (
        <WeatherChart forecast={forecast} />
      )}
    </div>

    <div className="map-section">
      {weather && (
        <WeatherMap weather={weather} />
      )}
    </div>
  </div>
</div>
     <Footer />
    </div>
  );
}

export default App;