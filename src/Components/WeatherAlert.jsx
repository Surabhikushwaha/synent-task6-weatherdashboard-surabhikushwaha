function WeatherAlert({ weather, aqi }) {
  let alertMessage = "";
  let alertEmoji = "";

  if (weather?.main?.temp >= 38) {
    alertEmoji = "🔥";
    alertMessage = "Very hot weather. Stay hydrated!";
  } else if (weather?.main?.temp <= 10) {
    alertEmoji = "🥶";
    alertMessage = "Cold weather. Wear warm clothes.";
  } else if (weather?.wind?.speed >= 12) {
    alertEmoji = "🌬️";
    alertMessage = "Strong winds expected.";
  } else if (aqi?.main?.aqi >= 4) {
    alertEmoji = "😷";
    alertMessage = "Poor air quality. Wear a mask.";
  } else if (weather?.weather[0]?.main === "Rain") {
    alertEmoji = "🌧️";
    alertMessage = "Rain expected. Carry an umbrella.";
  }

  if (!alertMessage) return null;

  return (
    <div className="alert-card">
      <h2>⚠️ Weather Alert</h2>

      <p>
        {alertEmoji} {alertMessage}
      </p>
    </div>
  );
}

export default WeatherAlert;