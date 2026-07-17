function HourlyForecast({ hourlyForecast }) {
  return (
    <div className="hourly-container">
      <h2>⏰ 24-Hour Forecast</h2>

      <div className="hourly-cards">
        {hourlyForecast.map((item, index) => (
          <div key={index} className="hourly-card">
            <p>
              {new Date(item.dt * 1000).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>

            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
              alt=""
            />

            <h3>{Math.round(item.main.temp)}°C</h3>

            <p>{item.weather[0].main}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HourlyForecast;