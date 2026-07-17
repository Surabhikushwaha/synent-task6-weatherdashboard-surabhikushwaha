function AQI({ aqi }) {
  if (!aqi) return null;
  const aqiLevel = aqi.main.aqi;

let aqiText = "";
let aqiColor = "";

if (aqiLevel === 1) {
  aqiText = "Good";
  aqiColor = "#22c55e";
} else if (aqiLevel === 2) {
  aqiText = "Fair";
  aqiColor = "#84cc16";
} else if (aqiLevel === 3) {
  aqiText = "Moderate";
  aqiColor = "#facc15";
} else if (aqiLevel === 4) {
  aqiText = "Poor";
  aqiColor = "#f97316";
} else {
  aqiText = "Very Poor";
  aqiColor = "#ef4444";
}

  return (
    <div className="weather-card">
      <h2>🌫️ Air Quality Index</h2>

      <h3>{aqi.main.aqi}</h3>
<p
  style={{
    color: aqiColor,
    fontWeight: "bold",
    fontSize: "22px",
  }}
>
  {aqiText}
</p>
      <p>PM2.5: {aqi.components.pm2_5}</p>

      <p>PM10: {aqi.components.pm10}</p>

      <p>CO: {aqi.components.co}</p>
    </div>
  );
}

export default AQI;