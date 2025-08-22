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
  const [dataPoints, setDataPoints] = useState([
    { x: "January", y: 12000 },
    { x: "February", y: 15000 },
    { x: "March", y: 10000 },
  ]);

  // Modal state
  const [expandedChart, setExpandedChart] = useState(null);

  const addDataPoint = () => {
    setDataPoints([...dataPoints, { x: `Label ${dataPoints.length + 1}`, y: 0 }]);
  };

  const handleChange = (index, field, value) => {
    const updated = [...dataPoints];
    updated[index][field] = field === "y" ? Number(value) : value;
    setDataPoints(updated);
  };

  const removeDataPoint = (index) => {
    const updated = dataPoints.filter((_, i) => i !== index);
    setDataPoints(updated);
  };

  const labels = dataPoints.map((point) => point.x);
  const values = dataPoints.map((point) => point.y);

  const chartConfig = {
    labels,
    datasets: [
      {
        label: "Custom Data",
        data: values,
        backgroundColor: [
          "#ff6384",
          "#36a2eb",
          "#cc65fe",
          "#ffce56",
          "#4bc0c0",
          "#9966ff",
        ],
        borderColor: "rgba(54, 162, 235, 1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Chart options
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" },
    },
  };

  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: true,
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
  <h1
    style={{
      fontSize: "1.8rem", // smaller than default h1
      fontWeight: "600",
      margin: "10px 0",
    }}
  >
    Interactive Data Visualization Dashboard
  </h1>
</header>

      {/* Input Section */}
      <div className="inputs-container">
        <h2>Edit Data Points</h2>
        {dataPoints.map((point, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <input
              type="text"
              value={point.x}
              onChange={(e) => handleChange(i, "x", e.target.value)}
              placeholder="Label"
            />
            <input
              type="number"
              value={point.y}
              onChange={(e) => handleChange(i, "y", e.target.value)}
              placeholder="Value"
            />
            <button
              onClick={() => removeDataPoint(i)}
              style={{
                background: "none",
                color: "#666",
                border: "none",
                fontSize: "0.9rem",
                cursor: "pointer",
                padding: "2px 5px",
                borderRadius: "4px",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#000")}
              onMouseLeave={(e) => (e.target.style.color = "#666")}
            >
              ❌
            </button>
          </div>
        ))}
        <button
          onClick={addDataPoint}
          style={{
            marginTop: "10px",
            padding: "6px 12px",
            background: "#2d89ff",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          ➕ Add Data Point
        </button>
      </div>

      {/* Charts */}
      <div className="charts-container">
        <div className="chart-item" onClick={() => setExpandedChart("bar")}>
          <Bar data={chartConfig} options={defaultOptions} />
        </div>
        <div className="chart-item" onClick={() => setExpandedChart("line")}>
          <Line data={chartConfig} options={defaultOptions} />
        </div>
        <div
          className="chart-item"
          style={{ height: "250px" }} // small pie
          onClick={() => setExpandedChart("pie")}
        >
          <Pie data={chartConfig} options={pieOptions} />
        </div>
      </div>

      {/* Modal Overlay */}
      {expandedChart && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
          onClick={() => setExpandedChart(null)}
        >
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "12px",
              width: "80%",
              maxWidth: "900px",
              height: "80vh", // keeps pie chart smaller in modal
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {expandedChart === "bar" && <Bar data={chartConfig} options={defaultOptions} />}
            {expandedChart === "line" && <Line data={chartConfig} options={defaultOptions} />}
            {expandedChart === "pie" && (
              <div style={{ width: "50%", height: "50%" }}>
                <Pie data={chartConfig} options={pieOptions} />
              </div>
            )}
            <button
              onClick={() => setExpandedChart(null)}
              style={{
                marginTop: "15px",
                padding: "6px 12px",
                background: "#2d89ff",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Close ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
