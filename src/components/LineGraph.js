import React, { useRef, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  Filler,
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  Legend,
  Title,
  Tooltip,
  LineElement,
  PointElement,
  Filler
);

const LineGraph = ({ lineData, lineData2 }) => {
  const chartRef = useRef(null);

  // Convert data
  const vaccinatedData = lineData
    .map((d) => ({
      x: Number(d._id),
      y: Number(d.number_vaccinated),
    }))
    .filter((p) => !isNaN(p.x) && !isNaN(p.y));

  const notVaccinatedData = lineData2
    .map((d) => ({
      x: Number(d._id),
      y: Number(d.number_not_vaccinated),
    }))
    .filter((p) => !isNaN(p.x) && !isNaN(p.y));

  // Gradient fills (on mount)
  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    const ctx = chart.ctx;
    const height = chart.chartArea?.bottom || 400;

    // Vaccinated gradient
    const vaccinatedGradient = ctx.createLinearGradient(0, 0, 0, height);
    vaccinatedGradient.addColorStop(0, "rgba(56, 189, 248, 0.45)"); // sky-400
    vaccinatedGradient.addColorStop(1, "rgba(56, 189, 248, 0)");

    // Not vaccinated gradient
    const unvaccinatedGradient = ctx.createLinearGradient(0, 0, 0, height);
    unvaccinatedGradient.addColorStop(0, "rgba(244, 114, 182, 0.45)"); // pink-400
    unvaccinatedGradient.addColorStop(1, "rgba(244, 114, 182, 0)");

    chart.data.datasets[0].backgroundColor = vaccinatedGradient;
    chart.data.datasets[1].backgroundColor = unvaccinatedGradient;
    chart.update();
  }, []);

  const data = {
    datasets: [
      {
        label: "Vaccinated",
        data: vaccinatedData,
        borderColor: "rgba(56, 189, 248, 1)", // sky-400
        fill: true,
        tension: 0.45,
        borderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBorderWidth: 2,
        pointBackgroundColor: "#0ea5e9", // sky-500
        pointBorderColor: "#e0f2fe",
      },
      {
        label: "Not Vaccinated",
        data: notVaccinatedData,
        borderColor: "rgba(244, 114, 182, 1)", // pink-400
        fill: true,
        tension: 0.45,
        borderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBorderWidth: 2,
        pointBackgroundColor: "#ec4899", // pink-500
        pointBorderColor: "#fdf2ff",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 900,
      easing: "easeOutQuart",
    },
    plugins: {
      title: {
        display: true,
        text: "Vaccination Trend by Age",
        font: {
          size: 20,
          weight: "700",
        },
        color: "#0f172a",
        padding: { bottom: 16 },
      },
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 16,
          color: "#475569",
          font: {
            size: 13,
            weight: "500",
          },
          // Custom legend marker spacing
          boxWidth: 8,
        },
      },
      tooltip: {
        backgroundColor: "rgba(15,23,42,0.95)",
        titleColor: "#e5e7eb",
        bodyColor: "#e5e7eb",
        borderColor: "#38bdf8",
        borderWidth: 1,
        cornerRadius: 10,
        padding: 12,
        displayColors: false,
        callbacks: {
          title: (items) => {
            if (!items.length) return "";
            const age = items[0].parsed.x;
            return `Age: ${age}`;
          },
          label: (ctx) => {
            const value = ctx.parsed.y;
            return `People: ${value}`;
          },
        },
      },
    },
    scales: {
      x: {
        type: "linear",
        title: {
          display: true,
          text: "Age (Years)",
          font: { size: 14, weight: "600" },
          color: "#334155",
        },
        grid: {
          color: "rgba(226,232,240,0.7)",
          drawBorder: false,
        },
        ticks: {
          color: "#64748b",
          callback: (val) => Number(val).toFixed(0),
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of People",
          font: { size: 14, weight: "600" },
          color: "#334155",
        },
        grid: {
          color: "rgba(226,232,240,0.7)",
          drawBorder: false,
        },
        ticks: {
          color: "#64748b",
          precision: 0,
        },
      },
    },
  };

  return (
    <div className="flex justify-center px-4 py-6">
      <div className="relative w-full max-w-5xl">
        {/* Background gradient glow */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-sky-300/40 via-indigo-300/40 to-pink-300/40 blur-3xl opacity-70" />

        {/* Card */}
        <div className="rounded-3xl border border-white/70 bg-white/80 backdrop-blur-xl shadow-[0_18px_60px_rgba(15,23,42,0.16)] p-6 md:p-8 transition-transform duration-300 hover:scale-[1.01] hover:shadow-[0_22px_70px_rgba(15,23,42,0.25)]">
          {/* Header small badge */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-sky-500 font-semibold">
                Vaccination Analytics
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Comparison of vaccinated vs not vaccinated across age groups
              </p>
            </div>
            <div className="hidden md:flex gap-2 text-[10px]">
              <span className="inline-flex items-center gap-1 rounded-full bg-sky-100 text-sky-700 px-2 py-1">
                <span className="h-2 w-2 rounded-full bg-sky-500" />
                Vaccinated
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-pink-100 text-pink-700 px-2 py-1">
                <span className="h-2 w-2 rounded-full bg-pink-500" />
                Not Vaccinated
              </span>
            </div>
          </div>

          {/* Chart Container */}
          <div className="h-[380px] md:h-[420px]">
            <Line
              ref={(chart) => {
                // react-chartjs-2 passes chart instance here
                chartRef.current = chart;
              }}
              data={data}
              options={options}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LineGraph;
