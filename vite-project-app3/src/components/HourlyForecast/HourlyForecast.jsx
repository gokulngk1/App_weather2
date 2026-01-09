import React, { useMemo } from "react";
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
export default function HourlyWeatherGraph({ hourly, unit }) {
  const finalData = useMemo(() => {
    return hourly.map((item) => ({
      time: item.time,
      temp: item.temp ?? null,
      precipitation: item.precipitation ?? 0,
      icon: item.icon ?? null,
      unit: unit,
    }));
  }, [hourly, unit]);


  return (
    <div className="hourly-wrapper">
      <h3 className="hourly-title">Hourly Forecast</h3>

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
              interval={0}
              height={100}
            />

            <YAxis
              yAxisId="left"
              tickFormatter={(value) => `${value}°${unit}`}
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
              dataKey="temp"
              stroke="#ff7b00"
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
