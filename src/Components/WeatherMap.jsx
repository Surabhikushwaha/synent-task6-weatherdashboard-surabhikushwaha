import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

function WeatherMap({ weather }) {
  if (!weather) return null;

  const position = [
    weather.coord.lat,
    weather.coord.lon,
  ];

  return (
    <div className="weather-map">
      <h2>🗺️ Weather Map</h2>

      <MapContainer
        center={position}
        zoom={10}
        style={{
          height: "320px",
          width: "100%",
          borderRadius: "20px",
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position}>
          <Popup>
            <h3>{weather.name}</h3>
<p className="map-subtitle">
  Current Location
</p>
            <p>
              🌡️ {weather.main.temp}°C
            </p>

            <p>
              {weather.weather[0].description}
            </p>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default WeatherMap;