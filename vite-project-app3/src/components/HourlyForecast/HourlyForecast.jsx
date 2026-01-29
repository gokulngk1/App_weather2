import React, { useMemo, useState, useEffect } from "react";
import { weatherIconMap } from "../weatherIcons";

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
const PrecipTick = ({ x, y, payload, metric, getLabel }) => {
  if (!payload || !payload.payload) return null;

  const item = payload.payload;
  const localIcon = weatherIconMap[item?.icon];
  const value = item?.[metric];
  

  return (
    <g transform={`translate(${x},${y})`}>
      {/* TIME */}
      <text
        x={0}
        y={15}
        textAnchor="middle"
        fontSize="11"
        fill="#007bff"
        fontWeight="600"
      >
        {item?.time}
      </text>

      {/* METRIC VALUE - Displayed below time */}
      <text
        x={0}
        y={30}
        textAnchor="middle"
        fontSize="12"
        fill="#ff7b00"
        fontWeight="700"
      >
        {value !== null && value !== undefined ? `${Math.round(value)}${getLabel()}` : "--"}
      </text>

      {/* WEATHER ICON */}
      {localIcon && (
        <image
          xlinkHref={localIcon}
          x={-13}
          y={-20}
          width={26}
          height={26}
        />
      )}
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

        {/* <div className="metric-controls">
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
        </div> */}
      </div>

      {/* HEADER */}
      <div className="hourly-header">
        {finalData.map((item, i) => {
          const iconUrl = weatherIconMap[item.icon];
          return (
            <div key={i} className="hourly-header-item">
              <p className="h-time">{item.time}</p>

              {iconUrl ? (
                <img
                  className="h-icon"
                  src={iconUrl}
                  alt="weather icon"
                />
              ) : (
                <div className="no-icon" />
              )}

              <p className="h-temp">
                {item.temp !== null ? `${Math.round(item.temp)}°${unit}` : "--"}
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
          );
        })}
      </div>

      {/* GRAPH */}
      <div className="scroll-area">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={finalData} margin={{ top: 10, bottom: 40, left: 40, right: 40 }}>
            <CartesianGrid stroke="#e0e0e0" strokeDasharray="4 4" />

            <XAxis
              dataKey="time"
              // tick={<PrecipTick metric={yAxisMetric} getLabel={getYAxisLabel} />}
              interval={Math.floor(finalData.length / 16)}
              height={80}
            />

            <YAxis
              yAxisId="left"
              label={{ value: getMetricLabel().split(" ")[0], angle: -90, position: "insideLeft", fontSize: 11 }}
              tickFormatter={(value) => `${Math.round(value)}${getYAxisLabel()}`}
              tick={{ fill: "#333", fontSize: 10, fontWeight: 600 }}
              width={50}
            />

            {/* <YAxis
              yAxisId="right"
              orientation="right"
              label={{ value: "Precipitation (%)", angle: 90, position: "insideRight", fontSize: 11 }}
              tickFormatter={(value) => `${value}%`}
              tick={{ fill: "#333", fontSize: 10, fontWeight: 600 }}
              width={50}
            /> */}

            <Bar
              // yAxisId="bottom"
              // dataKey="precipitation"
              // fill="#4aa3ff"
              // barSize={12}
              // opacity={0.55}
              // radius={[4, 4, 0, 0]}
            >
              {/* <LabelList
                dataKey="precipitation"
                content={(props) => {
                  const { x, value, viewBox } = props;
                  const fixedY = viewBox.y + viewBox.height + 15;

                  return (
                    <g transform={`translate(${x}, ${fixedY})`}>
                      <text
                        x={0}
                        y={0}
                        fontSize="12"
                        fill="black"
                        fontWeight="600"
                        textAnchor="middle"
                      >
                        {value}%
                      </text>
                    </g>
                  );
                }}
              /> */}
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
