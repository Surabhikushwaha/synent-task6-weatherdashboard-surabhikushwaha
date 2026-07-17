function Forecast({ forecast }) {
  return (
    <>
      {forecast.length > 0 && (
        <div className="forecast">
          <h2>📅 5-Day Forecast</h2>

          <div className="forecast-container">
            {forecast.map((day, index) => (
              <div key={index} className="forecast-card">
                <p>
                  {new Date(day.dt_txt).toLocaleDateString()}
                </p>

                <img
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                  alt="Forecast Icon"
                />

                <p>{day.main.temp}°C</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Forecast;