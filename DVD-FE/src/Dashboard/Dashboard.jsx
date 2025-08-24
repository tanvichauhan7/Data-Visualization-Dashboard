import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";
import "./Dashboard.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [dataPoints, setDataPoints] = useState([
    { label: "Piku", value: 19 },
    { label: "Indranil", value: 20 },
    { label: "Label 3", value: 0 },
  ]);

  const labels = dataPoints.map((point) => point.label);
  const values = dataPoints.map((point) => point.value);

  const chartConfig = {
    labels,
    datasets: [
      {
        label: "Custom Data",
        data: values,
        backgroundColor: [
          "#2d89ff",
          "#ff6b6b",
          "#feca57",
          "#1dd1a1",
          "#5f27cd",
        ],
        borderColor: "#333",
        borderWidth: 1,
        tension: 0.4,
      },
    ],
  };

  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  // update label
  const updateLabel = (index, value) => {
    const newData = [...dataPoints];
    newData[index].label = value;
    setDataPoints(newData);
  };

  // update value
  const updateValue = (index, value) => {
    const newData = [...dataPoints];
    newData[index].value = Number(value);
    setDataPoints(newData);
  };

  // add new point
  const addPoint = () => {
    setDataPoints([
      ...dataPoints,
      { label: `Label ${dataPoints.length + 1}`, value: 0 },
    ]);
  };

  // remove point
  const removePoint = (index) => {
    setDataPoints(dataPoints.filter((_, i) => i !== index));
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Interactive Data Visualization Dashboard</h1>
      </header>

      {/* Inputs */}
      <div className="inputs-container">
        <h2 className="inputs-title">Edit Data Points</h2>
        {dataPoints.map((point, i) => (
          <div key={i} className="data-point">
            <div className="data-fields">
              <input
                type="text"
                value={point.label}
                onChange={(e) => updateLabel(i, e.target.value)}
                placeholder="Name"
              />
              <input
                type="number"
                value={point.value}
                onChange={(e) => updateValue(i, e.target.value)}
                placeholder="Value"
              />
            </div>
            <button className="remove-btn" onClick={() => removePoint(i)}>
              ✕
            </button>
          </div>
        ))}
        <button className="add-point" onClick={addPoint}>
          + Add Data Point
        </button>
      </div>

      {/* Charts */}
      <div className="charts-container">
        <div className="chart-item">
          <Bar data={chartConfig} options={defaultOptions} />
        </div>
        <div className="chart-item">
          <Line data={chartConfig} options={defaultOptions} />
        </div>
        <div className="chart-item pie-item">
          <Pie data={chartConfig} options={pieOptions} />
        </div>
      </div>
    </div>
  );
}
