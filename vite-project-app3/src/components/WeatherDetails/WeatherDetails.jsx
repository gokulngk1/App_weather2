import React, { useMemo } from "react";
import { useUnit } from "../../context/UnitContext";
import "./WeatherDetails.css";

const WeatherDetails = ({ weather, forecast }) => {
  const { unit } = useUnit();

  if (!weather) return null;

  const { main, wind, sys, clouds, visibility } = weather;
  const cloudiness = clouds?.all || 0;

  /**
   * Convert temperature based on unit
   */
  const convertTemp = (temp) => {
    return unit === "C" ? Math.round(temp) : Math.round((temp * 9) / 5 + 32);
  };

  /**
   * Convert wind speed based on unit
   */
  const convertWindSpeed = (speed) => {
    // API returns m/s for metric
    if (unit === "C") {
      return (speed * 3.6).toFixed(1); // m/s to km/h
    } else {
      return (speed * 2.237).toFixed(1); // m/s to mph
    }
  };

  /**
   * Get wind direction from degrees
   */
  const getWindDirection = (degrees) => {
    const directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  };

  /**
   * Get wind force scale (Beaufort Scale)
   */
  const getWindForce = (speedMps) => {
    const speedKmh = speedMps * 3.6;
    if (speedKmh < 1) return { force: 0, desc: "Calm" };
    if (speedKmh < 6) return { force: 1, desc: "Light Air" };
    if (speedKmh < 12) return { force: 2, desc: "Light Breeze" };
    if (speedKmh < 20) return { force: 3, desc: "Gentle Breeze" };
    if (speedKmh < 29) return { force: 4, desc: "Moderate Breeze" };
    if (speedKmh < 39) return { force: 5, desc: "Fresh Breeze" };
    if (speedKmh < 50) return { force: 6, desc: "Strong Breeze" };
    if (speedKmh < 62) return { force: 7, desc: "Near Gale" };
    if (speedKmh < 75) return { force: 8, desc: "Gale" };
    return { force: 9, desc: "Severe Gale" };
  };

  /**
   * Calculate min and max temps from forecast
   */
  const getTempRange = () => {
    if (!forecast || !forecast.list) {
      return { min: null, max: null, peakTime: null, lowTime: null };
    }

    let maxTemp = main.temp;
    let minTemp = main.temp;
    let peakTime = "";
    let lowTime = "";

    forecast.list.slice(0, 8).forEach((item) => {
      const itemTemp = item.main.temp;
      if (itemTemp > maxTemp) {
        maxTemp = itemTemp;
        peakTime = new Date(item.dt * 1000).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        });
      }
      if (itemTemp < minTemp) {
        minTemp = itemTemp;
        lowTime = new Date(item.dt * 1000).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        });
      }
    });

    return {
      min: convertTemp(minTemp),
      max: convertTemp(maxTemp),
      peakTime,
      lowTime,
    };
  };

  /**
   * Calculate precipitation for next 24h
   */
  const getPrecipitation24h = () => {
    if (!forecast || !forecast.list) return 0;

    let totalPrecip = 0;
    forecast.list.slice(0, 8).forEach((item) => {
      if (item.rain) {
        totalPrecip += item.rain["3h"] || 0;
      }
    });

    // Convert mm to inches if imperial
    return unit === "C" ? totalPrecip.toFixed(1) : (totalPrecip / 25.4).toFixed(2);
  };

  /**
   * Get cloud cover description
   */
  const getCloudDescription = () => {
    if (cloudiness < 10) return "Clear sky";
    if (cloudiness < 25) return "Mostly Sunny";
    if (cloudiness < 50) return "Partly Cloudy";
    if (cloudiness < 85) return "Mostly Cloudy";
    return "Overcast";
  };

  /**
   * Calculate dew point (simplified formula)
   */
  const calculateDewPoint = () => {
    const T = main.temp;
    const RH = main.humidity;
    const a = 17.27;
    const b = 237.7;
    const alpha = ((a * T) / (b + T)) + Math.log(RH / 100);
    const Td = (b * alpha) / (a - alpha);
    return convertTemp(Td);
  };

  /**
   * Get temperature trend description
   */
  const getTempTrend = () => {
    if (!forecast || !forecast.list || forecast.list.length < 2) return "Stable";

    const current = main.temp;
    const next = forecast.list[0]?.main?.temp || current;

    if (next > current + 1) return "Rising";
    if (next < current - 1) return "Falling";
    return "Stable";
  };

  /**
   * Get humidity status
   */
  const getHumidityStatus = () => {
    const humidity = main.humidity;
    if (humidity < 30) return "Dry";
    if (humidity < 60) return "Comfortable";
    if (humidity < 80) return "Humid";
    return "Very Humid";
  };

  const displayTemp = convertTemp(main.temp);
  const displayFeels = convertTemp(main.feels_like);
  const tempRange = getTempRange();
  const precipitation = getPrecipitation24h();
  const dewPoint = calculateDewPoint();
  const windForce = getWindForce(wind.speed);
  const windDir = getWindDirection(wind.deg);
  const windSpeed = convertWindSpeed(wind.speed);
  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="msn-weather-wrapper">
      <div className="msn-header">
        <h2 className="msn-title">
          Weather details <span className="msn-time">{currentTime}</span>
        </h2>
        {/* <a href="#suggestions" className="msn-suggestions">
          SUGGESTIONS FOR YOUR DAY &gt;
        </a> */}
      </div>

      <div className="msn-grid">
        {/* Temperature Card */}
        <div className="msn-card">
          <h3>Temperature</h3>
          <div className="msn-chart-placeholder rising">
            <div className="msn-temp-large">{displayTemp}°{unit}</div>
          </div>
          <p className="msn-status orange-text">● {getTempTrend()}</p>
          <p className="msn-desc">
            {getTempTrend()} with a peak of {tempRange.max}°{unit} at {tempRange.peakTime || "later"}. Low of {tempRange.min}°{unit} at {tempRange.lowTime || "tonight"}.
          </p>
        </div>

        {/* Feels Like Card */}
        <div className="msn-card">
          <h3>Feels like</h3>
          <div className="msn-chart-placeholder">
            <div className="msn-feels-row">
              <div className="msn-stat-block">
                <span className="label">Feels like:</span>
                <span className="val-large">{displayFeels}°{unit}</span>
              </div>
              <div className="msn-stat-block">
                <span className="label">Temperature:</span>
                <span className="val-small">{displayTemp}°{unit}</span>
              </div>
            </div>
          </div>
          <p className="msn-status orange-text">
            ● {Math.abs(displayFeels - displayTemp) > 2 ? "Different" : "Similar"}
          </p>
          <p className="msn-desc">
            {displayFeels > displayTemp
              ? "Feels warmer than actual temperature due to wind chill."
              : displayFeels < displayTemp
              ? "Feels cooler than actual temperature."
              : "Feels like actual temperature."}
          </p>
        </div>

        {/* Cloud Cover Card */}
        <div className="msn-card">
          <h3>Cloud cover</h3>
          <div className="msn-circle-display">
            <div className="msn-circle-bg">{getCloudDescription()}</div>
          </div>
          <p className="msn-status blue-text">
            ● {getCloudDescription()} ({cloudiness}%)
          </p>
          <p className="msn-desc">
            Current cloud coverage at {cloudiness}%. {cloudiness < 50 ? "Mostly clear skies expected." : "Mostly cloudy conditions expected."}
          </p>
        </div>

        {/* Precipitation Card */}
        <div className="msn-card">
          <h3>Precipitation</h3>
          <div className="msn-circle-display">
            <div className="msn-circle-outline">
              <span className="val-large">{precipitation} {unit === "C" ? "mm" : "in"}</span>
              <span className="label">In next 24h</span>
            </div>
          </div>
          <p className="msn-status orange-text">
            ● {precipitation > 0 ? "Possible Rain" : "No Precipitation"}
          </p>
          <p className="msn-desc">
            {precipitation > 0
              ? `Expected precipitation: ${precipitation} ${unit === "C" ? "mm" : "inches"}`
              : "No precipitation expected in the next 24 hours."}
          </p>
        </div>

        {/* Wind Card */}
        <div className="msn-card">
          <h3>Wind</h3>
          <div className="msn-wind-content">
            <div className="msn-compass-mini">
              <div className="compass-arrow" style={{ transform: `rotate(${wind.deg}deg)` }}></div>
            </div>
            <div className="msn-wind-stats">
              <div>
                From {windDir} ({wind.deg}°)
              </div>
              <div>
                <strong>{windSpeed}</strong> {unit === "C" ? "km/h" : "mph"} Wind Speed
              </div>
              <div>
                <strong>{convertWindSpeed(wind.gust || wind.speed)}</strong>{" "}
                {unit === "C" ? "km/h" : "mph"} Wind Gust
              </div>
            </div>
          </div>
          <p className="msn-status orange-text">
            ● Force: {windForce.force} ({windForce.desc})
          </p>
          <p className="msn-desc">
            Wind from {windDir} at {windSpeed} {unit === "C" ? "km/h" : "mph"}. {windForce.desc} conditions expected.
          </p>
        </div>

        {/* Humidity Card */}
        <div className="msn-card">
          <h3>Humidity</h3>
          <div className="msn-humidity-viz">
            <div className="bar-group">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className={`bar ${i < Math.ceil((main.humidity / 100) * 8) ? "active" : ""}`}
                ></div>
              ))}
            </div>
            <div className="msn-hum-stats">
              <div className="val-large">{main.humidity}%</div>
              <div className="label">Relative Humidity</div>
              <div className="val-mid">{dewPoint}°{unit}</div>
              <div className="label">Dew point</div>
            </div>
          </div>
          <p className="msn-status blue-text">● {getHumidityStatus()}</p>
          <p className="msn-desc">
            Current humidity at {main.humidity}%. Dew point at {dewPoint}°{unit}. {main.humidity > 70 ? "Sticky conditions expected." : "Comfortable humidity levels."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;