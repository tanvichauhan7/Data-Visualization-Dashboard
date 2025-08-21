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
  // Bar Chart Data
  const barData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Monthly Sales ($)",
        data: [12000, 15000, 10000, 17000, 20000, 25000],
        backgroundColor: [
          "#ff6384",
          "#36a2eb",
          "#cc65fe",
          "#ffce56",
          "#4bc0c0",
          "#9966ff",
        ],
      },
    ],
  };

  // Line Chart Data
  const lineData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Website Traffic",
        data: [3000, 4000, 3500, 4500, 5000, 6000],
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Pie Chart Data
  const pieData = {
    labels: ["Desktop", "Tablet", "Mobile"],
    datasets: [
      {
        data: [55, 25, 20],
        backgroundColor: ["#ff6384", "#36a2eb", "#cc65fe"],
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Data Visualization Dashboard</h1>
      </header>
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