import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TemperatureChart = ({ weatherData }) => {
  if (!weatherData.length) return <div>Loading chart...</div>;

  const data = {
    labels: weatherData.slice(0, 10).map((data) => data.city),
    datasets: [
      {
        label: "Temperature (°C)",
        data: weatherData.slice(0, 10).map((data) => data.temp),
        fill: false,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white shadow-md p-5 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-600">Temperature Trends</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default TemperatureChart;
