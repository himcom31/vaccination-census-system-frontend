import React, { useRef, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  Title,
  Tooltip,
  LinearScale,
  BarElement,
  Legend,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Legend,
  Title,
  Tooltip,
  zoomPlugin
);

const BarGraph = ({ barDataMale, barDataFemale, barDataOthers }) => {
  const chartRef = useRef(null);

  const maxAge = 100;
  const [minAge, setMinAge] = useState(1);
  const [maxAgeState, setMaxAgeState] = useState(maxAge);

  const [showMale, setShowMale] = useState(true);
  const [showFemale, setShowFemale] = useState(true);
  const [showOthers, setShowOthers] = useState(true);

  // ---- Preprocess counts age 1–100 ----
  const labelsAll = Array.from({ length: maxAge }, (_, i) => i + 1);

  const maleCountsAll = new Array(maxAge).fill(0);
  const femaleCountsAll = new Array(maxAge).fill(0);
  const othersCountsAll = new Array(maxAge).fill(0);

  barDataMale.forEach(({ age, number_male }) => {
    const idx = parseInt(age, 10) - 1;
    if (idx >= 0 && idx < maxAge) maleCountsAll[idx] = parseInt(number_male, 10);
  });

  barDataFemale.forEach(({ age, number_female }) => {
    const idx = parseInt(age, 10) - 1;
    if (idx >= 0 && idx < maxAge) femaleCountsAll[idx] = parseInt(number_female, 10);
  });

  barDataOthers.forEach(({ age, number_others }) => {
    const idx = parseInt(age, 10) - 1;
    if (idx >= 0 && idx < maxAge) othersCountsAll[idx] = parseInt(number_others, 10);
  });

  // ---- Apply age range filter ----
  const startIndex = Math.max(0, minAge - 1);
  const endIndex = Math.min(maxAgeState - 1, maxAge - 1);

  const labels = labelsAll.slice(startIndex, endIndex + 1);
  const maleCounts = maleCountsAll.slice(startIndex, endIndex + 1);
  const femaleCounts = femaleCountsAll.slice(startIndex, endIndex + 1);
  const othersCounts = othersCountsAll.slice(startIndex, endIndex + 1);

  // ---- Build datasets based on toggles ----
  const datasets = [];
  if (showMale) {
    datasets.push({
      label: "Males",
      data: maleCounts,
      backgroundColor: "rgba(56, 189, 248, 0.9)", // sky-400
      hoverBackgroundColor: "rgba(56, 189, 248, 1)",
      borderColor: "#0ea5e9",
      hoverBorderColor: "#0369a1",
      borderWidth: 2,
      hoverBorderWidth: 3,
      borderRadius: 999,
      barPercentage: 0.7,
      categoryPercentage: 0.5,
    });
  }
  if (showFemale) {
    datasets.push({
      label: "Females",
      data: femaleCounts,
      backgroundColor: "rgba(244, 114, 182, 0.9)", // pink-400
      hoverBackgroundColor: "rgba(236, 72, 153, 1)",
      borderColor: "#ec4899",
      hoverBorderColor: "#be185d",
      borderWidth: 2,
      hoverBorderWidth: 3,
      borderRadius: 999,
      barPercentage: 0.7,
      categoryPercentage: 0.5,
    });
  }
  if (showOthers) {
    datasets.push({
      label: "Others",
      data: othersCounts,
      backgroundColor: "rgba(129, 140, 248, 0.95)", // indigo-400
      hoverBackgroundColor: "rgba(79, 70, 229, 1)",
      borderColor: "#6366f1",
      hoverBorderColor: "#3730a3",
      borderWidth: 2,
      hoverBorderWidth: 3,
      borderRadius: 999,
      barPercentage: 0.7,
      categoryPercentage: 0.5,
    });
  }

  const data = { labels, datasets };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 900,
      easing: "easeOutQuart",
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      title: {
        display: true,
        text: "Participants by Age & Gender",
        font: {
          size: 20,
          weight: "700",
        },
        color: "#0f172a",
        padding: { top: 10, bottom: 20 },
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
        },
      },
      tooltip: {
        backgroundColor: "rgba(15,23,42,0.95)",
        titleColor: "#e5e7eb",
        bodyColor: "#e5e7eb",
        borderColor: "#38bdf8",
        borderWidth: 1,
        padding: 12,
        cornerRadius: 10,
        displayColors: true,
        callbacks: {
          title: (items) => {
            if (!items.length) return "";
            const age = items[0].label;
            return `Age: ${age}`;
          },
          label: (ctx) => {
            const label = ctx.dataset.label || "";
            const value = ctx.parsed.y || 0;
            return `${label}: ${value} people`;
          },
        },
      },
      zoom: {
        pan: {
          enabled: true,
          mode: "x",
          speed: 10,
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: "x",
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Age (Years)",
          color: "#334155",
          font: { size: 14, weight: "600" },
        },
        grid: {
          color: "rgba(148,163,184,0.5)",
          lineWidth: 2, // vertical lines mota
        },
        ticks: {
          color: "#64748b",
          maxTicksLimit: 15,
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of People",
          color: "#334155",
          font: { size: 14, weight: "600" },
        },
        grid: {
          color: "rgba(226,232,240,0.7)",
          lineWidth: 1,
          drawBorder: false,
        },
        ticks: {
          color: "#64748b",
          precision: 0,
        },
      },
    },
  };

  // ---- Handlers for sliders ----
  const handleMinAgeChange = (e) => {
    const value = Number(e.target.value);
    if (value <= maxAgeState) setMinAge(value);
  };

  const handleMaxAgeChange = (e) => {
    const value = Number(e.target.value);
    if (value >= minAge) setMaxAgeState(value);
  };

  return (
    <div className="flex justify-center px-4 py-6">
      <div className="relative w-full max-w-5xl">
        {/* Background gradient glow */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-sky-300/40 via-indigo-300/40 to-pink-300/40 blur-3xl opacity-70" />

        {/* Card */}
        <div className="rounded-3xl border border-white/70 bg-white/80 backdrop-blur-xl shadow-[0_18px_60px_rgba(15,23,42,0.16)] p-6 md:p-8 transition-transform duration-300 hover:scale-[1.01] hover:shadow-[0_22px_70px_rgba(15,23,42,0.25)]">
          {/* Top section: title + pills */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-indigo-500 font-semibold">
                Demographic Distribution
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Age-wise comparison across male, female and others
              </p>
            </div>

            {/* Gender toggles */}
            <div className="flex flex-wrap gap-2 text-[11px]">
              <button
                type="button"
                onClick={() => setShowMale((prev) => !prev)}
                className={`inline-flex items-center gap-1 rounded-full px-3 py-1 border text-xs font-medium transition ${
                  showMale
                    ? "bg-sky-500 text-white border-sky-500 shadow-sm"
                    : "bg-sky-50 text-sky-600 border-sky-200 hover:bg-sky-100"
                }`}
              >
                <span className="h-2 w-2 rounded-full bg-sky-100 border border-white" />
                Males
              </button>
              <button
                type="button"
                onClick={() => setShowFemale((prev) => !prev)}
                className={`inline-flex items-center gap-1 rounded-full px-3 py-1 border text-xs font-medium transition ${
                  showFemale
                    ? "bg-pink-500 text-white border-pink-500 shadow-sm"
                    : "bg-pink-50 text-pink-600 border-pink-200 hover:bg-pink-100"
                }`}
              >
                <span className="h-2 w-2 rounded-full bg-pink-100 border border-white" />
                Females
              </button>
              <button
                type="button"
                onClick={() => setShowOthers((prev) => !prev)}
                className={`inline-flex items-center gap-1 rounded-full px-3 py-1 border text-xs font-medium transition ${
                  showOthers
                    ? "bg-indigo-500 text-white border-indigo-500 shadow-sm"
                    : "bg-indigo-50 text-indigo-600 border-indigo-200 hover:bg-indigo-100"
                }`}
              >
                <span className="h-2 w-2 rounded-full bg-indigo-100 border border-white" />
                Others
              </button>
            </div>
          </div>

          {/* Age range slider controls */}
          <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="text-xs text-slate-500">
              <span className="font-semibold text-slate-700">Age Range: </span>
              {minAge} – {maxAgeState} years
            </div>

            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
              <div className="flex flex-col text-[11px] text-slate-600">
                <span className="mb-1 font-medium">Min Age</span>
                <input
                  type="range"
                  min="1"
                  max={maxAge}
                  value={minAge}
                  onChange={handleMinAgeChange}
                  className="w-full md:w-44 accent-sky-500"
                />
              </div>
              <div className="flex flex-col text-[11px] text-slate-600">
                <span className="mb-1 font-medium">Max Age</span>
                <input
                  type="range"
                  min="1"
                  max={maxAge}
                  value={maxAgeState}
                  onChange={handleMaxAgeChange}
                  className="w-full md:w-44 accent-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="h-[380px] md:h-[430px]">
            <Bar ref={chartRef} data={data} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarGraph;
