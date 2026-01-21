import React, { useMemo, useState, useEffect } from "react";
import { weatherIconMap } from "../weatherIcons";
import rainDropSVG from "../assets/rainDrop.svg";

import {
  LineChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  LabelList,
} from "recharts";

import "./HourlyWeatherGraph.css";

// ======================= CUSTOM X-AXIS TICK ===========================
const PrecipTick = ({ x, y, payload }) => {
  if (!payload || !payload.payload) return null;

  const item = payload.payload;
  const localIcon = weatherIconMap[item?.icon];

  return (
    <g transform={`translate(${x},${y})`}>
      {/* TIME */}
      <text
        x={0}
        y={-35}
        textAnchor="middle"
        fontSize="12"
        fill="#007bff"
        fontWeight="600"
      >
        {item?.time}
      </text>

      {/* FIXED ICON */}
      {localIcon && (
        <image
          xlinkHref={localIcon}
          x={-14}
          y={-22}
          width={28}
          height={28}
        />
      )}

      {/* TEMP */}
      <text
        x={0}
        y={0}
        dy={10}
        textAnchor="middle"
        fontSize="12"
        fill="#ff8c00"
        fontWeight="600"
      >
        {item?.temp !== null ? `${Math.round(item.temp)}°${item.unit}` : "--"}
      </text>
    </g>
  );
};

// ======================= MAIN COMPONENT ===========================
export default function HourlyWeatherGraph({ hourly, unit, activeTab = "" }) {
  const [yAxisMetric, setYAxisMetric] = useState("temp");
  const [lineMetric, setLineMetric] = useState("temp");

  // Sync metrics with active tab
  useEffect(() => {
    switch (activeTab) {
      case "Wind":
        setYAxisMetric("wind");
        setLineMetric("wind");
        break;
      case "Humidity":
        setYAxisMetric("humidity");
        setLineMetric("humidity");
        break;
      case "Visibility":
        setYAxisMetric("visibility");
        setLineMetric("visibility");
        break;
      case "Overview":
      default:
        setYAxisMetric("temp");
        setLineMetric("temp");
        break;
    }
  }, [activeTab]);

  const finalData = useMemo(() => {
    return hourly.map((item) => ({
      time: item.time,
      temp: item.temp ?? null,
      precipitation: item.precipitation ?? 0,
      icon: item.icon ?? null,
      unit: unit,
      wind: item.wind ?? 0,
      humidity: item.humidity ?? 0,
      visibility: item.visibility ?? 0,
    }));
  }, [hourly, unit]);

  const getYAxisLabel = () => {
    switch (yAxisMetric) {
      case "temp":
        return `°${unit}`;
      case "wind":
        return "m/s";
      case "humidity":
        return "%";
      case "visibility":
        return "km";
      default:
        return "";
    }
  };

  const getLineColor = () => {
    switch (lineMetric) {
      case "temp":
        return "#ff7b00";
      case "wind":
        return "#1e40af";
      case "humidity":
        return "#0369a1";
      case "visibility":
        return "#7c3aed";
      default:
        return "#ff7b00";
    }
  };

  const getMetricLabel = () => {
    switch (yAxisMetric) {
      case "temp":
        return "Temperature Forecast";
      case "wind":
        return "Wind Speed Forecast";
      case "humidity":
        return "Humidity Forecast";
      case "visibility":
        return "Visibility Forecast";
      default:
        return "Hourly Forecast";
    }
  };

  return (
    <div className="hourly-wrapper">
      <div className="hourly-header-controls">
        <h3 className="hourly-title">{getMetricLabel()}</h3>

        <div className="metric-controls">
          <div className="control-group">
            <label>Y-Axis:</label>
            <select value={yAxisMetric} onChange={(e) => setYAxisMetric(e.target.value)}>
              <option value="temp">Temperature</option>
              <option value="wind">Wind Speed</option>
              <option value="humidity">Humidity</option>
              <option value="visibility">Visibility</option>
            </select>
          </div>

          <div className="control-group">
            <label>Line:</label>
            <select value={lineMetric} onChange={(e) => setLineMetric(e.target.value)}>
              <option value="temp">Temperature</option>
              <option value="wind">Wind Speed</option>
              <option value="humidity">Humidity</option>
              <option value="visibility">Visibility</option>
            </select>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <div className="hourly-header">
        {finalData.map((item, i) => (
          <div key={i} className="hourly-header-item">
            <p className="h-time">{item.time}</p>

            {item.icon ? (
              <img
                className="h-icon"
                src={item.icon}
                alt="weather icon"
              />
            ) : (
              <div className="no-icon" />
            )}

            <p className="h-temp">
              {item.temp !== null ? `${Math.round(item.temp)}°${item.unit}` : "--"}
            </p>

            <p className="h-wind">
              💨 {item.wind} m/s
            </p>

            <p className="h-humidity">
              💧 {item.humidity}%
            </p>

            <p className="h-visibility">
              👁️ {item.visibility} km
            </p>
          </div>
        ))}
      </div>

      {/* GRAPH */}
      <div className="scroll-area">
        <ResponsiveContainer width={1300} height={380}>
          <LineChart data={finalData} margin={{ top: 20, bottom: 60 }}>
            <CartesianGrid stroke="#e0e0e0" strokeDasharray="4 4" />

            <XAxis
              dataKey="time"
              tick={<PrecipTick />}
              interval={10}
              height={100}
            />

            <YAxis
              yAxisId="left"
              tickFormatter={(value) => `${value}${getYAxisLabel()}`}
              tick={{ fill: "#444", fontSize: 12, fontWeight: 600 }}
            />

            <YAxis
              yAxisId="right"
              orientation="right"
              tickFormatter={(value) => `${value}%`}
              tick={{ fill: "#444", fontSize: 12, fontWeight: 600 }}
            />

            <Bar
              yAxisId="right"
              dataKey="precipitation"
              fill="#4aa3ff"
              barSize={20}
              opacity={0.55}
              radius={[6, 6, 0, 0]}
            >
              <LabelList
                dataKey="precipitation"
                content={(props) => {
                  const { x, value, viewBox } = props;
                  const fixedY = viewBox.y + viewBox.height + 15;

                  return (
                    <g transform={`translate(${x - 10}, ${fixedY})`}>
                      <image
                        href={rainDropSVG}
                        width={14}
                        height={14}
                        x={0}
                        y={-10}
                      />
                      <text
                        x={20}
                        y={0}
                        fontSize="12"
                        fill="black"
                        fontWeight="600"
                      >
                        {value}%
                      </text>
                    </g>
                  );
                }}
              />
            </Bar>

            <Line
              yAxisId="left"
              type="monotone"
              dataKey={lineMetric}
              stroke={getLineColor()}
              strokeWidth={3}
              dot={{ r: 6 }}
              activeDot={{ r: 8 }}
            />

            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
