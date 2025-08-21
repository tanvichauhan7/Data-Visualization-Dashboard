import { useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement,
} from "chart.js";
import "./App.css";

// Register Chart.js modules
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement
);

export default function App() {
  // State for bar chart data
  const [barValues, setBarValues] = useState([12000, 15000, 10000, 17000, 20000, 25000]);

  // State for line chart data
  const [lineValues, setLineValues] = useState([3000, 4000, 3500, 4500, 5000, 6000]);

  // State for pie chart data
  const [pieValues, setPieValues] = useState([55, 25, 20]);

  // Chart Data
  const barData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Monthly Sales ($)",
        data: barValues,
        backgroundColor: ["#ff6384", "#36a2eb", "#cc65fe", "#ffce56", "#4bc0c0", "#9966ff"],
      },
    ],
  };

  const lineData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Website Traffic",
        data: lineValues,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const pieData = {
    labels: ["Desktop", "Tablet", "Mobile"],
    datasets: [
      {
        data: pieValues,
        backgroundColor: ["#ff6384", "#36a2eb", "#cc65fe"],
      },
    ],
  };

  // Handle input changes
  const handleBarChange = (index, value) => {
    const updated = [...barValues];
    updated[index] = Number(value);
    setBarValues(updated);
  };

  const handleLineChange = (index, value) => {
    const updated = [...lineValues];
    updated[index] = Number(value);
    setLineValues(updated);
  };

  const handlePieChange = (index, value) => {
    const updated = [...pieValues];
    updated[index] = Number(value);
    setPieValues(updated);
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Interactive Data Visualization Dashboard</h1>
      </header>

      {/* Input Section */}
      <div className="inputs-container">
        <h2>Enter Bar Chart Data</h2>
        {barValues.map((val, i) => (
          <input
            key={i}
            type="number"
            value={val}
            onChange={(e) => handleBarChange(i, e.target.value)}
          />
        ))}

        <h2>Enter Line Chart Data</h2>
        {lineValues.map((val, i) => (
          <input
            key={i}
            type="number"
            value={val}
            onChange={(e) => handleLineChange(i, e.target.value)}
          />
        ))}

        <h2>Enter Pie Chart Data</h2>
        {pieValues.map((val, i) => (
          <input
            key={i}
            type="number"
            value={val}
            onChange={(e) => handlePieChange(i, e.target.value)}
          />
        ))}
      </div>

      {/* Charts */}
      <div className="charts-container">
        <div className="chart-item">
          <Bar data={barData} options={{ responsive: true }} />
        </div>
        <div className="chart-item">
          <Line data={lineData} options={{ responsive: true }} />
        </div>
        <div className="chart-item">
          <Pie data={pieData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
}
