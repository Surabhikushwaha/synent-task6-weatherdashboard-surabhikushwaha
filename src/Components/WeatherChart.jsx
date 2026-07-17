import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function WeatherChart({ forecast }) {
  const chartData = forecast.map((item) => ({
    day: new Date(item.dt_txt).toLocaleDateString(
      "en-US",
      { weekday: "short" }
    ),
    temp: item.main.temp,
  }));

  return (
    <div className="chart-card">
      <h2>📊 Temperature Forecast</h2>

      <LineChart
        width={350}
        height={250}
        data={chartData}
      >
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="day" />

        <YAxis />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="temp"
          stroke="#8884d8"
        />
      </LineChart>
    </div>
  );
}

export default WeatherChart;